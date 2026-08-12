import { Link } from "react-router-dom";
import "./EventTable.css";

function EventTable({ events, onDelete }) {

  if (!events || events.length === 0) {
    return (
      <div className="event-table-empty">
        <div>📅</div>
        <h3>No events found</h3>
        <p>Create an event to see it here.</p>
      </div>
    );
  }

  return (
    <div className="event-table-container">

      <table className="event-table">

        <thead>
          <tr>
            <th>Event</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
            <th>Category</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {events.map((event) => (

            <tr key={event.id}>

              <td>
                <strong>{event.title}</strong>
              </td>

              <td>{event.date}</td>

              <td>{event.time}</td>

              <td>{event.location}</td>

              <td>
                <span className="event-category">
                  {event.category}
                </span>
              </td>

              <td>{event.capacity}</td>

              <td>

                <div className="event-actions">

                  <Link
                    to={`/admin/events/edit/${event.id}`}
                    className="edit-action"
                  >
                    Edit
                  </Link>

                  <button
                    className="delete-action"
                    onClick={() => onDelete(event)}
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default EventTable;