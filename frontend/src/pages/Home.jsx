import "./Home.css";
import EventCard from "../components/EventCard/EventCard";
import events from "../data/events";

function Home() {
  return (
    <main className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Events That Matter</h1>

          <p>
            Find and explore exciting events happening around you.
          </p>

          <button className="explore-btn">
            Explore Events
          </button>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="upcoming-events">
        <div className="section-header">
          <h2>Upcoming Events</h2>

          <p>
            Discover the latest events and activities.
          </p>
        </div>

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

export default Home;