import { NavLink, useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import "./AdminSidebar.css";

function AdminSidebar() {
  const { admin, logoutAdmin } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear both authentication entries
    logoutAdmin();

    localStorage.removeItem("loggedInUser");

    // Go back to login page
    navigate("/login", { replace: true });
  };

  const organizerName =
    admin?.name || "Event Organizer";

  return (
    <aside className="admin-sidebar">

      {/* ================= BRAND ================= */}


      {/* ================= ORGANIZER PROFILE ================= */}

      <div className="organizer-profile">

        <div className="organizer-avatar">
          {organizerName.charAt(0).toUpperCase()}
        </div>

        <div className="organizer-info">

          <strong>
            {organizerName}
          </strong>

          <span>
            Event Organizer
          </span>

        </div>

      </div>


      {/* ================= MAIN NAVIGATION ================= */}

      <nav className="sidebar-navigation">

        <p className="navigation-title">
          MAIN MENU
        </p>


        {/* ================= DASHBOARD ================= */}

        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `sidebar-link ${
              isActive ? "active" : ""
            }`
          }
        >

          <span className="sidebar-icon">
            ▦
          </span>

          <span>
            Dashboard
          </span>

        </NavLink>


        {/* ================= MANAGE EVENTS ================= */}

        <NavLink
          to="/admin/events"
          end
          className={({ isActive }) =>
            `sidebar-link ${
              isActive ? "active" : ""
            }`
          }
        >

          <span className="sidebar-icon">
            ▣
          </span>

          <span>
            Manage Events
          </span>

        </NavLink>


        {/* ================= CREATE EVENT ================= */}

        <NavLink
          to="/admin/events/create"
          className={({ isActive }) =>
            `sidebar-link ${
              isActive ? "active" : ""
            }`
          }
        >

          <span className="sidebar-icon">
            ＋
          </span>

          <span>
            Create Event
          </span>

        </NavLink>


        {/* ================= REGISTRATIONS ================= */}

        <NavLink
          to="/admin/registrations"
          className={({ isActive }) =>
            `sidebar-link ${
              isActive ? "active" : ""
            }`
          }
        >

          <span className="sidebar-icon">
            ♙
          </span>

          <span>
            Registrations
          </span>

        </NavLink>

      </nav>


      {/* ================= LOGOUT ================= */}

      <div className="sidebar-bottom">

        <button
          type="button"
          className="logout-button"
          onClick={handleLogout}
        >

          <span className="sidebar-icon">
            ↪
          </span>

          <span>
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
}

export default AdminSidebar;