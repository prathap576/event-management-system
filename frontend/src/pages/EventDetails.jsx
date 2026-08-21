import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import "./EventDetails.css";

import {
  useAdmin,
} from "../context/AdminContext";


function EventDetails() {

  const { id } = useParams();

  const navigate = useNavigate();


  const {
    currentUser,
  } = useAdmin();


  const [event, setEvent] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // =========================================
  // LOAD EVENT FROM SPRING BOOT
  // =========================================

  useEffect(() => {

    const loadEvent = async () => {

      try {

        setLoading(true);
        setError("");

        const response =
          await fetch(
            `http://localhost:8080/api/events/${id}`
          );


        if (!response.ok) {

          if (response.status === 404) {

            throw new Error(
              "Event not found"
            );

          }

          throw new Error(
            "Failed to load event"
          );
        }


        const data =
          await response.json();

        setEvent(data);

      } catch (error) {

        console.error(
          "Error loading event:",
          error
        );

        setError(
          error.message
        );

      } finally {

        setLoading(false);

      }

    };


    loadEvent();

  }, [id]);


  // =========================================
  // REGISTER BUTTON
  // =========================================

  const handleRegister = () => {

    // User is NOT logged in

    if (!currentUser) {

      navigate(
        "/login",
        {
          state: {
            from:
              `/events/${event.id}/register`,
          },
        }
      );

      return;
    }


    // Admin should not register

    if (
      currentUser.role?.toUpperCase() ===
      "ADMIN"
    ) {

      alert(
        "Admins cannot register for events."
      );

      return;
    }


    // Normal USER
    // → Registration page

    navigate(
      `/events/${event.id}/register`
    );

  };


  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (

      <main className="event-details-page">

        <div className="event-not-found">

          <h1>
            Loading Event...
          </h1>

          <p>
            Please wait while we load
            the event details.
          </p>

        </div>

      </main>

    );

  }


  // =========================================
  // EVENT NOT FOUND
  // =========================================

  if (!event || error) {

    return (

      <main className="event-details-page">

        <div className="event-not-found">

          <h1>
            Event Not Found
          </h1>

          <p>
            {error ||
              "The event you are looking for does not exist."}
          </p>


          <Link
            to="/events"
            className="back-events-btn"
          >
            Back to Events
          </Link>

        </div>

      </main>

    );

  }


  // =========================================
  // EVENT DETAILS
  // =========================================

  return (

    <main className="event-details-page">

      <section className="event-details-container">


        {/* EVENT IMAGE */}

        <div className="event-details-image">

          <span>
            {event.category}
          </span>

        </div>


        {/* EVENT CONTENT */}

        <div className="event-details-content">

          <p className="event-category">
            {event.category}
          </p>


          <h1>
            {event.title}
          </h1>


          {/* EVENT INFORMATION */}

          <div className="event-info">

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


            <p>
              👥{" "}
              <strong>
                Capacity:
              </strong>{" "}
              {event.capacity}
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

          </div>


          {/* DESCRIPTION */}

          <div className="event-description-section">

            <h2>
              About This Event
            </h2>


            <p>
              {event.description}
            </p>

          </div>


          {/* ACTIONS */}

          <div className="event-details-actions">

            <button
              type="button"
              className="register-btn"
              onClick={handleRegister}
            >
              Register Now
            </button>


            <Link
              to="/events"
              className="back-events-btn"
            >
              Back to Events
            </Link>

          </div>

        </div>

      </section>

    </main>

  );

}


export default EventDetails;