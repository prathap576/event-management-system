import "./MyRegistrations.css";

function MyRegistrations() {
  const registrations = [
    {
      id: 1,
      title: "Tech Conference 2026",
      date: "August 20, 2026",
      location: "Kadapa",
      status: "Registered",
    },
  ];

  return (
    <main className="my-registrations">
      <section className="registrations-header">
        <h1>My Registrations</h1>
        <p>View the events you have registered for.</p>
      </section>

      <section className="registrations-list">
        {registrations.length > 0 ? (
          registrations.map((event) => (
            <div className="registration-card" key={event.id}>
              <h2>{event.title}</h2>

              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>

              <span className="registration-status">
                {event.status}
              </span>
            </div>
          ))
        ) : (
          <div className="no-registrations">
            <h2>No Registrations</h2>
            <p>You haven't registered for any events yet.</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default MyRegistrations;