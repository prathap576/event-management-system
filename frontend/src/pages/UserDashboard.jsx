import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import "./UserDashboard.css";

import {
  useAuth,
} from "../context/AuthContext";


function UserDashboard() {

  const {
    user,
  } = useAuth();


  const [registrations, setRegistrations] =
    useState([]);

  const [events, setEvents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // =========================================
  // LOAD USER REGISTRATIONS
  // =========================================

  useEffect(() => {

    const loadDashboardData = async () => {

      try {

        setLoading(true);
        setError("");


        if (!user?.email) {

          setRegistrations([]);
          setEvents([]);
          setLoading(false);

          return;
        }


        // GET USER REGISTRATIONS

        const registrationResponse =
          await fetch(
            `http://localhost:8080/api/registrations/user/${encodeURIComponent(
              user.email
            )}`
          );


        if (!registrationResponse.ok) {

          throw new Error(
            "Failed to load registrations"
          );

        }


        const registrationData =
          await registrationResponse.json();


        setRegistrations(
          registrationData
        );


        // GET EVENT DETAILS

        const eventPromises =
          registrationData.map(
            async (registration) => {

              try {

                const response =
                  await fetch(
                    `http://localhost:8080/api/events/${registration.eventId}`
                  );


                if (!response.ok) {
                  return null;
                }


                const event =
                  await response.json();


                return {
                  ...event,
                  registrationId:
                    registration.id,
                  registrationStatus:
                    registration.status,
                };


              } catch (eventError) {

                console.error(
                  "Error loading event:",
                  eventError
                );

                return null;

              }

            }
          );


        const eventResults =
          await Promise.all(
            eventPromises
          );


        setEvents(
          eventResults.filter(
            (event) => event !== null
          )
        );


      } catch (error) {

        console.error(
          "Dashboard loading error:",
          error
        );

        setError(
          error.message
        );


      } finally {

        setLoading(false);

      }

    };


    loadDashboardData();

  }, [user]);


  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (
      <main className="user-dashboard">

        <section className="dashboard-hero">

          <div className="dashboard-container">

            <span className="dashboard-label">
              USER DASHBOARD
            </span>

            <h1>
              Loading your dashboard...
            </h1>

            <p>
              Please wait while we load
              your registrations.
            </p>

          </div>

        </section>

      </main>
    );

  }


  // =========================================
  // NOT LOGGED IN
  // =========================================

  if (!user) {

    return (

      <main className="user-dashboard">

        <section className="dashboard-hero">

          <div className="dashboard-container">

            <span className="dashboard-label">
              USER DASHBOARD
            </span>

            <h1>
              Welcome to EventHub 👋
            </h1>

            <p>
              Please login to view your
              registrations.
            </p>

            <Link
              to="/login"
              className="dashboard-primary-btn"
            >
              Login
            </Link>

          </div>

        </section>

      </main>

    );

  }


  // =========================================
  // ERROR
  // =========================================

  if (error) {

    return (

      <main className="user-dashboard">

        <section className="dashboard-hero">

          <div className="dashboard-container">

            <span className="dashboard-label">
              USER DASHBOARD
            </span>

            <h1>
              Welcome back,{" "}
              <span>
                {user.username || "User"}
              </span>{" "}
              👋
            </h1>

            <p>
              Unable to load your dashboard.
            </p>

            <div className="dashboard-error">
              {error}
            </div>

          </div>

        </section>

      </main>

    );

  }


  // =========================================
  // DATE CALCULATIONS
  // =========================================

  const now = new Date();


  const upcomingEvents =
    events.filter((event) => {

      if (!event.date) {
        return false;
      }

      const eventDate =
        new Date(
          `${event.date}T${
            event.time || "23:59"
          }`
        );

      return eventDate >= now;

    });


  const completedEvents =
    events.filter((event) => {

      if (!event.date) {
        return false;
      }

      const eventDate =
        new Date(
          `${event.date}T${
            event.time || "23:59"
          }`
        );

      return eventDate < now;

    });


  const displayedUpcomingEvents =
    upcomingEvents.slice(0, 3);


  // =========================================
  // DASHBOARD
  // =========================================

  return (

    <main className="user-dashboard">


      {/* =====================================
          HERO
      ====================================== */}

      <section className="dashboard-hero">

        <div className="dashboard-container">

          <div className="dashboard-hero-content">

            <div>

              <span className="dashboard-label">
                USER DASHBOARD
              </span>

              <h1>
                Welcome back,{" "}
                <span>
                  {user.username || "User"}
                </span>{" "}
                👋
              </h1>

              <p>
                Manage your event registrations
                and discover experiences you'll love.
              </p>

            </div>


            <Link
              to="/events"
              className="dashboard-explore-btn"
            >
              Explore Events
              <span>→</span>
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================
          STATISTICS
      ====================================== */}

      <section className="dashboard-stats">

        <div className="dashboard-container">

          <div className="stats-grid">


            {/* MY REGISTRATIONS */}

            <div className="stat-card">

              <div className="stat-icon">
                🎟️
              </div>

              <div className="stat-content">

                <span className="stat-title">
                  My Registrations
                </span>

                <strong className="stat-number">
                  {registrations.length}
                </strong>

                <p>
                  Total events you've registered for
                </p>

              </div>

            </div>


            {/* UPCOMING */}

            <div className="stat-card">

              <div className="stat-icon">
                📅
              </div>

              <div className="stat-content">

                <span className="stat-title">
                  Upcoming
                </span>

                <strong className="stat-number">
                  {upcomingEvents.length}
                </strong>

                <p>
                  Registered events coming up
                </p>

              </div>

            </div>


            {/* COMPLETED */}

            <div className="stat-card">

              <div className="stat-icon completed-icon">
                ✓
              </div>

              <div className="stat-content">

                <span className="stat-title">
                  Completed
                </span>

                <strong className="stat-number">
                  {completedEvents.length}
                </strong>

                <p>
                  Events you have attended
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================
          YOUR ACTIVITY
      ====================================== */}

      <section className="dashboard-activity">

        <div className="dashboard-container">

          <div className="activity-header">

            <div>

              <span className="dashboard-label">
                YOUR ACTIVITY
              </span>

              <h2>
                My Upcoming Events
              </h2>

            </div>

            <Link
              to="/my-registrations"
              className="view-registrations-link"
            >
              View Registrations →
            </Link>

          </div>


          {/* NO UPCOMING EVENTS */}

          {displayedUpcomingEvents.length === 0 ? (

            <div className="no-upcoming-events">

              <div className="empty-icon">
                📅
              </div>

              <h3>
                No Upcoming Events
              </h3>

              <p>
                You don't have any upcoming
                registered events.
              </p>

              <Link
                to="/events"
                className="dashboard-primary-btn"
              >
                Explore Events
              </Link>

            </div>

          ) : (

            <div className="upcoming-events-grid">

              {displayedUpcomingEvents.map(
                (event) => (

                  <div
                    className="dashboard-event-card"
                    key={event.registrationId}
                  >

                    <div className="dashboard-event-top">

                      <span className="dashboard-event-category">
                        {event.category || "Event"}
                      </span>

                      <span className="dashboard-event-status">
                        Registered
                      </span>

                    </div>


                    <div className="dashboard-event-content">

                      <h3>
                        {event.title}
                      </h3>

                      <p>
                        📅 {event.date}
                      </p>

                      {event.time && (
                        <p>
                          ⏰ {event.time}
                        </p>
                      )}

                      <p>
                        📍 {event.location}
                      </p>

                      <Link
                        to={`/events/${event.id}`}
                        className="dashboard-view-event"
                      >
                        View Event
                      </Link>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </section>

    </main>

  );

}


export default UserDashboard;