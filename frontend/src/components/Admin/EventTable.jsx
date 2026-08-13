import { Link } from "react-router-dom";

import {
  getEventStatus,
} from "../../utils/eventUtils";

function EventTable({
  events,
  onDelete,
}) {
  if (!events.length) {
    return (
      <div className="empty-state">

        <div className="empty-icon">
          📅
        </div>

        <h3>
          No events found
        </h3>

        <p>
          Try changing your filters
          or create a new event.
        </p>

      </div>
    );
  }

  return (
    <div className="table-wrapper">

      <table className="admin-table">

        <thead>

          <tr>

            <th>
              EVENT
            </th>

            <th>
              DATE & TIME
            </th>

            <th>
              LOCATION
            </th>

            <th>
              CATEGORY
            </th>

            <th>
              CAPACITY
            </th>

            <th>
              STATUS
            </th>

            <th>
              ACTIONS
            </th>

          </tr>

        </thead>


        <tbody>

          {events.map((event) => {

            const currentStatus =
              getEventStatus(event);

            return (
              <tr key={event.id}>

                {/* EVENT */}

                <td>

                  <div className="table-event">

                    <div className="table-event-icon">

                      {event.category ===
                      "Coding"
                        ? "💻"
                        : event.category ===
                          "Workshop"
                        ? "🛠️"
                        : event.category ===
                          "Cultural"
                        ? "🎭"
                        : event.category ===
                          "Seminar"
                        ? "🎓"
                        : "📅"}

                    </div>

                    <div>

                      <strong>
                        {event.title}
                      </strong>

                      <span>
                        ID #{event.id}
                      </span>

                    </div>

                  </div>

                </td>


                {/* DATE */}

                <td>

                  <div className="table-date">

                    <strong>
                      {new Date(
                        event.date
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </strong>

                    <span>
                      {event.time}
                    </span>

                  </div>

                </td>


                {/* LOCATION */}

                <td>
                  📍 {event.location}
                </td>


                {/* CATEGORY */}

                <td>

                  <span className="category-pill">
                    {event.category}
                  </span>

                </td>


                {/* CAPACITY */}

                <td>
                  {event.capacity}
                </td>


                {/* STATUS */}

                <td>

                  <span
                    className={`status-badge ${currentStatus.toLowerCase()}`}
                  >
                    {currentStatus}
                  </span>

                </td>


                {/* ACTIONS */}

                <td>

                  <div className="action-buttons">

                    <Link
                      to={`/admin/events/edit/${event.id}`}
                      className="icon-action edit"
                      title="Edit event"
                    >
                      ✏️
                    </Link>

                    <button
                      type="button"
                      className="icon-action delete"
                      title="Delete event"
                      onClick={() =>
                        onDelete(event)
                      }
                    >
                      🗑️
                    </button>

                  </div>

                </td>

              </tr>
            );
          })}

        </tbody>

      </table>

    </div>
  );
}

export default EventTable;