import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./src/components/Sidebar";
import "./Layout.css";

const Layout = () => {
  const location = useLocation();

  // Pages where the sidebar should NOT be shown
  const hideSidebarRoutes = ["/login", "/signup"];

  return (
    <div className="app-container web-view">
      {/* Show sidebar only if NOT on login/signup */}
      {!hideSidebarRoutes.includes(location.pathname) && <Sidebar />}

      {/* Main Content */}
      <div className="main-content">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <div className="notification" id="webNotificationBell">
            <span>🔔</span>
            <span className="notification-badge">2</span>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
