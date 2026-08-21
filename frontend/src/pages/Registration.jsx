import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import "./Registration.css";

import events from "../data/events";

import { useAuth } from "../context/AuthContext";


function Registration() {

  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();


  const event = events.find(
    (event) => event.id === Number(id)
  );


  // ==========================================
  // EVENT NOT FOUND
  // ==========================================

  if (!event) {

    return (
      <main className="registration-page">

        <div className="registration-card">

          <h1>
            Event Not Found
          </h1>

          <p>
            The event you are trying to
            register for does not exist.
          </p>

          <Link
            to="/events"
            className="back-events-btn"
          >
            Back to Events
          </Link>

        </div>

      </main>
    );
  }


  // ==========================================
  // HANDLE REGISTRATION
  // ==========================================

  const handleRegistration = async (e) => {

    e.preventDefault();


    const formData = new FormData(e.target);


    const name =
      formData.get("name");

    const email =
      formData.get("email");

    const phone =
      formData.get("phone");


    // ========================================
    // CHECK LOGIN
    // ========================================

    if (!user) {

      alert(
        "Please login before registering for an event."
      );

      navigate("/login");

      return;
    }


    // ========================================
    // CREATE REGISTRATION DATA
    // ========================================

    const registrationData = {

      eventId: event.id,

      name: name,

      email: email,

      phone: phone,
    };


    try {

      // ======================================
      // SEND TO SPRING BOOT
      // ======================================

      const response = await fetch(
        "http://localhost:8080/api/registrations",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(
              registrationData
            ),
        }
      );


      // ======================================
      // HANDLE ERROR
      // ======================================

      if (!response.ok) {

        const errorMessage =
          await response.text();

        alert(
          errorMessage ||
          "Registration failed."
        );

        return;
      }


      // ======================================
      // SUCCESS
      // ======================================

      const savedRegistration =
        await response.json();

      console.log(
        "Registration successful:",
        savedRegistration
      );


      alert(
        "Registration successful!"
      );


      navigate(
        "/my-registrations"
      );

    } catch (error) {

      console.error(
        "Registration error:",
        error
      );

      alert(
        "Unable to connect to the server. Please try again."
      );
    }
  };


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <main className="registration-page">

      <div className="registration-card">


        {/* ====================================
            TITLE
        ==================================== */}

        <h1>
          Event Registration
        </h1>

        <p className="registration-subtitle">
          Register for the selected event
        </p>


        {/* ====================================
            SELECTED EVENT
        ==================================== */}

        <div className="selected-event">

          <h2>
            {event.title}
          </h2>

          <p>
            <strong>
              Category:
            </strong>{" "}
            {event.category}
          </p>

          <p>
            <strong>
              Date:
            </strong>{" "}
            {event.date}
          </p>

          <p>
            <strong>
              Location:
            </strong>{" "}
            {event.location}
          </p>

        </div>


        {/* ====================================
            REGISTRATION FORM
        ==================================== */}

        <form
          onSubmit={handleRegistration}
        >


          {/* FULL NAME */}

          <div className="form-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              defaultValue={
                user?.name || ""
              }
              required
            />

          </div>


          {/* EMAIL */}

          <div className="form-group">

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              defaultValue={
                user?.email || ""
              }
              required
            />

          </div>


          {/* PHONE */}

          <div className="form-group">

            <label>
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter your 10-digit phone number"
              required
              pattern="[6-9][0-9]{9}"
              maxLength="10"
              title="Enter a valid 10-digit Indian mobile number"
            />

          </div>


          {/* SUBMIT */}

          <button
            type="submit"
            className="registration-submit"
          >
            Confirm Registration
          </button>

        </form>


        {/* ====================================
            BACK
        ==================================== */}

        <Link
          to={`/events/${event.id}`}
          className="back-event-link"
        >
          Back to Event Details
        </Link>

      </div>

    </main>
  );
}


export default Registration;