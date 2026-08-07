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
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </nav>
  );
}

export default Navbar;