import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const role = e.target.role.value;

    // Temporary frontend storage
    localStorage.setItem("userRole", role);

    // After successful signup, go to Login page
    navigate("/login");
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1>Create Account</h1>

        <p>Join EventHub and discover amazing events</p>

        <form onSubmit={handleSignup}>
          {/* Full Name */}
          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="tel"
              placeholder="Enter your phone number"
              pattern="[0-9]{10}"
              maxLength="10"
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Create a password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Role Selection */}
          <div className="form-group">
            <label>Select Role</label>

            <select name="role" required>
              <option value="">Select Role</option>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="signup-submit"
          >
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;