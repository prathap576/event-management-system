import { Link, useNavigate, useParams } from "react-router-dom";
import "./Registration.css";
import events from "../data/events";

function Registration() {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = events.find(
    (event) => event.id === Number(id)
  );

  if (!event) {
    return (
      <main className="registration-page">
        <div className="registration-card">
          <h1>Event Not Found</h1>
          <p>
            The event you are trying to register for does not exist.
          </p>

          <Link to="/events" className="back-events-btn">
            Back to Events
          </Link>
        </div>
      </main>
    );
  }

  const handleRegistration = (e) => {
    e.preventDefault();

    // Temporary frontend registration
    alert("Registration successful!");

    navigate("/my-registrations");
  };

  return (
    <main className="registration-page">
      <div className="registration-card">

        <h1>Event Registration</h1>

        <p className="registration-subtitle">
          Register for the selected event
        </p>

        <div className="selected-event">
          <h2>{event.title}</h2>

          <p>
            <strong>Category:</strong> {event.category}
          </p>

          <p>
            <strong>Date:</strong> {event.date}
          </p>

          <p>
            <strong>Location:</strong> {event.location}
          </p>
        </div>

        <form onSubmit={handleRegistration}>

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>

            <input
                type="tel"
                placeholder="Enter your phone number"
                required
                pattern="[0-9]{10}"
                maxLength="10"
            />
            </div>

          <button
            type="submit"
            className="registration-submit"
          >
            Confirm Registration
          </button>

        </form>

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