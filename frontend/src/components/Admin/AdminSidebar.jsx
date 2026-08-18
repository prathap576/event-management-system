import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useAdmin } from "../../context/AdminContext";

function AdminSidebar() {
  const navigate = useNavigate();

  const {
    admin,
    logoutAdmin,
    resetDemoData,
  } = useAdmin();

  const handleLogout = () => {
    logoutAdmin();

    navigate("/admin-login");
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      "Reset all demo events and registrations?"
    );

    if (!confirmed) {
      return;
    }

    resetDemoData();

    window.location.reload();
  };

  return (
    <aside className="admin-sidebar">

      {/* BRAND */}

      <div className="sidebar-brand">

        <div className="brand-logo">
          EM
        </div>

        <div>
          <strong>
            EventManager
          </strong>

          <span>
            Admin Panel
          </span>
        </div>

      </div>


      {/* ADMIN USER */}

      <div className="sidebar-user">

        <div className="sidebar-avatar">
          {admin?.name
            ?.charAt(0)
            .toUpperCase() || "A"}
        </div>

        <div>
          <strong>
            {admin?.name || "Admin"}
          </strong>

          <span>
            Administrator
          </span>
        </div>

      </div>


      {/* NAVIGATION */}

      <nav className="sidebar-nav">

        <span className="sidebar-section-title">
          MAIN MENU
        </span>


        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `sidebar-link ${
              isActive ? "active" : ""
            }`
          }
        >
          <span>📊</span>
          <span>Dashboard</span>
        </NavLink>


        <NavLink
          to="/admin/events"
          className={({ isActive }) =>
            `sidebar-link ${
              isActive ? "active" : ""
            }`
          }
        >
          <span>📅</span>
          <span>Manage Events</span>
        </NavLink>


        <NavLink
          to="/admin/events/create"
          className={({ isActive }) =>
            `sidebar-link ${
              isActive ? "active" : ""
            }`
          }
        >
          <span>➕</span>
          <span>Create Event</span>
        </NavLink>


        <NavLink
          to="/admin/registrations"
          className={({ isActive }) =>
            `sidebar-link ${
              isActive ? "active" : ""
            }`
          }
        >
          <span>👥</span>
          <span>Registrations</span>
        </NavLink>


        <span className="sidebar-section-title second">
          SYSTEM
        </span>


        <button
          type="button"
          className="sidebar-link sidebar-button"
          onClick={handleReset}
        >
          <span>🔄</span>
          <span>Reset Demo Data</span>
        </button>

      </nav>


      {/* BOTTOM */}

      <div className="sidebar-bottom">

        <div className="sidebar-status">

          <span className="online-dot"></span>

          <span>
            Demo mode active
          </span>

        </div>


        <button
          type="button"
          className="sidebar-link sidebar-button logout"
          onClick={handleLogout}
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default AdminSidebar;