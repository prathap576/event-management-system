import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // HANDLE INPUT CHANGES
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // =========================
  // HANDLE SIGNUP
  // =========================

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");

    // Check passwords
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/signup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: formData.name,
            username: formData.username,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          }),
        }
      );

      // Get backend response as text
      const responseText = await response.text();

      let message = "";

      // =========================
      // READ BACKEND RESPONSE
      // =========================

      try {
        const jsonData = JSON.parse(responseText);

        // If backend sends a message
        if (jsonData.message) {
          message = jsonData.message;
        } else {
          // Backend returned User object
          message = "Account created successfully!";
        }
      } catch {
        // Backend returned plain text
        message = responseText;
      }

      // =========================
      // SIGNUP FAILED
      // =========================

      if (!response.ok) {
        setError(message || "Signup failed.");
        return;
      }

      // =========================
      // SIGNUP SUCCESS
      // =========================

      alert("Account created successfully!");

      // Go to Login page
      navigate("/login");

    } catch (error) {
      console.error("Signup error:", error);

      setError(
        "Unable to connect to backend server."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">

      <div className="signup-card">

        <h1>Create Account</h1>

        <p>
          Join EventHub and discover amazing events
        </p>

        {/* =========================
            ERROR MESSAGE
        ========================= */}

        {error && (
          <div className="signup-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup}>

          {/* =========================
              FULL NAME
          ========================= */}

          <div className="form-group">

            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>


          {/* =========================
              USERNAME
          ========================= */}

          <div className="form-group">

            <label>Username</label>

            <input
              type="text"
              name="username"
              placeholder="Create a username"
              value={formData.username}
              onChange={handleChange}
              required
            />

          </div>


          {/* =========================
              EMAIL
          ========================= */}

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>


          {/* =========================
              PHONE NUMBER
          ========================= */}

          <div className="form-group">

            <label>Phone Number</label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              maxLength="10"
              required
            />

          </div>


          {/* =========================
              PASSWORD
          ========================= */}

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>


          {/* =========================
              CONFIRM PASSWORD
          ========================= */}

          <div className="form-group">

            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

          </div>


          {/* =========================
              ROLE
          ========================= */}

          <div className="form-group">

            <label>Select Role</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Role
              </option>

              <option value="USER">
                User
              </option>

              <option value="ADMIN">
                Admin
              </option>

            </select>

          </div>


          {/* =========================
              SUBMIT BUTTON
          ========================= */}

          <button
            type="submit"
            className="signup-submit"
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Create Account"}

          </button>

        </form>


        {/* =========================
            LOGIN LINK
        ========================= */}

        <p className="login-text">

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Signup;