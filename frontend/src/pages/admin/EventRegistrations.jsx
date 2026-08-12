import AdminSidebar from "../../components/admin/AdminSidebar";
import "./AdminPages.css";

function EventRegistrations() {

  const registrations = [];

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-main">

        <div className="page-heading">
          <span>REGISTRATION MANAGEMENT</span>

          <h1>Event Registrations</h1>

          <p>
            View registrations for your events.
          </p>
        </div>

        <section className="dashboard-panel">

          {registrations.length === 0 ? (

            <div className="empty-state">

              <div>👥</div>

              <h3>No registrations available</h3>

              <p>
                Registration data will appear here
                after the registration API is connected.
              </p>

            </div>

          ) : (

            <div className="event-table-container">

              <table className="event-table">

                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Event</th>
                    <th>Status</th>
                    <th>Registered At</th>
                  </tr>
                </thead>

                <tbody>

                  {registrations.map((registration) => (

                    <tr key={registration.id}>

                      <td>{registration.name}</td>
                      <td>{registration.email}</td>
                      <td>{registration.event}</td>
                      <td>{registration.status}</td>
                      <td>{registration.registeredAt}</td>

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

export default EventRegistrations;