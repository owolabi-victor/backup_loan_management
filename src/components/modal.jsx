import React from "react";
import "../assets/css/Modal.css";

const Modal = ({ title, isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" id="takeLoanModal">
      <div className="modal">
        <div className="modal-header">
          <h3>{title}</h3>
          <span
            className="modal-close"
            data-modal="takeLoanModal"
            onClick={closeModal}
          >
            ✕
          </span>
        </div>
        <div style={{ textAlign: "left" }}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
