import React, { useState } from "react";
import Modal from "./modal";
import { repayLoan } from "../api/core-api";
import Loader from "./loader";

function LoanDetails({ isopen, setIsopen, LoanDetails }) {
  const [loading, setLoading] = useState(false);

  const paybackLoan = () => {
    const payload = {
      amount: LoanDetails.remaining_balance,
    };

    setLoading(true);

    repayLoan(LoanDetails.id, payload)
      .then(() => {})
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
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
            {LoanDetails?.start_date}
          </p>
        </div>

        <div className="details" style={{ marginTop: "15px" }}>
          <p>End date</p>
          <p style={{ fontWeight: "bold", marginTop: "5px" }}>
            {LoanDetails?.end_date}
          </p>
        </div>
      </div>

      <div style={{ marginTop: "15px" }}>
        <button
          type="button"
          id="takeLoadButton"
          className="form-button"
          onClick={paybackLoan}
        >
          {loading ? <Loader /> : "Pay Now"}
        </button>
      </div>
    </Modal>
  );
}

export default LoanDetails;
