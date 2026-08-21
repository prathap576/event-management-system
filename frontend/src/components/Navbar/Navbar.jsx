import {
  Link,
  useNavigate,
} from "react-router-dom";

import "./Navbar.css";

import {
  useAuth,
} from "../../context/AuthContext";


function Navbar() {

  const navigate = useNavigate();

  const {
    user,
    isLoggedIn,
    logout,
  } = useAuth();


  const handleLogout = () => {

    logout();

    navigate("/");
  };


  return (

    <nav className="navbar">

      {/* =========================
          LOGO
      ========================= */}

      <Link
        to="/"
        className="navbar-logo"
      >
        EventHub
      </Link>


      {/* =========================
          NAVIGATION
      ========================= */}

      <div className="navbar-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/events">
          Events
        </Link>

        {isLoggedIn && user?.role?.toUpperCase() === "USER" && (

          <Link to="/dashboard">
            Dashboard
          </Link>

        )}

        <Link to="/about">
          About
        </Link>

        <Link to="/contact">
          Contact
        </Link>

      </div>


      {/* =========================
          RIGHT SIDE
      ========================= */}

      <div className="navbar-actions">

        {!isLoggedIn ? (

          <>

            <Link
              to="/login"
              className="login-btn"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="signup-btn"
            >
              Sign Up
            </Link>

          </>

        ) : (

          <>

            <span className="navbar-username">

              Hi,{" "}

              {user?.username ||
                user?.name ||
                "User"}

            </span>

            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>

          </>

        )}

      </div>

    </nav>
  );
}

export default Navbar;