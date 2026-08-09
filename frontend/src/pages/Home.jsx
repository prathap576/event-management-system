import "./Home.css";
import EventCard from "../components/EventCard/EventCard";

function Home() {
  const upcomingEvents = [
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
    <main className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Discover Events That Matter
          </h1>

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
          {upcomingEvents.map((event) => (
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