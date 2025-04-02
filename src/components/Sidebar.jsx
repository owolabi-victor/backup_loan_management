import { Link, useNavigate } from "react-router-dom";
import "../assets/css/Sidebar.css"; // Import CSS file
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(localStorage.getItem("name"));
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="logo">BankApp</div>
      <nav className="sidebar-nav">
        <ul>
          <li className="sidebar-nav-item active">
            <Link to="/dashboard" className="sidebar-link ">
              <span style={{ marginRight: "10px" }}>🏠</span>
              Dashboard
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
          <p
            // style="font-size: 12px; color: #666;"
            style={{ fontSize: "12px", color: "#666" }}
          >
            Personal Account
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
