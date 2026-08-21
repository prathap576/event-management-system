import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import EventCard from "../components/EventCard/EventCard";

import {
  getEventStatus,
} from "../utils/eventUtils";

import "./Home.css";


function Home() {

  const [events, setEvents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // =========================================
  // LOAD EVENTS FROM BACKEND
  // =========================================

  useEffect(() => {

    const loadEvents = async () => {

      try {

        setLoading(true);
        setError("");

        const response =
          await fetch(
            "http://localhost:8080/api/events"
          );

        if (!response.ok) {
          throw new Error(
            "Failed to load events"
          );
        }

        const data =
          await response.json();

        setEvents(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (error) {

        console.error(
          "Error loading events:",
          error
        );

        setError(
          "Unable to load events right now."
        );

        setEvents([]);

      } finally {

        setLoading(false);

      }

    };

    loadEvents();

  }, []);


  // =========================================
  // GET UPCOMING EVENTS
  // =========================================

  const upcomingEvents =
    events
      .filter(
        (event) =>
          getEventStatus(event) ===
          "Upcoming"
      )
      .slice(0, 3);


  return (

    <main className="home">


      {/* =====================================
          HERO SECTION
      ===================================== */}

      <section className="hero">

        <div className="hero-content">

          <span className="hero-label">
            EVENTHUB
          </span>

          <h1>
            Discover Events
            <br />
            That Matter
          </h1>

          <p>
            Find, explore and participate
            in exciting events happening
            around you.
          </p>

          {/* Public - No Login Required */}

          <Link
            to="/events"
            className="explore-btn"
          >
            Explore Events
          </Link>

        </div>

      </section>


      {/* =====================================
          UPCOMING EVENTS
      ===================================== */}

      <section className="upcoming-events">

        <div className="section-header">

          <div>

            <span className="section-label">
              WHAT'S HAPPENING
            </span>

            <h2>
              Upcoming Events
            </h2>

            <p>
              Discover exciting events and
              activities happening soon.
            </p>

          </div>


          {/* Public - No Login Required */}

          <Link
            to="/events"
            className="view-all-link"
          >
            View All Events →
          </Link>

        </div>


        {/* LOADING */}

        {loading && (

          <div className="home-state">

            <div className="state-icon">
              ◷
            </div>

            <h3>
              Loading events...
            </h3>

            <p>
              Please wait while we fetch
              the latest events.
            </p>

          </div>

        )}


        {/* ERROR */}

        {!loading &&
          error && (

            <div className="home-state">

              <div className="state-icon">
                !
              </div>

              <h3>
                Unable to load events
              </h3>

              <p>
                {error}
              </p>

            </div>

          )}


        {/* NO EVENTS */}

        {!loading &&
          !error &&
          upcomingEvents.length === 0 && (

            <div className="home-state">

              <div className="state-icon">
                📅
              </div>

              <h3>
                No upcoming events
              </h3>

              <p>
                Check back soon for new
                events.
              </p>

              <Link
                to="/events"
                className="state-button"
              >
                Explore Events
              </Link>

            </div>

          )}


        {/* EVENT CARDS */}

        {!loading &&
          !error &&
          upcomingEvents.length > 0 && (

            <div className="events-grid">

              {upcomingEvents.map(
                (event) => (

                  <EventCard
                    key={event.id}
                    event={event}
                  />

                )
              )}

            </div>

          )}

      </section>


      {/* =====================================
          WHY EVENTHUB
      ===================================== */}

      <section className="why-eventhub">

        <div className="why-content">

          <span className="section-label">
            WHY EVENTHUB
          </span>

          <h2>
            Everything You Need
            <br />
            in One Place
          </h2>

          <p>
            EventHub makes it simple to
            discover events, explore what
            interests you, and connect with
            the right experiences.
          </p>

        </div>


        <div className="why-grid">


          <div className="why-card">

            <div className="why-icon">
              🔎
            </div>

            <h3>
              Discover Events
            </h3>

            <p>
              Find events that match your
              interests and preferences.
            </p>

          </div>


          <div className="why-card">

            <div className="why-icon">
              📅
            </div>

            <h3>
              Easy to Explore
            </h3>

            <p>
              View event details, dates,
              locations and more.
            </p>

          </div>


          <div className="why-card">

            <div className="why-icon">
              🤝
            </div>

            <h3>
              Connect & Participate
            </h3>

            <p>
              Take part in events and
              create memorable experiences.
            </p>

          </div>


        </div>

      </section>


    </main>

  );

}


export default Home;