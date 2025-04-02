import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import more from "../assets/icons/more.svg";
import { getLoans } from "../api/core-api";
import LoanDetails from "../components/LoanDetails";
import Loader from "../components/loader";
import moment from "moment";

function Loans() {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const [loans, setLoans] = useState([]);
  const [loanDetails, setLoanDetails] = useState(null);
  const [isOpenLoanDetails, setIsOpenLoanDetails] = useState(false);
  const [loadingLoans, setLoadingLoans] = useState(true);

  useEffect(() => {
    setUsername(localStorage.getItem("name"));
    const token = localStorage.getItem("authToken");
    setToken(token);

    getLoans(token)
      .then((res) => {
        console.log(res);
        setLoans(res.data.loans);
        setLoadingLoans(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingLoans(false);

        alert(err.response.data.error);
      });
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="app-container web-view">
      {/* Show sidebar only if NOT on login/signup */}
      <div className="sidebar">
        <div className="logo">BankApp</div>
        <nav className="sidebar-nav">
          <ul>
            <li className="sidebar-nav-item">
              <Link to="/dashboard" className="sidebar-link ">
                <span style={{ marginRight: "10px" }}>🏠</span>
                Dashboard
              </Link>
            </li>

            <li className={"sidebar-nav-item active"}>
              <Link to="/loans" className="sidebar-link ">
                <span style={{ marginRight: "10px" }}>💰</span>
                Loans
              </Link>
            </li>
          </ul>
        </nav>
        <div
          onClick={logout}
          className="user-info"
          style={{
            marginTop: "auto",
            paddingTop: "20px",
            borderTop: "1px solid #eee",
            cursor: "pointer",
          }}
        >
          <div className="avatar">
            <image src="/api/placeholder/40/40" alt="User Avatar" />
          </div>
          <div>
            <p>{username}</p>
            <p style={{ fontSize: "12px", color: "#666" }}>Personal Account</p>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="main-content">
        <div className="dashboard-header">
          <h2>Loans</h2>
          <div className="notification" id="webNotificationBell">
            <span>🔔</span>
            <span className="notification-badge">2</span>
          </div>
        </div>

        <div className="transactions-section">
          <h3 className="section-title">Recent Loans</h3>

          {loadingLoans ? (
            <Loader />
          ) : (
            loans.map((loan) => (
              <div className="transaction-item" data-id="tx1" key={loan.id}>
                <div className="transaction-info">
                  <div className="transaction-icon">💰</div>
                  <div className="transaction-details">
                    <span className="transaction-type">Loan</span>
                    <span className="transaction-date">
                      {moment(loan.created_at).format("YYYY-MM-DD HH:mm:ss")}
                    </span>
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
            ))
          )}

          {/* Modals */}

          <LoanDetails
            isopen={isOpenLoanDetails}
            setIsopen={setIsOpenLoanDetails}
            LoanDetails={loanDetails}
            token={token}
          />

          {/* Take loan */}
        </div>
      </div>
    </div>
  );
}

export default Loans;
