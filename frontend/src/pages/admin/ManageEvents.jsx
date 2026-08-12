import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import EventTable from "../../components/admin/EventTable";
import DeleteModal from "../../components/admin/DeleteModal";
import {
  getAllEvents,
  deleteEvent,
} from "../../services/eventApi";
import { Link } from "react-router-dom";
import "./AdminPages.css";

function ManageEvents() {

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {

    try {

      setLoading(true);

      const data = await getAllEvents();

      setEvents(data);

    } catch (error) {

      console.error("Error loading events:", error);

    } finally {

      setLoading(false);

    }
  };

  const handleDelete = async () => {

    if (!selectedEvent) {
      return;
    }

    try {

      setDeleteLoading(true);

      await deleteEvent(selectedEvent.id);

      setEvents((previousEvents) =>
        previousEvents.filter(
          (event) => event.id !== selectedEvent.id
        )
      );

      setSelectedEvent(null);

    } catch (error) {

      console.error("Delete failed:", error);

      alert("Failed to delete event.");

    } finally {

      setDeleteLoading(false);

    }
  };

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-main">

        <div className="page-heading-row">

          <div className="page-heading">
            <span>EVENT MANAGEMENT</span>
            <h1>Manage Events</h1>
            <p>
              Create, edit and delete events.
            </p>
          </div>

          <Link
            to="/admin/events/create"
            className="primary-button"
          >
            + Create Event
          </Link>

        </div>

        <section className="dashboard-panel">

          {loading ? (
            <div className="loading-state">
              Loading events...
            </div>
          ) : (
            <EventTable
              events={events}
              onDelete={setSelectedEvent}
            />
          )}

        </section>

      </main>

      <DeleteModal
        event={selectedEvent}
        onCancel={() => setSelectedEvent(null)}
        onConfirm={handleDelete}
        loading={deleteLoading}
      />

    </div>
  );
}

export default ManageEvents;