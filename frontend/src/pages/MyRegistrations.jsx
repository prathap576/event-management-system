import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import "./MyRegistrations.css";

import {
  useAuth,
} from "../context/AuthContext";


function MyRegistrations() {

  const {
    user,
  } = useAuth();


  const [registrations, setRegistrations] =
    useState([]);

  const [events, setEvents] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // =========================================
  // LOAD USER REGISTRATIONS
  // =========================================

  useEffect(() => {

    const loadRegistrations = async () => {

      try {

        setLoading(true);
        setError("");


        // -------------------------------------
        // CHECK LOGIN
        // -------------------------------------

        if (!user) {

          setRegistrations([]);
          setLoading(false);

          return;
        }


        // -------------------------------------
        // GET USER EMAIL
        // -------------------------------------

        const userEmail =
          user.email ||
          user.username ||
          "";


        if (!userEmail) {

          setError(
            "Unable to identify the logged-in user."
          );

          setLoading(false);

          return;
        }


        // -------------------------------------
        // GET REGISTRATIONS
        // -------------------------------------

        const response =
          await fetch(
            `http://localhost:8080/api/registrations/user/${encodeURIComponent(
              userEmail
            )}`
          );


        if (!response.ok) {

          throw new Error(
            "Failed to load registrations."
          );
        }


        const registrationData =
          await response.json();


        console.log(
          "User registrations:",
          registrationData
        );


        setRegistrations(
          registrationData
        );


        // -------------------------------------
        // LOAD EVENT DETAILS
        // -------------------------------------

        const eventMap = {};


        for (
          const registration
          of registrationData
        ) {

          try {

            const eventResponse =
              await fetch(
                `http://localhost:8080/api/events/${registration.eventId}`
              );


            if (eventResponse.ok) {

              const event =
                await eventResponse.json();


              eventMap[
                registration.eventId
              ] = event;

            }

          } catch (eventError) {

            console.error(
              "Error loading event:",
              eventError
            );

          }

        }


        setEvents(eventMap);


      } catch (error) {

        console.error(
          "Registration loading error:",
          error
        );


        setError(
          error.message ||
          "Something went wrong while loading registrations."
        );


      } finally {

        setLoading(false);

      }

    };


    loadRegistrations();

  }, [user]);


  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (

      <main className="my-registrations">

        <section className="registrations-header">

          <span>
            MY EVENTS
          </span>

          <h1>
            My Registrations
          </h1>

          <p>
            Loading your registered events...
          </p>

        </section>

      </main>

    );

  }


  // =========================================
  // NOT LOGGED IN
  // =========================================

  if (!user) {

    return (

      <main className="my-registrations">

        <section className="registrations-header">

          <span>
            MY EVENTS
          </span>

          <h1>
            My Registrations
          </h1>

          <p>
            Please login to view your registrations.
          </p>


          <Link
            to="/login"
            className="registration-login-btn"
          >
            Login
          </Link>

        </section>

      </main>

    );

  }


  // =========================================
  // ERROR
  // =========================================

  if (error) {

    return (

      <main className="my-registrations">

        <section className="registrations-header">

          <span>
            MY EVENTS
          </span>

          <h1>
            My Registrations
          </h1>

          <div className="registration-error">

            <h2>
              Unable to load registrations
            </h2>

            <p>
              {error}
            </p>

          </div>

        </section>

      </main>

    );

  }


  // =========================================
  // NO REGISTRATIONS
  // =========================================

  if (registrations.length === 0) {

    return (

      <main className="my-registrations">

        <section className="registrations-header">

          <span>
            MY EVENTS
          </span>

          <h1>
            My Registrations
          </h1>

          <p>
            Keep track of the events you have
            registered for.
          </p>

        </section>


        <section className="registrations-list">

          <div className="no-registrations">

            <div className="empty-icon">
              🎟️
            </div>

            <h2>
              No Registrations Yet
            </h2>

            <p>
              You haven't registered for any
              events yet. Explore upcoming events
              and find something interesting.
            </p>


            <Link
              to="/events"
              className="explore-events-btn"
            >
              Explore Events
            </Link>

          </div>

        </section>

      </main>

    );

  }


  // =========================================
  // REGISTRATIONS
  // =========================================

  return (

    <main className="my-registrations">

      {/* =====================================
          HEADER
      ===================================== */}

      <section className="registrations-header">

        <span>
          MY EVENTS
        </span>

        <h1>
          My Registrations
        </h1>

        <p>
          Here are the events you have registered
          for.
        </p>

      </section>


      {/* =====================================
          REGISTRATION LIST
      ===================================== */}

      <section className="registrations-list">

        <div className="registrations-grid">

          {registrations.map(
            (registration) => {

              const event =
                events[
                  registration.eventId
                ];


              return (

                <div
                  className="registration-card"
                  key={registration.id}
                >


                  {/* =================================
                      CARD TOP
                  ================================= */}

                  <div className="registration-card-top">

                    <span className="registration-category">

                      {event?.category ||
                        "Event"}

                    </span>


                    <span
                      className={`registration-status ${
                        registration.status
                          ?.toLowerCase()
                          .replace(/\s+/g, "-")
                      }`}
                    >

                      {registration.status ||
                        "Confirmed"}

                    </span>

                  </div>


                  {/* =================================
                      CARD CONTENT
                  ================================= */}

                  <div className="registration-card-content">


                    {/* EVENT TITLE */}

                    <h2>

                      {event?.title ||
                        `Event #${registration.eventId}`}

                    </h2>


                    {/* EVENT DETAILS */}

                    {event ? (

                      <>

                        <p>
                          📅{" "}
                          <strong>
                            Date:
                          </strong>{" "}
                          {event.date}
                        </p>


                        <p>
                          ⏰{" "}
                          <strong>
                            Time:
                          </strong>{" "}
                          {event.time}
                        </p>


                        <p>
                          📍{" "}
                          <strong>
                            Location:
                          </strong>{" "}
                          {event.location}
                        </p>


                        {event.contactPhone && (

                          <p>
                            📞{" "}
                            <strong>
                              Contact:
                            </strong>{" "}
                            {event.contactPhone}
                          </p>

                        )}

                      </>

                    ) : (

                      <p>
                        Loading event details...
                      </p>

                    )}


                    {/* =================================
                        REGISTRATION DETAILS
                    ================================= */}

                    <div className="registration-info">

                      <p>

                        <strong>
                          Registered as:
                        </strong>{" "}

                        {registration.name}

                      </p>


                      <p>

                        <strong>
                          Email:
                        </strong>{" "}

                        {registration.email}

                      </p>


                      {registration.phone && (

                        <p>

                          <strong>
                            Phone:
                          </strong>{" "}

                          {registration.phone}

                        </p>

                      )}

                    </div>


                    {/* =================================
                        REGISTERED DATE
                    ================================= */}

                    <p className="registered-date">

                      Registered on:{" "}

                      {registration.registeredAt
                        ? new Date(
                            registration.registeredAt
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "N/A"}

                    </p>


                    {/* =================================
                        VIEW EVENT
                    ================================= */}

                    {event && (

                      <Link
                        to={`/events/${event.id}`}
                        className="view-event-btn"
                      >
                        View Event
                      </Link>

                    )}

                  </div>

                </div>

              );

            }
          )}

        </div>

      </section>

    </main>

  );

}


export default MyRegistrations;