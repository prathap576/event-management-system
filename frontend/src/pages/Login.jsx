import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const selectedRole = e.target.role.value;

    try {

      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );


      // =========================
      // BACKEND RESPONSE
      // =========================

      const data = await response.json();


      // =========================
      // LOGIN FAILED
      // =========================

      if (!response.ok) {

        alert(
          typeof data === "string"
            ? data
            : "Invalid username or password"
        );

        return;
      }


      // =========================
      // CHECK ROLE
      // =========================

      if (data.role !== selectedRole) {

        alert("Incorrect role selected.");

        return;
      }


      // =========================
      // LOGIN SUCCESSFUL
      // =========================

      if (data.role === "ADMIN") {

        navigate("/admin");

      } else {

        navigate("/events");

      }

    } catch (error) {

      console.error(
        "Login error:",
        error
      );

      alert(
        "Inavalid Username or Password."
      );
    }
  };


  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Welcome Back</h1>

        <p>
          Login to your EventHub account
        </p>


        <form onSubmit={handleLogin}>

          {/* =========================
              EMAIL
          ========================= */}

          <div className="form-group">

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />

          </div>


          {/* =========================
              PASSWORD
          ========================= */}

          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />

          </div>


          {/* =========================
              ROLE
          ========================= */}

          <div className="form-group">

            <label>
              Select Role
            </label>

            <select
              name="role"
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
              LOGIN BUTTON
          ========================= */}

          <button
            type="submit"
            className="login-submit"
          >
            Login
          </button>

        </form>


        {/* =========================
            SIGNUP LINK
        ========================= */}

        <p className="signup-text">

          Don't have an account?{" "}

          <Link to="/signup">
            Sign Up
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;