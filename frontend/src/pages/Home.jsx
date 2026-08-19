import "./Home.css";
import { Link } from "react-router-dom";
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

          <Link to="/events" className="explore-btn">
            Explore Events
          </Link>
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