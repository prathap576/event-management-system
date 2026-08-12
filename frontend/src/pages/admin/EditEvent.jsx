import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import EventForm from "../../components/admin/EventForm";
import {
  getEventById,
  updateEvent,
} from "../../services/eventApi";
import "./AdminPages.css";

function EditEvent() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadEvent();
  }, [id]);

  const loadEvent = async () => {

    try {

      const data = await getEventById(id);

      setEvent(data);

    } catch (error) {

      console.error(error);

      alert("Unable to load event.");

    } finally {

      setLoading(false);

    }
  };

  const handleUpdate = async (eventData) => {

    try {

      setSaving(true);

      await updateEvent(id, eventData);

      alert("Event updated successfully.");

      navigate("/admin/events");

    } catch (error) {

      console.error(error);

      alert("Failed to update event.");

    } finally {

      setSaving(false);

    }
  };

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-main">

        <div className="page-heading">
          <span>EVENT MANAGEMENT</span>

          <h1>Edit Event</h1>

          <p>
            Update the selected event.
          </p>
        </div>

        {loading ? (
          <div className="loading-state">
            Loading event...
          </div>
        ) : event ? (
          <EventForm
            initialData={event}
            onSubmit={handleUpdate}
            submitText="Update Event"
            loading={saving}
          />
        ) : (
          <div className="empty-state">
            Event not found.
          </div>
        )}

      </main>

    </div>
  );
}

export default EditEvent;