import "./Events.css";
import EventCard from "../components/EventCard/EventCard";

function Events() {
  const events = [
    {
      id: 1,
      title: "Tech Conference 2026",
      category: "Technology",
      date: "August 20, 2026",
      location: "Kadapa",
      description:
        "Explore the latest trends in technology and innovation."
    },
    {
      id: 2,
      title: "College Cultural Fest",
      category: "Cultural",
      date: "August 25, 2026",
      location: "KSRM College",
      description:
        "Enjoy music, dance, games and exciting cultural activities."
    },
    {
      id: 3,
      title: "Web Development Workshop",
      category: "Workshop",
      date: "September 5, 2026",
      location: "Kadapa",
      description:
        "Learn modern web development concepts through hands-on sessions."
    }
  ];

  return (
    <main className="events-page">
      <section className="events-header">
        <h1>Explore Events</h1>
        <p>Find exciting events and activities happening around you.</p>
      </section>

      <section className="events-list">
        <div className="events-grid">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Events;