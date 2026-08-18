import {
  useMemo,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  useAdmin,
} from "../../context/AdminContext";

import {
  getEventStatus,
} from "../../utils/eventUtils";

import AdminSidebar from "../../components/admin/AdminSidebar";

import EventTable from "../../components/admin/EventTable";


function ManageEvents() {

  const {
    events,
    deleteEvent,
  } = useAdmin();


  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const [eventStatus, setEventStatus] =
    useState("All");

  const [deleteTarget, setDeleteTarget] =
    useState(null);


  // ==================================================
  // FILTER EVENTS
  // ==================================================

  const filteredEvents =
    useMemo(() => {

      return events.filter(
        (event) => {

          const currentStatus =
            getEventStatus(event);


          const searchValue =
            search
              .trim()
              .toLowerCase();


          const matchesSearch =
            event.title
              .toLowerCase()
              .includes(searchValue) ||

            event.location
              .toLowerCase()
              .includes(searchValue) ||

            event.category
              .toLowerCase()
              .includes(searchValue);


          const matchesCategory =
            category === "All" ||
            event.category ===
              category;


          const matchesStatus =
            eventStatus === "All" ||
            currentStatus ===
              eventStatus;


          return (
            matchesSearch &&
            matchesCategory &&
            matchesStatus
          );

        }
      );

    }, [
      events,
      search,
      category,
      eventStatus,
    ]);


  // ==================================================
  // DELETE
  // ==================================================

  const handleDelete = () => {

    if (!deleteTarget) {
      return;
    }

    deleteEvent(
      deleteTarget.id
    );

    setDeleteTarget(null);

  };


  // ==================================================
  // CLEAR FILTERS
  // ==================================================

  const clearFilters = () => {

    setSearch("");

    setCategory("All");

    setEventStatus("All");

  };


  return (

    <div className="admin-layout">

      <AdminSidebar />


      <main className="admin-main">

        {/* PAGE HEADER */}

        <div className="page-header-row">

          <div className="page-heading">

            <span>
              EVENT MANAGEMENT
            </span>

            <h1>
              Manage Events
            </h1>

            <p>
              Create, update and manage
              all your events.
            </p>

          </div>


          <Link
            to="/admin/events/create"
            className="primary-button"
          >
            + Create Event
          </Link>

        </div>


        {/* CONTENT */}

        <section className="content-card">


          {/* FILTERS */}

          <div className="filter-bar">

            <div className="search-box">

              <span>
                🔍
              </span>

              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>


            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
            >

              <option value="All">
                All Categories
              </option>

              <option value="Technical">
                Technical
              </option>

              <option value="Coding">
                Coding
              </option>

              <option value="Workshop">
                Workshop
              </option>

              <option value="Seminar">
                Seminar
              </option>

              <option value="Cultural">
                Cultural
              </option>

              <option value="Sports">
                Sports
              </option>

            </select>


            <select
              value={eventStatus}
              onChange={(e) =>
                setEventStatus(
                  e.target.value
                )
              }
            >

              <option value="All">
                All Events
              </option>

              <option value="Upcoming">
                Upcoming
              </option>

              <option value="Draft">
                Draft
              </option>

              <option value="Completed">
                Completed
              </option>

            </select>


            <button
              type="button"
              className="clear-filter"
              onClick={
                clearFilters
              }
            >
              Clear
            </button>

          </div>


          {/* META */}

          <div className="table-meta">

            <span>

              Showing{" "}

              <strong>
                {filteredEvents.length}
              </strong>

              {" "}of{" "}

              <strong>
                {events.length}
              </strong>

              {" "}events

            </span>

          </div>


          {/* TABLE */}

          <EventTable
            events={
              filteredEvents
            }
            onDelete={
              setDeleteTarget
            }
          />

        </section>

      </main>


      {/* DELETE MODAL */}

      {deleteTarget && (

        <div className="modal-overlay">

          <div className="delete-modal">

            <div className="delete-modal-icon">
              🗑️
            </div>


            <h2>
              Delete Event?
            </h2>


            <p>

              Are you sure you want
              to delete{" "}

              <strong>
                {deleteTarget.title}
              </strong>

              ?

            </p>


            <span>
              This action cannot
              be undone.
            </span>


            <div className="modal-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  setDeleteTarget(
                    null
                  )
                }
              >
                Cancel
              </button>


              <button
                type="button"
                className="danger-button"
                onClick={
                  handleDelete
                }
              >
                Delete Event
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default ManageEvents;