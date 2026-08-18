import { Link, useParams } from "react-router-dom";
import "./EventDetails.css";
import events from "../data/events";

function EventDetails() {
  const { id } = useParams();

  const event = events.find(
    (event) => event.id === Number(id)
  );

  if (!event) {
    return (
      <main className="event-details-page">
        <div className="event-not-found">
          <h1>Event Not Found</h1>

          <p>
            The event you are looking for does not exist.
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

  return (
    <main className="event-details-page">
      <section className="event-details-container">

        <div className="event-details-image">
          <span>{event.category}</span>
        </div>

        <div className="event-details-content">

          <p className="event-category">
            {event.category}
          </p>

          <h1>{event.title}</h1>

          <div className="event-info">

            <p>
              📅 <strong>Date:</strong> {event.date}
            </p>

            <p>
              📍 <strong>Location:</strong> {event.location}
            </p>

          </div>

          <div className="event-description-section">

            <h2>About This Event</h2>

            <p>{event.description}</p>

          </div>

          <div className="event-details-actions">

            <Link
              to={`/registration/${event.id}`}
              className="register-btn"
            >
              Register Now
            </Link>

            <Link
              to="/events"
              className="back-events-btn"
            >
              Back to Events
            </Link>

          </div>

        </div>

      </section>
    </main>
  );
}

export default EventDetails;