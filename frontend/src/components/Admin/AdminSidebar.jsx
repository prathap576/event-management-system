import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">

      <div className="admin-brand">
        <div className="admin-logo">EM</div>

        <div>
          <h2>EventManager</h2>
          <span>Administration</span>
        </div>
      </div>

      <div className="sidebar-section">
        <p>MAIN MENU</p>

        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span>📊</span>
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/events"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span>📅</span>
          Manage Events
        </NavLink>

        <NavLink
          to="/admin/events/create"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span>➕</span>
          Create Event
        </NavLink>

        <NavLink
          to="/admin/registrations"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span>👥</span>
          Registrations
        </NavLink>
      </div>

      <div className="sidebar-bottom">

        <NavLink to="/" className="sidebar-link">
          <span>🏠</span>
          Back to Website
        </NavLink>

        <button className="sidebar-logout">
          <span>🚪</span>
          Logout
        </button>

      </div>

    </aside>
  );
}

export default AdminSidebar;