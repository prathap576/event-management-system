import { useState } from "react";
import "./Events.css";
import EventCard from "../components/EventCard/EventCard";
import events from "../data/events";

function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique categories from events
  const categories = [
    "All",
    ...new Set(events.map((event) => event.category)),
  ];

  // Filter events
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
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
            <p>Try a different search or category.</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Events;