import {
  useMemo,
  useState,
} from "react";

import {
  useAdmin,
} from "../../context/AdminContext";

import AdminSidebar from "../../components/admin/AdminSidebar";


function EventRegistrations() {

  const {
    registrations,
    updateRegistrationStatus,
  } = useAdmin();


  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [eventFilter, setEventFilter] =
    useState("All");


  // ==================================================
  // FILTER
  // ==================================================

  const filteredRegistrations =
    useMemo(() => {

      const searchValue =
        search
          .trim()
          .toLowerCase();


      return registrations.filter(
        (registration) => {

          const matchesSearch =
            registration.name
              .toLowerCase()
              .includes(searchValue) ||

            registration.email
              .toLowerCase()
              .includes(searchValue) ||

            registration.eventName
              .toLowerCase()
              .includes(searchValue);


          const matchesStatus =
            statusFilter ===
              "All" ||
            registration.status ===
              statusFilter;


          const matchesEvent =
            eventFilter ===
              "All" ||
            registration.eventName ===
              eventFilter;


          return (
            matchesSearch &&
            matchesStatus &&
            matchesEvent
          );

        }
      );

    }, [
      registrations,
      search,
      statusFilter,
      eventFilter,
    ]);


  const eventNames = [
    ...new Set(
      registrations.map(
        (registration) =>
          registration.eventName
      )
    ),
  ];


  const confirmed =
    registrations.filter(
      (registration) =>
        registration.status ===
        "Confirmed"
    ).length;


  const pending =
    registrations.filter(
      (registration) =>
        registration.status ===
        "Pending"
    ).length;


  const cancelled =
    registrations.filter(
      (registration) =>
        registration.status ===
        "Cancelled"
    ).length;


  return (

    <div className="admin-layout">

      <AdminSidebar />


      <main className="admin-main">

        {/* HEADER */}

        <div className="page-heading">

          <span>
            REGISTRATION MANAGEMENT
          </span>

          <h1>
            Event Registrations
          </h1>

          <p>
            View and manage participant
            registrations.
          </p>

        </div>


        {/* REGISTRATION STATS */}

        <div className="registration-stats">

          <div>

            <span>
              Total
            </span>

            <strong>
              {registrations.length}
            </strong>

          </div>


          <div>

            <span>
              Confirmed
            </span>

            <strong>
              {confirmed}
            </strong>

          </div>


          <div>

            <span>
              Pending
            </span>

            <strong>
              {pending}
            </strong>

          </div>


          <div>

            <span>
              Cancelled
            </span>

            <strong>
              {cancelled}
            </strong>

          </div>

        </div>


        {/* TABLE */}

        <section className="content-card">


          {/* FILTERS */}

          <div className="filter-bar">

            <div className="search-box">

              <span>
                🔍
              </span>

              <input
                type="text"
                placeholder="Search participant or event..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>


            <select
              value={eventFilter}
              onChange={(e) =>
                setEventFilter(
                  e.target.value
                )
              }
            >

              <option value="All">
                All Events
              </option>

              {eventNames.map(
                (eventName) => (

                  <option
                    value={eventName}
                    key={eventName}
                  >
                    {eventName}
                  </option>

                )
              )}

            </select>


            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
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


          {/* TABLE */}

          <div className="table-wrapper">

            <table className="admin-table">

              <thead>

                <tr>

                  <th>
                    PARTICIPANT
                  </th>

                  <th>
                    EVENT
                  </th>

                  <th>
                    CONTACT
                  </th>

                  <th>
                    REGISTERED
                  </th>

                  <th>
                    STATUS
                  </th>

                  <th>
                    UPDATE STATUS
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
                    >

                      {/* PARTICIPANT */}

                      <td>

                        <div className="participant-cell">

                          <div className="avatar">
                            {registration.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>

                            <strong>
                              {
                                registration.name
                              }
                            </strong>

                            <span>
                              ID #
                              {
                                registration.id
                              }
                            </span>

                          </div>

                        </div>

                      </td>


                      {/* EVENT */}

                      <td>

                        <strong>
                          {
                            registration.eventName
                          }
                        </strong>

                      </td>


                      {/* CONTACT */}

                      <td>

                        <div className="contact-cell">

                          <span>
                            ✉{" "}
                            {
                              registration.email
                            }
                          </span>

                          <span>
                            ☎{" "}
                            {
                              registration.phone
                            }
                          </span>

                        </div>

                      </td>


                      {/* DATE */}

                      <td>

                        {new Date(
                          registration.registeredAt
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}

                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={`status-badge ${registration.status.toLowerCase()}`}
                        >
                          {
                            registration.status
                          }
                        </span>

                      </td>


                      {/* UPDATE */}

                      <td>

                        <select
                          className="status-select"
                          value={
                            registration.status
                          }
                          onChange={(e) =>
                            updateRegistrationStatus(
                              registration.id,
                              e.target.value
                            )
                          }
                        >

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

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>


            {filteredRegistrations.length ===
              0 && (

              <div className="empty-state">

                <div className="empty-icon">
                  👥
                </div>

                <h3>
                  No registrations found
                </h3>

                <p>
                  Try changing your filters.
                </p>

              </div>

            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default EventRegistrations;