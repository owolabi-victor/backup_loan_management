import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MobileView from "../components/MobileView";
import WebView from "../components/WebView";
import NotificationPanel from "../components/NotificationPanel";
import TransactionDetailsPanel from "../components/TransactionDetailsPanel";
import TakeLoanModal from "../components/TakeLoanModal";
import PayLoanModal from "../components/PayLoanModal";
import CheckStatusModal from "../components/CheckStatusModal";
import "../assets/css/dashboard.css";
import BuyAirtimeModal from "../components/BuyAirtimeModal";

function Dashboard() {
  const navigate = useNavigate();
  // const [activeView, setActiveView] = useState("mobile");
  // const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [isTransactionDetailsOpen, setIsTransactionDetailsOpen] =
    useState(false);
  const [activeTakeLoanModal, setActiveTakeLoanModal] = useState(false);
  const [activePayLoanModal, setActivePayLoanModal] = useState(false);
  const [activeBuyAirtimeModal, setActiveBuyAirtimeModal] = useState(false);
  const [activeCheckStatusModal, setActiveCheckStatusModal] = useState(false);
  const [token, setToken] = useState("");
  // const [userEmail, setUserEmail] = useState("");
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    setToken(token);

    if (!token) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeTransactionDetails = () => {
    setIsTransactionDetailsOpen(false);
  };

  const closeModal = (modalType) => {
    switch (modalType) {
      case "takeLoan":
        setActiveTakeLoanModal(false);
        break;
      case "payLoan":
        setActivePayLoanModal(false);
        break;
      case "buyAirtime":
        setActiveBuyAirtimeModal(false);
        break;
      case "checkStatus":
        setActiveCheckStatusModal(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="">
      {token && <WebView token={token} />}
      {isTransactionDetailsOpen && (
        <TransactionDetailsPanel
          closeTransactionDetails={closeTransactionDetails}
        />
      )}
      {activeTakeLoanModal && (
        <TakeLoanModal closeModal={() => closeModal("takeLoan")} />
      )}
      {activePayLoanModal && (
        <PayLoanModal closeModal={() => closeModal("payLoan")} />
      )}
      {activeBuyAirtimeModal && (
        <BuyAirtimeModal closeModal={() => closeModal("buyAirtime")} />
      )}
      {activeCheckStatusModal && (
        <CheckStatusModal closeModal={() => closeModal("checkStatus")} />
      )}
    </div>
  );
}

export default Dashboard;
