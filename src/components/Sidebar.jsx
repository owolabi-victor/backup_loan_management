import { Link } from "react-router-dom";
import "../assets/css/Sidebar.css"; // Import CSS file

const Sidebar = () => {
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
    </div>
  );
};

export default Sidebar;
