import "./EventCard.css";

function EventCard({ event }) {
  return (
    <div className="event-card">
      <div className="event-image">
        <span>{event.category}</span>
      </div>

      <div className="event-card-content">
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

        <button className="view-event-btn">
          View Event
        </button>
      </div>
    </div>
  );
}

export default EventCard;