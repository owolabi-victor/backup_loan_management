import React, { useState } from "react";
import Modal from "./modal";
import { repayLoan } from "../api/core-api";
import Loader from "./loader";
import moment from "moment";

function LoanDetails({ token, isopen, setIsopen, LoanDetails }) {
  const [loading, setLoading] = useState(false);
  const [openPayback, setOpenPayback] = useState(false);
  const [amount, setAmount] = useState("");

  const paybackLoan = () => {
    const payload = {
      // amount: LoanDetails.remaining_balance,
      amount,
    };

    setLoading(true);

    repayLoan(token, LoanDetails.id, payload)
      .then((res) => {
        console.log(res);
        setIsopen(false);
        setLoading(false);
        setOpenPayback(false);
        alert("Loan payment successful");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response.data.error);
        alert(err.response.data.error);
      });
  };

  return (
    <>
      <Modal
        title="Loan Details"
        isOpen={isopen}
        closeModal={() => setIsopen(false)}
      >
        <div>
          <div className="details">
            <p>Loan amount</p>
            <p style={{ fontWeight: "bold", marginTop: "5px" }}>
              NGN{LoanDetails?.loan_amount}
            </p>
          </div>

          <div className="details" style={{ marginTop: "15px" }}>
            <p>Interest rate</p>
            <p style={{ fontWeight: "bold", marginTop: "5px" }}>
              {LoanDetails?.interest_rate} %
            </p>
          </div>

          <div className="details" style={{ marginTop: "15px" }}>
            <p>Payment Plan</p>
            <p style={{ fontWeight: "bold", marginTop: "5px" }}>
              {LoanDetails?.interest_rate}
            </p>
          </div>

          <div className="details" style={{ marginTop: "15px" }}>
            <p>Monthly installment</p>
            <p style={{ fontWeight: "bold", marginTop: "5px" }}>
              NGN{LoanDetails?.monthly_installment}
            </p>
          </div>

          <div className="details" style={{ marginTop: "15px" }}>
            <p>Loan balance</p>
            <p style={{ fontWeight: "bold", marginTop: "5px" }}>
              NGN{LoanDetails?.remaining_balance}
            </p>
          </div>

          <div className="details" style={{ marginTop: "15px" }}>
            <p>Start date</p>
            <p style={{ fontWeight: "bold", marginTop: "5px" }}>
              {moment(LoanDetails?.start_date).format("YYYY-MM-DD HH:mm:ss")}
            </p>
          </div>

          <div className="details" style={{ marginTop: "15px" }}>
            <p>End date</p>
            <p style={{ fontWeight: "bold", marginTop: "5px" }}>
              {moment(LoanDetails?.end_date).format("YYYY-MM-DD HH:mm:ss")}
            </p>
          </div>
        </div>

        <div style={{ marginTop: "15px" }}>
          <button
            type="button"
            id="takeLoadButton"
            className="form-button"
            // onClick={paybackLoan}
            onClick={() => setOpenPayback(true)}
          >
            {/* {loading ? <Loader /> : "Pay Now"} */}
            Pay Now
          </button>
        </div>
      </Modal>
      <Modal
        title="Loan Payback"
        isOpen={openPayback}
        closeModal={() => setOpenPayback(false)}
      >
        <form id="loanFormm" onSubmit={repayLoan}>
          <div className="form-group">
            <label className="form-label">Amount (NGN)</label>
            <input
              type="number"
              id="addBalanceAmount"
              name="addBalanceAmount"
              className="form-input"
              placeholder="Enter amount"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <button
            type="button"
            id="takeLoadButton"
            className="form-button"
            onClick={paybackLoan}
          >
            {loading ? <Loader /> : "Proceed"}
          </button>
        </form>
      </Modal>
    </>
  );
}

export default LoanDetails;
