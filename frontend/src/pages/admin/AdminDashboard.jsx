import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import StatCard from "../../components/admin/StatCard";
import { getAllEvents } from "../../services/eventApi";
import "./AdminDashboard.css";

function AdminDashboard() {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await getAllEvents();
      setEvents(data);
    } catch (error) {
      console.error("Failed to load events:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-main">

        <header className="dashboard-header">

          <div>
            <span className="dashboard-label">
              ADMIN PANEL
            </span>

            <h1>Dashboard</h1>

            <p>
              Welcome back. Manage your events and registrations.
            </p>
          </div>

          <Link
            to="/admin/events/create"
            className="primary-button"
          >
            + Create Event
          </Link>

        </header>

        <section className="stats-grid">

          <StatCard
            title="Total Events"
            value={events.length}
            icon="📅"
            description="All events"
          />

          <StatCard
            title="Upcoming Events"
            value={events.length}
            icon="🗓️"
            description="Scheduled events"
          />

          <StatCard
            title="Registrations"
            value="120"
            icon="👥"
            description="Total registrations"
          />

          <StatCard
            title="Cancelled"
            value="5"
            icon="❌"
            description="Cancelled registrations"
          />

        </section>

        <section className="dashboard-panel">

          <div className="panel-header">

            <div>
              <h2>Recent Events</h2>
              <p>Recently available events</p>
            </div>

            <Link
              to="/admin/events"
              className="secondary-button"
            >
              View All
            </Link>

          </div>

          {loading ? (
            <div className="loading-state">
              Loading events...
            </div>
          ) : events.length === 0 ? (
            <div className="empty-state">
              <div>📅</div>
              <h3>No events found</h3>
              <p>Create your first event to get started.</p>

              <Link
                to="/admin/events/create"
                className="primary-button"
              >
                Create Event
              </Link>
            </div>
          ) : (
            <div className="event-table-wrapper">

              <table className="event-table">

                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Category</th>
                    <th>Capacity</th>
                  </tr>
                </thead>

                <tbody>

                  {events.slice(0, 5).map((event) => (

                    <tr key={event.id}>

                      <td>
                        <strong>{event.title}</strong>
                      </td>

                      <td>{event.date}</td>

                      <td>{event.location}</td>

                      <td>
                        <span className="category-tag">
                          {event.category}
                        </span>
                      </td>

                      <td>{event.capacity}</td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;