import { Link } from "react-router-dom";
import "./EventCard.css";

function EventCard({ event }) {
  return (
    <article className="event-card">
      <div className="event-image">
        <span>{event.category}</span>
      </div>

      <div className="event-content">
        <h3>{event.title}</h3>

        <p className="event-date">
          📅 {event.date}
        </p>

        <p className="event-location">
          📍 {event.location}
        </p>

        <p className="event-description">
          {event.description}
        </p>

        <Link
          to={`/events/${event.id}`}
          className="view-event-btn"
        >
          View Event
        </Link>
      </div>
    </article>
  );
}

export default EventCard;