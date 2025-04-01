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
  // const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    // Check authentication on component mount
    const checkAuthentication = () => {
      // const authToken = localStorage.getItem("authToken");
      // const storedEmail = localStorage.getItem("userEmail");

      // if (!authToken) {
      //   // Redirect to login if no token
      //   console.error("No authentication token found");
      //   setError("Authentication required");
      //   navigate("/");
      //   return false;
      // }

      // if (storedEmail) {
      //   setUserEmail(storedEmail);
      // }

      setIsLoading(false);
      return true;
    };

    checkAuthentication();
  }, [navigate]);

  // const toggleView = () => {
  //   setActiveView(activeView === "mobile" ? "web" : "mobile");
  // };

  // const openNotificationPanel = () => {
  //   setIsNotificationPanelOpen(true);
  // };

  // const closeNotificationPanel = () => {
  //   setIsNotificationPanelOpen(false);
  // };

  // const openTransactionDetails = () => {
  //   setIsTransactionDetailsOpen(true);
  // };

  const closeTransactionDetails = () => {
    setIsTransactionDetailsOpen(false);
  };

  // const openModal = (modalType) => {
  //   switch (modalType) {
  //     case "takeLoan":
  //       setActiveTakeLoanModal(true);
  //       break;
  //     case "payLoan":
  //       setActivePayLoanModal(true);
  //       break;
  //     case "buyAirtime":
  //       setActiveBuyAirtimeModal(true);
  //       break;
  //     case "checkStatus":
  //       setActiveCheckStatusModal(true);
  //       break;
  //     default:
  //       break;
  //   }
  // };

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

  // Logout function
  // const handleLogout = () => {
  //   // Clear authentication token and user data
  //   localStorage.removeItem("authToken");
  //   localStorage.removeItem("userEmail");

  //   // Redirect to login page
  //   navigate("/");
  // };

  // If loading, show a loading state
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  // If there's an error, show error message
  // if (error) {
  //   return (
  //     <div className="error-container">
  //       <p>{error}</p>
  //       <button onClick={() => navigate("/")}>Return to Login</button>
  //     </div>
  //   );
  // }

  return (
    <div className="">
      {/* Add logout button */}
      {/* <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
        }}
      >
        Logout
      </button> */}

      <WebView />

      {/* {isNotificationPanelOpen && (
        <NotificationPanel closeNotificationPanel={closeNotificationPanel} />
      )} */}

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
