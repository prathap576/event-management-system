import "./Login.css";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useAdmin,
} from "../context/AdminContext";

import {
  useAuth,
} from "../context/AuthContext";


function Login() {

  const navigate = useNavigate();

  const { loginAdmin } = useAdmin();

  const { login } = useAuth();


  const handleLogin = async (e) => {

    e.preventDefault();

    const email =
      e.target.email.value;

    const password =
      e.target.password.value;

    const selectedRole =
      e.target.role.value;


    // ============================
    // ROLE CHECK
    // ============================

    if (!selectedRole) {

      alert("Please select a role.");

      return;
    }


    // ============================
    // LOGIN
    // ============================

    const result =
      await loginAdmin(
        email,
        password
      );


    // ============================
    // LOGIN FAILED
    // ============================

    if (!result.success) {

      alert(
        result.message ||
        "Invalid email or password."
      );

      return;
    }


    // ============================
    // GET LOGGED IN USER
    // ============================

    const loggedInUser =
      result.user;


    if (!loggedInUser) {

      alert(
        "Login successful, but user information was not received."
      );

      return;
    }


    // ============================
    // ROLE CHECK
    // ============================

    if (
      loggedInUser?.role?.toUpperCase() !==
      selectedRole.toUpperCase()
    ) {

      alert(
        "Incorrect role selected."
      );

      return;
    }


    // ============================
    // SAVE USER IN AUTH CONTEXT
    // ============================

    login(loggedInUser);


    // ============================
    // REDIRECT
    // ============================

    if (
      loggedInUser.role.toUpperCase() ===
      "ADMIN"
    ) {

      navigate("/admin");

    } else {

      navigate("/dashboard");
    }
  };


  return (

    <div className="login-page">

      <div className="login-card">

        <div className="login-header">

          <h1>
            Welcome Back
          </h1>

          <p>
            Login to your EventHub account
          </p>

        </div>


        <form
          onSubmit={handleLogin}
        >

          {/* EMAIL */}

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


          {/* PASSWORD */}

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


          {/* ROLE */}

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


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="login-submit"
          >
            Login
          </button>

        </form>


        {/* SIGNUP */}

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