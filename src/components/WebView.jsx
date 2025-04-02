import React, { useEffect, useState } from "react";
import TakeLoanModal from "./TakeLoanModal";
import { X } from "lucide-react";
import Modal from "./modal";
import {
  addBalance,
  getProfile,
  getTransactions,
  payForService,
  takeLoan,
} from "../api/core-api";
// import more from "../assets/icons/more.svg";
import LoanDetails from "./LoanDetails";
import Loader from "./loader";
import moment from "moment";

function WebView({ token }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPayService, setIsOpenPayService] = useState(false);
  const [values, setValues] = useState({
    amount: "",
    interst: 0.5,
    plan: "",
    serviceAmount: "",
    serviceDescription: "",
    serviceType: "",
    addBalanceAmount: 0,
  });
  const [balance, setBalance] = useState(0);
  const [loans, setLoans] = useState([]);

  // const [loanDetails, setLoanDetails] = useState(null);
  const [isOpenLoanDetails, setIsOpenLoanDetails] = useState(false);
  const [isOpenAddBalance, setIsOpenAddBalance] = useState(false);

  const [loadingService, setLoadingService] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingLoans, setLoadingLoans] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = () => {
    setValues({
      amount: "",
      plan: "",
      serviceAmount: "",
      serviceDescription: "",
      serviceType: "",
      addBalanceAmount: "",
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    getProfile(token)
      .then((res) => {
        console.log(res);
        setBalance(res.data.balance);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.error);
      });

    getTransactions(token)
      .then((res) => {
        console.log(res.data.transactions);
        setLoans(res.data.transactions);
        setLoadingLoans(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingLoans(false);

        alert(err.response.data.error);
      });
  }, []);

  const takeLoanFn = async (e) => {
    e.preventDefault();

    const payload = {
      loan_amount: values.amount,
      interest_rate: 5.0,
      repayment_plan: values.plan,
    };

    console.log(payload);

    setLoading(true);

    await takeLoan(token, payload)
      .then((res) => {
        console.log(res.data);
        setLoans([...loans, res.data.loan]);
        setIsOpen(false);
        setLoading(false);
        resetForm();
        alert("Loan Successful");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.response.data.error);
      });
  };

  const addBalanceFn = async (e) => {
    e.preventDefault();

    const payload = {
      amount: values.addBalanceAmount,
    };

    console.log(payload);

    setLoading(true);

    await addBalance(token, payload)
      .then((res) => {
        console.log(res.data);
        setBalance(res.data.balance);
        setIsOpenAddBalance(false);
        setLoading(false);
        resetForm();
        alert("Successful");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err.response.data.error);
      });
  };

  const payService = async (e) => {
    e.preventDefault();

    const payload = {
      amount: values.serviceAmount,
      description: values.serviceDescription,
      service_type: values.serviceType,
    };

    console.log(payload);

    setLoadingService(true);

    await payForService(token, payload)
      .then((res) => {
        console.log(res);
        setIsOpenPayService(false);
        resetForm();
        alert("Payment Successful");
        setLoadingService(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingService(false);
        alert(err.response.data.error);
      });
  };

  return (
    <div>
      {/* <div className="dashboard-header">
        <h2>Dashboard</h2>
        <div className="notification" id="webNotificationBell">
          <span>🔔</span>
          <span className="notification-badge">2</span>
        </div>
      </div> */}

      <div className="cards-container">
        <div className="balance-card">
          <p className="balance-label">Your Balance</p>
          <div className="balance-amount">
            <span id="webBalanceText">NGN {balance}</span>
          </div>
          {/* <p className="account-number">0000 7426 2183</p> */}
        </div>

        <div className="balance-card">
          <p className="balance-label">Savings</p>
          <div className="balance-amount">
            <span id="savingsBalanceText">NGN 0</span>
          </div>
          {/* <p className="account-number">Interest Rate: 3.5%</p> */}
        </div>
      </div>

      <h3 className="section-title">Quick Actions</h3>
      <div className="quick-actions">
        <div
          className="action-button"
          id="webTakeLoanBtn"
          onClick={() => setIsOpen(true)}
        >
          <span className="action-icon">💰</span>
          <span className="action-label">Take Loan</span>
        </div>
        <div className="action-button" id="webPayLoanBtn">
          <span className="action-icon">💳</span>
          <span className="action-label">Pay Loan</span>
        </div>
        <div
          className="action-button"
          id="webCheckStatusBtn"
          onClick={() => setIsOpenAddBalance(true)}
        >
          <span className="action-icon">📊</span>
          <span className="action-label">Add balance</span>
        </div>
        <div
          className="action-button"
          id="webBuyAirtimeBtn"
          onClick={() => setIsOpenPayService(true)}
        >
          <span className="action-icon">📱</span>
          <span className="action-label">Buy Airtime</span>
        </div>
      </div>

      <div className="transactions-section">
        <h3 className="section-title">Recent Transactions</h3>

        {loadingLoans ? (
          <Loader />
        ) : (
          loans.map((loan) => (
            <div className="transaction-item" data-id="tx1" key={loan.id}>
              <div className="transaction-info">
                <div className="transaction-icon">💰</div>
                <div className="transaction-details">
                  <span className="transaction-type">{loan.type}</span>
                  <span className="transaction-date">
                    {moment(loan.created_at).format("YYYY-MM-DD HH:mm:ss")}
                  </span>
                </div>
              </div>
              <div className="transaction-amount">
                <p>NGN{loan.amount}</p>
                {/* <img
                  src={more}
                  alt="more-icon"
                  onClick={() => {
                    setLoanDetails(loan);
                    setIsOpenLoanDetails(true);
                  }}
                /> */}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modals */}

      <LoanDetails
        isopen={isOpenLoanDetails}
        setIsopen={setIsOpenLoanDetails}
        // LoanDetails={loanDetails}
        token={token}
      />

      {/* Add balance */}

      <Modal
        title="Add balance"
        isOpen={isOpenAddBalance}
        closeModal={() => setIsOpenAddBalance(false)}
      >
        <form id="loanFormm" onSubmit={addBalanceFn}>
          <div className="form-group">
            <label className="form-label">Amount (NGN)</label>
            <input
              type="number"
              id="addBalanceAmount"
              name="addBalanceAmount"
              className="form-input"
              placeholder="Enter amount"
              required
              value={values.addBalanceAmount}
              onChange={handleChange}
            />
          </div>

          <button type="submit" id="takeLoadButton" className="form-button">
            {loading ? <Loader /> : "Add balance"}
          </button>
        </form>
      </Modal>

      {/* Take loan */}
      <Modal
        title="Apply for a Loan"
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      >
        <form id="loanFormm" onSubmit={takeLoanFn}>
          <div className="form-group">
            <label className="form-label">Loan Amount (NGN)</label>
            <input
              type="number"
              id="loanFormAmount"
              name="amount"
              className="form-input"
              placeholder="Enter amount"
              required
              value={values.amount}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Duration (months)</label>
            <input
              type="number"
              id="loanFormDuration"
              className="form-input"
              placeholder="Enter duration"
              required
              name="plan"
              value={values.plan}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Purpose</label>
            <select id="loanFormPurpose" className="form-input">
              <option value="">Select purpose</option>
              <option value="business">Business</option>
              <option value="education">Education</option>
              <option value="personal">Personal</option>
              <option value="housing">Housing</option>
            </select>
          </div>
          <button type="submit" id="takeLoadButton" className="form-button">
            {loading ? <Loader /> : "Apply Now"}
          </button>
        </form>
      </Modal>

      {/* Airtime purchase */}

      <Modal
        title="Pay for services"
        isOpen={isOpenPayService}
        closeModal={() => setIsOpenPayService(false)}
      >
        <form id="loanFormm" onSubmit={payService}>
          <div className="form-group">
            <label className="form-label">Service Amount (NGN)</label>
            <input
              type="number"
              id="loanFormAmount"
              name="serviceAmount"
              className="form-input"
              placeholder="Enter amount"
              required
              value={values.serviceAmount}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description </label>
            <textarea
              id="loanFormDuration"
              className="form-input"
              placeholder="Enter duration"
              required
              name="serviceDescription"
              value={values.serviceDescription}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Service type</label>
            <select
              id="loanFormPurpose"
              className="form-input"
              value={values.serviceType}
              onChange={handleChange}
              name="serviceType"
            >
              <option value="">Select type</option>
              <option value="airtime">Airtime</option>
              {/* <option value="education">Education</option>
              <option value="personal">Personal</option>
              <option value="housing">Housing</option> */}
            </select>
          </div>
          <button type="submit" id="takeLoadButton" className="form-button">
            {loadingService ? <Loader /> : "Purchase Now"}
          </button>
        </form>
      </Modal>

      {/* {activeModal == "takeLoan" && <TakeLoanModal />} */}

      <template id="transaction-template">
        <div className="transaction-item">
          <div className="transaction-info">
            <div className="transaction-icon">💰</div>
            <div className="transaction-details">
              <span className="transaction-type"></span>
              <span className="transaction-date"></span>
            </div>
          </div>
          <div className="transaction-amount"></div>
        </div>
      </template>
    </div>
  );
}

export default WebView;
