import React from "react";

function TakeLoanModal() {
  return (
    <div class="modal-overlay" id="takeLoanModal">
      <div class="modal">
        <div class="modal-header">
          <h3>Apply for a Loan</h3>
          <span class="modal-close" data-modal="takeLoanModal">
            ✕
          </span>
        </div>
        <form id="loanFormm">
          <div class="form-group">
            <label class="form-label">Loan Amount (NGN)</label>
            <input
              type="number"
              id="loanFormAmount"
              class="form-input"
              placeholder="Enter amount"
              required
            />
          </div>
          <div class="form-group">
            <label class="form-label">Duration (months)</label>
            <input
              type="number"
              id="loanFormDuration"
              class="form-input"
              placeholder="Enter duration"
              required
            />
          </div>
          <div class="form-group">
            <label class="form-label">Purpose</label>
            <select id="loanFormPurpose" class="form-input">
              <option value="">Select purpose</option>
              <option value="business">Business</option>
              <option value="education">Education</option>
              <option value="personal">Personal</option>
              <option value="housing">Housing</option>
            </select>
          </div>
          <button type="submit" id="takeLoadButton" class="form-button">
            Apply Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default TakeLoanModal;
