import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        EventHub
      </div>

      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="/events">Events</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>

      <div className="navbar-actions">
        <Link to="/login" className="login-btn">Login</Link>
        <Link to="/signup" className="signup-btn">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;