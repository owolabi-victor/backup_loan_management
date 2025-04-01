import React, { useEffect, useState } from "react";
import TakeLoanModal from "./TakeLoanModal";
import { X } from "lucide-react";
import Modal from "./modal";
import { getLoans, getProfile, payForService, takeLoan } from "../api/core-api";
import more from "../assets/icons/more.svg";
import LoanDetails from "./LoanDetails";
import Loader from "./loader";
function WebView() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPayService, setIsOpenPayService] = useState(false);
  const [values, setValues] = useState({
    amount: "",
    interst: 0.5,
    plan: "",
    serviceAmount: "",
    serviceDescription: "",
    serviceType: "",
  });
  const [balance, setBalance] = useState(0);
  const [loans, setLoans] = useState([
    {
      id: 1,
      customer_id: 1,
      loan_amount: "10000.00",
      interest_rate: "5.00",
      repayment_plan: 6,
      start_date: "2025-03-14T00:00:00.000000Z",
      end_date: "2025-09-14T00:00:00.000000Z",
      total_amount_due: "10500.00",
      monthly_installment: "1750.00",
      remaining_balance: "6800.00",
      created_at: "2025-03-14T21:41:35.000000Z",
      updated_at: "2025-03-14T22:23:49.000000Z",
      due_dates: [
        {
          date: "2025-04-14",
          balance: "0.00",
          outstanding: false,
        },
        {
          date: "2025-05-14",
          balance: "0.00",
          outstanding: false,
        },
        {
          date: "2025-06-14",
          balance: "1550.00",
          outstanding: true,
        },
        {
          date: "2025-07-14",
          balance: "1750.00",
          outstanding: true,
        },
        {
          date: "2025-08-14",
          balance: "1750.00",
          outstanding: true,
        },
        {
          date: "2025-09-14",
          balance: "1750.00",
          outstanding: true,
        },
        {
          date: "2025-10-14",
          balance: "1750.00",
          outstanding: true,
        },
      ],
    },
    {
      id: 2,
      customer_id: 1,
      loan_amount: "10000.00",
      interest_rate: "5.00",
      repayment_plan: 6,
      start_date: "2025-03-29T00:00:00.000000Z",
      end_date: "2025-09-29T00:00:00.000000Z",
      total_amount_due: "10500.00",
      monthly_installment: "1750.00",
      remaining_balance: "10500.00",
      created_at: "2025-03-29T09:30:44.000000Z",
      updated_at: "2025-03-29T09:30:44.000000Z",
      due_dates: [
        {
          date: "2025-04-29",
          balance: "1750.00",
          outstanding: true,
        },
        {
          date: "2025-05-29",
          balance: "1750.00",
          outstanding: true,
        },
        {
          date: "2025-06-29",
          balance: "1750.00",
          outstanding: true,
        },
        {
          date: "2025-07-29",
          balance: "1750.00",
          outstanding: true,
        },
        {
          date: "2025-08-29",
          balance: "1750.00",
          outstanding: true,
        },
        {
          date: "2025-09-29",
          balance: "1750.00",
          outstanding: true,
        },
        {
          date: "2025-10-29",
          balance: "1750.00",
          outstanding: true,
        },
      ],
    },
    {
      id: 3,
      customer_id: 7,
      loan_amount: "200.00",
      interest_rate: "5.00",
      repayment_plan: 2,
      start_date: "2025-03-29T00:00:00.000000Z",
      end_date: "2025-05-29T00:00:00.000000Z",
      total_amount_due: "210.00",
      monthly_installment: "105.00",
      remaining_balance: "210.00",
      created_at: "2025-03-29T14:24:23.000000Z",
      updated_at: "2025-03-29T14:24:23.000000Z",
      due_dates: [
        {
          date: "2025-04-29",
          balance: "105.00",
          outstanding: true,
        },
        {
          date: "2025-05-29",
          balance: "105.00",
          outstanding: true,
        },
        {
          date: "2025-06-29",
          balance: "105.00",
          outstanding: true,
        },
      ],
    },
    {
      id: 4,
      customer_id: 7,
      loan_amount: "15000.00",
      interest_rate: "5.00",
      repayment_plan: 6,
      start_date: "2025-03-31T00:00:00.000000Z",
      end_date: "2025-10-01T00:00:00.000000Z",
      total_amount_due: "15750.00",
      monthly_installment: "2625.00",
      remaining_balance: "15750.00",
      created_at: "2025-03-31T15:08:02.000000Z",
      updated_at: "2025-03-31T15:08:02.000000Z",
      due_dates: [
        {
          date: "2025-05-01",
          balance: "2625.00",
          outstanding: true,
        },
        {
          date: "2025-05-31",
          balance: "2625.00",
          outstanding: true,
        },
        {
          date: "2025-07-01",
          balance: "2625.00",
          outstanding: true,
        },
        {
          date: "2025-07-31",
          balance: "2625.00",
          outstanding: true,
        },
        {
          date: "2025-08-31",
          balance: "2625.00",
          outstanding: true,
        },
        {
          date: "2025-10-01",
          balance: "2625.00",
          outstanding: true,
        },
        {
          date: "2025-10-31",
          balance: "2625.00",
          outstanding: true,
        },
      ],
    },
  ]);

  const [loanDetails, setLoanDetails] = useState(null);
  const [isOpenLoanDetails, setIsOpenLoanDetails] = useState(false);

  const [loadingService, setLoadingService] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    getProfile()
      .then((res) => {
        console.log(res);
        setBalance(res.data.balance);
      })
      .catch((err) => {
        console.log(err);
      });

    getLoans()
      .then((res) => {
        console.log(res);
        setLoans(res.data.loans);
      })
      .catch((err) => {
        console.log(err);
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

    await takeLoan(payload)
      .then((res) => {
        console.log(res);
        setIsOpen(false);
        alert("Loan Successful");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const payService = async (e) => {
    e.preventDefault();

    const payload = {
      amount: values.amount,
      description: "",
      service_type: "",
    };

    console.log(payload);

    setLoadingService(true);

    await payForService(payload)
      .then((res) => {
        console.log(res);
        setIsOpenPayService(false);
        alert("Payment Successful");
        setLoadingService(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingService(false);
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
        <div className="action-button" id="webCheckStatusBtn">
          <span className="action-icon">📊</span>
          <span className="action-label">Check Status</span>
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

        {loans.map((loan) => (
          <div className="transaction-item" data-id="tx1" key={loan.id}>
            <div className="transaction-info">
              <div className="transaction-icon">💰</div>
              <div className="transaction-details">
                <span className="transaction-type">Loan</span>
                <span className="transaction-date">14th February, 2025</span>
              </div>
            </div>
            <div className="transaction-amount">
              <p>NGN{loan.loan_amount}</p>
              <img
                src={more}
                alt="more-icon"
                onClick={() => {
                  setLoanDetails(loan);
                  setIsOpenLoanDetails(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}

      <LoanDetails
        isopen={isOpenLoanDetails}
        setIsopen={setIsOpenLoanDetails}
        LoanDetails={loanDetails}
      />

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
              <option value="business">Airtime</option>
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
