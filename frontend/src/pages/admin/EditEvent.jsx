import {
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useAdmin,
} from "../../context/AdminContext";

import AdminSidebar from "../../components/admin/AdminSidebar";

import EventForm from "../../components/Admin/EventForm";


function EditEvent() {

  const {
    id,
  } = useParams();

  const navigate =
    useNavigate();


  const {
    getEventById,
    updateEvent,
  } = useAdmin();


  const event =
    getEventById(id);


  const [loading, setLoading] =
    useState(false);


  const handleUpdate = (
    eventData
  ) => {

    setLoading(true);


    setTimeout(() => {

      updateEvent(
        id,
        eventData
      );

      setLoading(false);

      navigate(
        "/admin/events"
      );

    }, 500);

  };


  return (

    <div className="admin-layout">

      <AdminSidebar />


      <main className="admin-main">

        <div className="page-heading">

          <span>
            EVENT MANAGEMENT
          </span>

          <h1>
            Edit Event
          </h1>

          <p>
            Update event information.
          </p>

        </div>


        {event ? (

          <EventForm
            initialData={event}
            onSubmit={
              handleUpdate
            }
            submitText="Save Changes"
            loading={loading}
          />

        ) : (

          <div className="content-card">

            <div className="empty-state">

              <div className="empty-icon">
                ⚠️
              </div>

              <h3>
                Event not found
              </h3>

              <p>
                The event you're looking
                for does not exist.
              </p>

            </div>

          </div>

        )}

      </main>

    </div>
  );
}

export default EditEvent;