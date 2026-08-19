import { Link } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import { getEventStatus } from "../../utils/eventUtils";

import AdminSidebar from "../../components/admin/AdminSidebar";
import StatCard from "../../components/admin/StatCard";

function AdminDashboard() {
  const {
    admin,
    events,
    registrations,
    statistics,
  } = useAdmin();

  // Latest events
  const recentEvents = [...events]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  // Latest registrations
  const recentRegistrations = [...registrations]
    .sort(
      (a, b) =>
        new Date(b.registeredAt) -
        new Date(a.registeredAt)
    )
    .slice(0, 4);

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-main">

        {/* HEADER */}
        <header className="dashboard-header">

          <div>
            <span className="eyebrow">
              ADMIN DASHBOARD
            </span>

            <h1>
              Good to see you,{" "}
              {admin?.name || "Admin"} 👋
            </h1>

            <p>
              Here's what's happening with your events today.
            </p>
          </div>

          <Link
            to="/admin/events/create"
            className="primary-button"
          >
            + Create Event
          </Link>

        </header>


        {/* STATISTICS */}
        <section className="stats-grid">

          <StatCard
            title="Total Events"
            value={statistics.totalEvents}
            icon="📅"
            description="All events"
          />

          <StatCard
            title="Upcoming"
            value={statistics.upcomingEvents}
            icon="🗓️"
            description="Future events"
          />

          <StatCard
            title="Completed"
            value={statistics.completedEvents}
            icon="✅"
            description="Past events"
          />

          <StatCard
            title="Registrations"
            value={statistics.totalRegistrations}
            icon="👥"
            description={`${statistics.confirmedRegistrations} confirmed`}
          />

        </section>


        {/* DASHBOARD COLUMNS */}
        <div className="dashboard-columns">

          {/* RECENT EVENTS */}
          <section className="dashboard-card">

            <div className="card-header">

              <div>
                <h2>Recent Events</h2>

                <p>
                  Your latest events
                </p>
              </div>

              <Link
                to="/admin/events"
                className="text-button"
              >
                View All →
              </Link>

            </div>


            <div className="mini-event-list">

              {recentEvents.length > 0 ? (
                recentEvents.map((event) => {

                  const currentStatus =
                    getEventStatus(event);

                  return (
                    <div
                      className="mini-event"
                      key={event.id}
                    >

                      <div className="event-date-box">

                        <span>
                          {new Date(
                            event.date
                          ).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                            }
                          )}
                        </span>

                        <strong>
                          {new Date(
                            event.date
                          ).getDate()}
                        </strong>

                      </div>


                      <div className="mini-event-info">

                        <h3>
                          {event.title}
                        </h3>

                        <p>
                          📍 {event.location}
                        </p>

                      </div>


                      <span
                        className={`status-badge ${currentStatus.toLowerCase()}`}
                      >
                        {currentStatus}
                      </span>

                    </div>
                  );
                })
              ) : (
                <div className="empty-state">

                  <div className="empty-icon">
                    📅
                  </div>

                  <p>
                    No events available.
                  </p>

                </div>
              )}

            </div>

          </section>


          {/* RECENT REGISTRATIONS */}
          <section className="dashboard-card">

            <div className="card-header">

              <div>
                <h2>
                  Recent Registrations
                </h2>

                <p>
                  Latest participants
                </p>
              </div>

              <Link
                to="/admin/registrations"
                className="text-button"
              >
                View All →
              </Link>

            </div>


            <div className="registration-list">

              {recentRegistrations.map(
                (registration) => (
                  <div
                    className="registration-item"
                    key={registration.id}
                  >

                    <div className="avatar">
                      {registration.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="registration-info">

                      <strong>
                        {registration.name}
                      </strong>

                      <span>
                        {registration.eventName}
                      </span>

                    </div>

                    <span
                      className={`status-badge ${registration.status.toLowerCase()}`}
                    >
                      {registration.status}
                    </span>

                  </div>
                )
              )}

            </div>

          </section>

        </div>


        {/* QUICK ACTIONS */}
        <section className="quick-actions">

          <h2>
            Quick Actions
          </h2>

          <div className="quick-action-grid">

            <Link
              to="/admin/events/create"
              className="quick-action"
            >

              <span>➕</span>

              <div>

                <strong>
                  Create Event
                </strong>

                <small>
                  Add a new event
                </small>

              </div>

            </Link>


            <Link
              to="/admin/events"
              className="quick-action"
            >

              <span>📋</span>

              <div>

                <strong>
                  Manage Events
                </strong>

                <small>
                  Edit or delete events
                </small>

              </div>

            </Link>


            <Link
              to="/admin/registrations"
              className="quick-action"
            >

              <span>👥</span>

              <div>

                <strong>
                  Registrations
                </strong>

                <small>
                  View participants
                </small>

              </div>

            </Link>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;