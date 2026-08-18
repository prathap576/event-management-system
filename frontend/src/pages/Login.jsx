import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

function Login() {
  const navigate = useNavigate();
  const { loginAdmin } = useAdmin();

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = e.target.role.value;

    // ADMIN LOGIN
    if (role === "ADMIN") {
      const result = loginAdmin(email, password);

      if (result.success) {
        navigate("/admin");
      } else {
        alert(result.message);
      }

      return;
    }

    // NORMAL USER LOGIN
    if (role === "USER") {
      localStorage.setItem("userRole", "USER");

      // User dashboard is not created yet
      // So temporarily go to Events
      navigate("/events");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>Welcome Back</h1>

        <p>Login to your EventHub account</p>

        <form onSubmit={handleLogin}>

          {/* EMAIL */}
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* ROLE */}
          <div className="form-group">
            <label>Select Role</label>

            <select name="role" required>
              <option value="">Select Role</option>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="login-submit"
          >
            Login
          </button>

        </form>

        <p className="signup-text">
          Don't have an account?{" "}
          <Link to="/signup">Sign Up</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;