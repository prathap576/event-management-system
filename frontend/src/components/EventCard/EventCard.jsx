import { Link } from "react-router-dom";
import "./EventCard.css";

function EventCard({ event }) {

  // =========================================
  // FORMAT DATE
  // YYYY-MM-DD → DD/MM/YYYY
  // =========================================

  const formatDate = (date) => {

    if (!date) {
      return "Date not available";
    }

    const parts = date.split("-");

    if (parts.length === 3) {

      return `${parts[2]}/${parts[1]}/${parts[0]}`;

    }

    return date;
  };


  return (

    <article className="event-card">

      {/* =====================================
          EVENT IMAGE / CATEGORY
      ===================================== */}

      <div className="event-image">

        <span>
          {event.category || "Event"}
        </span>

      </div>


      {/* =====================================
          EVENT CONTENT
      ===================================== */}

      <div className="event-card-content">

        <h3>
          {event.title}
        </h3>


        {/* DATE */}

        <div className="event-detail">

          <span className="event-icon">
            📅
          </span>

          <span>
            {formatDate(event.date)}
          </span>

        </div>


        {/* TIME */}

        <div className="event-detail">

          <span className="event-icon">
            ⏰
          </span>

          <span>
            {event.time || "Time not available"}
          </span>

        </div>


        {/* LOCATION */}

        <div className="event-detail">

          <span className="event-icon">
            📍
          </span>

          <span>
            {event.location || "Location not available"}
          </span>

        </div>


        {/* DESCRIPTION */}

        <p className="event-description">

          {event.description || "No description available."}

        </p>


        {/* VIEW EVENT */}

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