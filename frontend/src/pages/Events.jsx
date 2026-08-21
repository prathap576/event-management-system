import { useEffect, useState } from "react";
import "./Events.css";
import EventCard from "../components/EventCard/EventCard";

function Events() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch events from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/events")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        return response.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError("Unable to load events.");
        setLoading(false);
      });
  }, []);

  // Get unique categories
  const categories = [
    "All",
    ...new Set(events.map((event) => event.category)),
  ];

  // Filter events
  const filteredEvents = events.filter((event) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      event.title?.toLowerCase().includes(search) ||
      event.description?.toLowerCase().includes(search) ||
      event.location?.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "All" ||
      event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <main className="events-page">
        <section className="events-header">
          <h1>All Events</h1>
          <p>Loading events...</p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="events-page">
        <section className="events-header">
          <h1>All Events</h1>
          <p>{error}</p>
        </section>
      </main>
    );
  }

  return (
    <main className="events-page">

      {/* Page Header */}
      <section className="events-header">
        <h1>All Events</h1>
        <p>Explore all upcoming events.</p>
      </section>

      {/* Search and Filter */}
      <section className="events-controls">

        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value)
          }
        >
          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

      </section>

      {/* Events */}
      <section className="events-list">

        {filteredEvents.length > 0 ? (

          <div className="events-grid">

            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
              />
            ))}

          </div>

        ) : (

          <div className="no-events">
            <h2>No events found</h2>
            <p>
              There are no events available right now.
            </p>
          </div>

        )}

      </section>

    </main>
  );
}

export default Events;