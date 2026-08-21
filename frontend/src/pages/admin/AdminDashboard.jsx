import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [eventsResponse, registrationsResponse] = await Promise.all([
          fetch("http://localhost:8080/api/events"),
          fetch("http://localhost:8080/api/registrations"),
        ]);

        if (!eventsResponse.ok) {
          throw new Error("Failed to fetch events");
        }

        if (!registrationsResponse.ok) {
          throw new Error("Failed to fetch registrations");
        }

        const eventsData = await eventsResponse.json();
        const registrationsData = await registrationsResponse.json();

        setEvents(eventsData);
        setRegistrations(registrationsData);
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Current date
  const today = new Date();

  // Upcoming events
  const upcomingEvents = events.filter((event) => {
    if (!event.date) return false;

    const eventDate = new Date(event.date);
    return eventDate >= today;
  });

  // Completed events
  const completedEvents = events.filter((event) => {
    if (!event.date) return false;

    const eventDate = new Date(event.date);
    return eventDate < today;
  });

  // Recent events - latest first
  const recentEvents = [...events].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }).toUpperCase();
  };

  // Event status
  const getEventStatus = (event) => {
    if (!event.date) return "Upcoming";

    const eventDate = new Date(event.date);

    if (eventDate < today) {
      return "Completed";
    }

    return "Upcoming";
  };

  if (loading) {
    return (
      <div className="admin-dashboard-page">
        <div className="dashboard-loading">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-page">

      {/* Sidebar */}
      <aside className="admin-sidebar">

        <div className="admin-profile">
          <div className="admin-avatar">
            A
          </div>

          <div>
            <h3>Ashok</h3>
            <p>Event Organizer</p>
          </div>
        </div>

        <div className="sidebar-title">
          MAIN MENU
        </div>

        <nav className="admin-menu">

          <Link
            to="/admin"
            className="admin-menu-item active"
          >
            <span>▦</span>
            Dashboard
          </Link>

          <Link
            to="/admin/events"
            className="admin-menu-item"
          >
            <span>⊡</span>
            Manage Events
          </Link>

          <Link
            to="/admin/events/create"
            className="admin-menu-item"
          >
            <span>＋</span>
            Create Event
          </Link>

          <Link
            to="/admin/registrations"
            className="admin-menu-item"
          >
            <span>♙</span>
            Registrations
          </Link>

        </nav>

        <div className="sidebar-bottom">

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>


      {/* Main Content */}
      <main className="admin-main">

        {/* Header */}
        <section className="admin-header">

          <div>
            <span className="admin-label">
              EVENT ORGANIZER DASHBOARD
            </span>

            <h1>
              Welcome back, Ashok 👋
            </h1>

            <p>
              Manage your events and monitor your event activities from one place.
            </p>
          </div>

          <Link
            to="/admin/events/create"
            className="create-event-btn"
          >
            + Create Event
          </Link>

        </section>


        {/* Statistics */}
        <section className="stats-grid">

          {/* Total Events */}
          <div className="stat-card">

            <div className="stat-top">
              <span className="stat-title">
                Total Events
              </span>

              <div className="stat-icon">
                ▣
              </div>
            </div>

            <h2>
              {events.length}
            </h2>

            <p>
              All created events
            </p>

          </div>


          {/* Upcoming */}
          <div className="stat-card">

            <div className="stat-top">
              <span className="stat-title">
                Upcoming Events
              </span>

              <div className="stat-icon">
                ◷
              </div>
            </div>

            <h2>
              {upcomingEvents.length}
            </h2>

            <p>
              Scheduled events
            </p>

          </div>


          {/* Completed */}
          <div className="stat-card">

            <div className="stat-top">
              <span className="stat-title">
                Completed Events
              </span>

              <div className="stat-icon">
                ✓
              </div>
            </div>

            <h2>
              {completedEvents.length}
            </h2>

            <p>
              Finished events
            </p>

          </div>


          {/* Registrations */}
          <div className="stat-card">

            <div className="stat-top">
              <span className="stat-title">
                Registrations
              </span>

              <div className="stat-icon">
                ♙
              </div>
            </div>

            <h2>
              {registrations.length}
            </h2>

            <p>
              Event participants
            </p>

          </div>

        </section>


        {/* Recent Events */}
        <section className="recent-events-card">

          <div className="recent-header">

            <div>
              <h2>
                Recent Events
              </h2>

              <p>
                Events created in your event management system
              </p>
            </div>

            <Link
              to="/admin/events"
              className="view-all-link"
            >
              View All →
            </Link>

          </div>


          <div className="recent-events-list">

            {recentEvents.length === 0 ? (

              <div className="empty-events">
                No events available.
              </div>

            ) : (

              recentEvents.slice(0, 5).map((event) => (

                <div
                  className="recent-event-item"
                  key={event.id}
                >

                  {/* Date */}
                  <div className="event-date-box">

                    <span>
                      {formatDate(event.date).split(" ")[0]}
                    </span>

                    <strong>
                      {formatDate(event.date).split(" ")[1]}
                    </strong>

                  </div>


                  {/* Event Details */}
                  <div className="recent-event-info">

                    <h3>
                      {event.title}
                    </h3>

                    <p>
                      📍 {event.location || "Location not specified"}
                    </p>

                  </div>


                  {/* Status */}
                  <span
                    className={
                      getEventStatus(event) === "Completed"
                        ? "event-status completed"
                        : "event-status upcoming"
                    }
                  >
                    {getEventStatus(event)}
                  </span>

                </div>

              ))

            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;