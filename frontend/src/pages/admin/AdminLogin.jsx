import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAdmin,
} from "../../context/AdminContext";


function AdminLogin() {

  const navigate =
    useNavigate();

  const {
    loginAdmin,
  } = useAdmin();


  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  const handleSubmit = (
    event
  ) => {

    event.preventDefault();

    setError("");

    setLoading(true);


    setTimeout(() => {

      const result =
        loginAdmin(
          email,
          password
        );


      if (result.success) {

        navigate("/admin");

      } else {

        setError(
          result.message
        );

      }


      setLoading(false);

    }, 500);

  };


  return (

    <div className="login-page">

      <div className="login-background-shape shape-one"></div>

      <div className="login-background-shape shape-two"></div>


      <div className="login-card">

        <div className="login-logo">
          EM
        </div>


        <div className="login-header">

          <span className="eyebrow">
            ADMIN PORTAL
          </span>

          <h1>
            Welcome back
          </h1>

          <p>
            Sign in to manage your
            events and registrations.
          </p>

        </div>


        {error && (

          <div className="login-error">

            <span>
              ⚠
            </span>

            {error}

          </div>

        )}


        <form
          onSubmit={
            handleSubmit
          }
          className="login-form"
        >


          {/* EMAIL */}

          <div className="form-field">

            <label>
              Email Address
            </label>

            <div className="input-wrapper">

              <span>
                ✉
              </span>

              <input
                type="email"
                placeholder="admin@event.com"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                required
              />

            </div>

          </div>


          {/* PASSWORD */}

          <div className="form-field">

            <label>
              Password
            </label>

            <div className="input-wrapper">

              <span>
                🔒
              </span>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

          </div>


          {/* LOGIN */}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >

            {loading
              ? "Signing in..."
              : "Sign In"}

          </button>

        </form>


        {/* DEMO LOGIN */}

        <div className="demo-login">

          <div className="demo-title">
            Development credentials
          </div>

          <div>

            <span>
              Email
            </span>

            <strong>
              admin@event.com
            </strong>

          </div>

          <div>

            <span>
              Password
            </span>

            <strong>
              admin123
            </strong>

          </div>

        </div>


        <p className="login-footer">
          Event Management System
        </p>

      </div>

    </div>
  );
}

export default AdminLogin;