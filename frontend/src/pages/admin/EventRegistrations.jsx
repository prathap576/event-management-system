import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./EventRegistrations.css";

function EventRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // LOAD REGISTRATIONS AND EVENTS
  // =========================================================

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const [registrationsResponse, eventsResponse] =
          await Promise.all([
            fetch("http://localhost:8080/api/registrations"),
            fetch("http://localhost:8080/api/events"),
          ]);

        if (!registrationsResponse.ok) {
          throw new Error("Failed to load registrations");
        }

        if (!eventsResponse.ok) {
          throw new Error("Failed to load events");
        }

        const registrationData =
          await registrationsResponse.json();

        const eventData =
          await eventsResponse.json();

        setRegistrations(
          Array.isArray(registrationData)
            ? registrationData
            : []
        );

        setEvents(
          Array.isArray(eventData)
            ? eventData
            : []
        );

      } catch (error) {
        console.error(
          "Error loading registrations:",
          error
        );

        setError(
          error.message ||
          "Unable to load registrations."
        );

      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);


  // =========================================================
  // GET EVENT DETAILS
  // =========================================================

  const getEvent = (eventId) => {
    return events.find(
      (event) =>
        String(event.id) === String(eventId)
    );
  };


  // =========================================================
  // ADD EVENT DETAILS TO REGISTRATIONS
  // =========================================================

  const registrationsWithEvents =
    registrations.map((registration) => {

      const event =
        getEvent(registration.eventId);

      return {
        ...registration,

        eventName:
          event?.title ||
          `Event #${registration.eventId}`,

        eventLocation:
          event?.location ||
          "Location not specified",

        eventDate:
          event?.date ||
          "",

        eventTime:
          event?.time ||
          "",

        eventCategory:
          event?.category ||
          "Event",
      };
    });


  // =========================================================
  // STATUS COUNTS
  // =========================================================

  const totalRegistrations =
    registrations.length;

  const confirmedRegistrations =
    registrations.filter(
      (registration) =>
        registration.status?.toLowerCase() ===
        "confirmed"
    ).length;

  const pendingRegistrations =
    registrations.filter(
      (registration) =>
        registration.status?.toLowerCase() ===
        "pending"
    ).length;

  const cancelledRegistrations =
    registrations.filter(
      (registration) =>
        registration.status?.toLowerCase() ===
        "cancelled"
    ).length;


  // =========================================================
  // FILTER REGISTRATIONS
  // =========================================================

  const filteredRegistrations =
    registrationsWithEvents.filter(
      (registration) => {

        const search =
          searchTerm
            .toLowerCase()
            .trim();

        const matchesSearch =
          !search ||
          registration.name
            ?.toLowerCase()
            .includes(search) ||

          registration.email
            ?.toLowerCase()
            .includes(search) ||

          registration.phone
            ?.toLowerCase()
            .includes(search) ||

          registration.eventName
            ?.toLowerCase()
            .includes(search);

        const matchesStatus =
          selectedStatus === "All" ||
          registration.status?.toLowerCase() ===
            selectedStatus.toLowerCase();

        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );


  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (dateString) => {

    if (!dateString) {
      return "N/A";
    }

    const date =
      new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );
  };


  // =========================================================
  // FORMAT STATUS
  // =========================================================

  const getStatusClass = (status) => {

    if (!status) {
      return "pending";
    }

    return status
      .toLowerCase()
      .replace(/\s+/g, "-");
  };


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="admin-dashboard-page">

        <aside className="admin-sidebar">

          <div className="admin-profile">

            <div className="admin-avatar">
              A
            </div>

            <div>
              <h3>Ashok</h3>
              <p>Event Organizer</p>
            </div>

          </div>

          <div className="sidebar-title">
            MAIN MENU
          </div>

          <nav className="admin-menu">

            <Link
              to="/admin"
              className="admin-menu-item"
            >
              <span>▦</span>
              Dashboard
            </Link>

            <Link
              to="/admin/events"
              className="admin-menu-item"
            >
              <span>⊡</span>
              Manage Events
            </Link>

            <Link
              to="/admin/events/create"
              className="admin-menu-item"
            >
              <span>＋</span>
              Create Event
            </Link>

            <Link
              to="/admin/registrations"
              className="admin-menu-item active"
            >
              <span>♙</span>
              Registrations
            </Link>

          </nav>

          <div className="sidebar-bottom">

            <button
              className="logout-btn"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
            >
              <span>↪</span>
              Logout
            </button>

          </div>

        </aside>


        <main className="admin-main">

          <div className="dashboard-loading">
            Loading registrations...
          </div>

        </main>

      </div>
    );
  }


  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <div className="admin-dashboard-page">

        <aside className="admin-sidebar">

          <div className="admin-profile">

            <div className="admin-avatar">
              A
            </div>

            <div>
              <h3>Ashok</h3>
              <p>Event Organizer</p>
            </div>

          </div>

          <div className="sidebar-title">
            MAIN MENU
          </div>

          <nav className="admin-menu">

            <Link
              to="/admin"
              className="admin-menu-item"
            >
              <span>▦</span>
              Dashboard
            </Link>

            <Link
              to="/admin/events"
              className="admin-menu-item"
            >
              <span>⊡</span>
              Manage Events
            </Link>

            <Link
              to="/admin/events/create"
              className="admin-menu-item"
            >
              <span>＋</span>
              Create Event
            </Link>

            <Link
              to="/admin/registrations"
              className="admin-menu-item active"
            >
              <span>♙</span>
              Registrations
            </Link>

          </nav>

          <div className="sidebar-bottom">

            <button
              className="logout-btn"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
            >
              <span>↪</span>
              Logout
            </button>

          </div>

        </aside>


        <main className="admin-main">

          <section className="recent-events-card">

            <div className="recent-header">

              <div>
                <h2>
                  Event Registrations
                </h2>

                <p>
                  Manage registered event participants
                </p>
              </div>

            </div>

            <div className="empty-events">

              <h3>
                Unable to load registrations
              </h3>

              <p>
                {error}
              </p>

            </div>

          </section>

        </main>

      </div>
    );
  }


  // =========================================================
  // MAIN PAGE
  // =========================================================

  return (
    <div className="admin-dashboard-page">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="admin-sidebar">

        <div className="admin-profile">

          <div className="admin-avatar">
            A
          </div>

          <div>
            <h3>Ashok</h3>
            <p>Event Organizer</p>
          </div>

        </div>


        <div className="sidebar-title">
          MAIN MENU
        </div>


        <nav className="admin-menu">

          <Link
            to="/admin"
            className="admin-menu-item"
          >
            <span>▦</span>
            Dashboard
          </Link>


          <Link
            to="/admin/events"
            className="admin-menu-item"
          >
            <span>⊡</span>
            Manage Events
          </Link>


          <Link
            to="/admin/events/create"
            className="admin-menu-item"
          >
            <span>＋</span>
            Create Event
          </Link>


          <Link
            to="/admin/registrations"
            className="admin-menu-item active"
          >
            <span>♙</span>
            Registrations
          </Link>

        </nav>


        <div className="sidebar-bottom">

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="admin-main">

        {/* ===================================================
            HEADER
        =================================================== */}

        <section className="admin-header">

          <div>

            <span className="admin-label">
              REGISTRATION MANAGEMENT
            </span>

            <h1>
              Event Registrations
            </h1>

            <p>
              View and manage users registered
              for your events.
            </p>

          </div>

        </section>


        {/* ===================================================
            STATISTICS
        =================================================== */}

        <section className="stats-grid">

          {/* Total */}

          <div className="stat-card">

            <div className="stat-top">

              <span className="stat-title">
                Total Registrations
              </span>

              <div className="stat-icon">
                ♙
              </div>

            </div>

            <h2>
              {totalRegistrations}
            </h2>

            <p>
              All event participants
            </p>

          </div>


          {/* Confirmed */}

          <div className="stat-card">

            <div className="stat-top">

              <span className="stat-title">
                Confirmed
              </span>

              <div className="stat-icon">
                ✓
              </div>

            </div>

            <h2>
              {confirmedRegistrations}
            </h2>

            <p>
              Confirmed participants
            </p>

          </div>


          {/* Pending */}

          <div className="stat-card">

            <div className="stat-top">

              <span className="stat-title">
                Pending
              </span>

              <div className="stat-icon">
                ◷
              </div>

            </div>

            <h2>
              {pendingRegistrations}
            </h2>

            <p>
              Awaiting confirmation
            </p>

          </div>


          {/* Cancelled */}

          <div className="stat-card">

            <div className="stat-top">

              <span className="stat-title">
                Cancelled
              </span>

              <div className="stat-icon">
                ×
              </div>

            </div>

            <h2>
              {cancelledRegistrations}
            </h2>

            <p>
              Cancelled registrations
            </p>

          </div>

        </section>


        {/* ===================================================
            REGISTRATION TABLE CARD
        =================================================== */}

        <section className="recent-events-card">

          {/* Header */}

          <div className="recent-header">

            <div>

              <h2>
                Registered Participants
              </h2>

              <p>
                View users who have registered
                for your events.
              </p>

            </div>

          </div>


          {/* =================================================
              SEARCH AND FILTER
          ================================================= */}

          <div
            style={{
              display: "flex",
              gap: "12px",
              padding: "20px 26px",
              borderBottom:
                "1px solid #eef2f7",
              flexWrap: "wrap",
            }}
          >

            <input
              type="text"
              placeholder="Search by name, email or event..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              style={{
                flex: "1",
                minWidth: "250px",
                height: "42px",
                padding: "0 14px",
                border:
                  "1px solid #dbe2ea",
                borderRadius: "8px",
                outline: "none",
                fontSize: "13px",
              }}
            />


            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value)
              }
              style={{
                height: "42px",
                minWidth: "150px",
                padding: "0 12px",
                border:
                  "1px solid #dbe2ea",
                borderRadius: "8px",
                background: "#ffffff",
                color: "#334155",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >

              <option value="All">
                All Status
              </option>

              <option value="Confirmed">
                Confirmed
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Cancelled">
                Cancelled
              </option>

            </select>

          </div>


          {/* =================================================
              REGISTRATION LIST
          ================================================= */}

          <div
            style={{
              width: "100%",
              overflowX: "auto",
            }}
          >

            {filteredRegistrations.length === 0 ? (

              <div
                className="empty-events"
                style={{
                  padding: "55px 25px",
                }}
              >

                <div
                  style={{
                    fontSize: "36px",
                    marginBottom: "12px",
                  }}
                >
                  🎟️
                </div>

                <h3
                  style={{
                    margin:
                      "0 0 7px",
                    color: "#0f172a",
                  }}
                >
                  No registrations found
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "#94a3b8",
                  }}
                >
                  There are no registrations
                  matching your search.
                </p>

              </div>

            ) : (

              <table
                style={{
                  width: "100%",
                  minWidth: "850px",
                  borderCollapse:
                    "collapse",
                }}
              >

                <thead>

                  <tr>

                    <th
                      style={{
                        padding:
                          "15px 20px",
                        textAlign: "left",
                        color: "#64748b",
                        fontSize: "11px",
                        fontWeight: "700",
                        textTransform:
                          "uppercase",
                        background:
                          "#f8fafc",
                        borderBottom:
                          "1px solid #e2e8f0",
                      }}
                    >
                      Participant
                    </th>


                    <th
                      style={{
                        padding:
                          "15px 20px",
                        textAlign: "left",
                        color: "#64748b",
                        fontSize: "11px",
                        fontWeight: "700",
                        textTransform:
                          "uppercase",
                        background:
                          "#f8fafc",
                        borderBottom:
                          "1px solid #e2e8f0",
                      }}
                    >
                      Event
                    </th>


                    <th
                      style={{
                        padding:
                          "15px 20px",
                        textAlign: "left",
                        color: "#64748b",
                        fontSize: "11px",
                        fontWeight: "700",
                        textTransform:
                          "uppercase",
                        background:
                          "#f8fafc",
                        borderBottom:
                          "1px solid #e2e8f0",
                      }}
                    >
                      Contact
                    </th>


                    <th
                      style={{
                        padding:
                          "15px 20px",
                        textAlign: "left",
                        color: "#64748b",
                        fontSize: "11px",
                        fontWeight: "700",
                        textTransform:
                          "uppercase",
                        background:
                          "#f8fafc",
                        borderBottom:
                          "1px solid #e2e8f0",
                      }}
                    >
                      Registered On
                    </th>


                    <th
                      style={{
                        padding:
                          "15px 20px",
                        textAlign: "left",
                        color: "#64748b",
                        fontSize: "11px",
                        fontWeight: "700",
                        textTransform:
                          "uppercase",
                        background:
                          "#f8fafc",
                        borderBottom:
                          "1px solid #e2e8f0",
                      }}
                    >
                      Status
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredRegistrations.map(
                    (registration) => (

                      <tr
                        key={
                          registration.id
                        }
                        style={{
                          borderBottom:
                            "1px solid #eef2f7",
                        }}
                      >

                        {/* Participant */}

                        <td
                          style={{
                            padding:
                              "17px 20px",
                            verticalAlign:
                              "middle",
                          }}
                        >

                          <div
                            style={{
                              display: "flex",
                              alignItems:
                                "center",
                              gap: "11px",
                            }}
                          >

                            <div
                              style={{
                                width: "38px",
                                height: "38px",
                                minWidth:
                                  "38px",
                                borderRadius:
                                  "50%",
                                background:
                                  "#eff6ff",
                                color:
                                  "#2563eb",
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                justifyContent:
                                  "center",
                                fontWeight:
                                  "700",
                                fontSize:
                                  "14px",
                              }}
                            >
                              {registration.name
                                ?.charAt(0)
                                ?.toUpperCase() ||
                                "U"}
                            </div>


                            <div>

                              <div
                                style={{
                                  color:
                                    "#0f172a",
                                  fontSize:
                                    "13px",
                                  fontWeight:
                                    "700",
                                  marginBottom:
                                    "4px",
                                }}
                              >
                                {registration.name ||
                                  "Unknown User"}
                              </div>

                              <div
                                style={{
                                  color:
                                    "#94a3b8",
                                  fontSize:
                                    "11px",
                                }}
                              >
                               
                              </div>

                            </div>

                          </div>

                        </td>


                        {/* Event */}

                        <td
                          style={{
                            padding:
                              "17px 20px",
                            verticalAlign:
                              "middle",
                          }}
                        >

                          <div
                            style={{
                              color:
                                "#0f172a",
                              fontSize:
                                "13px",
                              fontWeight:
                                "650",
                              marginBottom:
                                "4px",
                            }}
                          >
                            {
                              registration.eventName
                            }
                          </div>

                          <div
                            style={{
                              color:
                                "#94a3b8",
                              fontSize:
                                "11px",
                            }}
                          >
                            {registration.eventDate
                              ? formatDate(
                                  registration.eventDate
                                )
                              : "Date not available"}
                          </div>

                        </td>


                        {/* Contact */}

                        <td
                          style={{
                            padding:
                              "17px 20px",
                            verticalAlign:
                              "middle",
                          }}
                        >

                          <div
                            style={{
                              color:
                                "#475569",
                              fontSize:
                                "12px",
                              marginBottom:
                                "4px",
                            }}
                          >
                            {registration.email}
                          </div>

                          <div
                            style={{
                              color:
                                "#94a3b8",
                              fontSize:
                                "11px",
                            }}
                          >
                            {registration.phone ||
                              "No phone"}
                          </div>

                        </td>


                        {/* Registered Date */}

                        <td
                          style={{
                            padding:
                              "17px 20px",
                            verticalAlign:
                                "middle",
                            color:
                              "#64748b",
                            fontSize:
                              "12px",
                          }}
                        >
                          {formatDate(
                            registration.registeredAt
                          )}
                        </td>


                        {/* Status */}

                        <td
                          style={{
                            padding:
                              "17px 20px",
                            verticalAlign:
                              "middle",
                          }}
                        >

                          <span
                            className={`event-status ${getStatusClass(
                              registration.status
                            )}`}
                          >
                            {registration.status ||
                              "Pending"}
                          </span>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default EventRegistrations;