import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import EventForm from "../../components/admin/EventForm";
import { createEvent } from "../../services/eventApi";
import "./AdminPages.css";

function CreateEvent() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (eventData) => {

    try {

      setLoading(true);

      await createEvent(eventData);

      alert("Event created successfully!");

      navigate("/admin/events");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to create event"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-main">

        <div className="page-heading">
          <span>EVENT MANAGEMENT</span>

          <h1>Create Event</h1>

          <p>
            Add a new event to the event management system.
          </p>
        </div>

        <EventForm
          onSubmit={handleCreate}
          submitText="Create Event"
          loading={loading}
        />

      </main>

    </div>
  );
}

export default CreateEvent;