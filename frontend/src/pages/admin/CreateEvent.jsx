import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAdmin,
} from "../../context/AdminContext";

import AdminSidebar from "../../components/admin/AdminSidebar";

import EventForm from "../../components/admin/EventForm";


function CreateEvent() {

  const navigate =
    useNavigate();

  const {
    createEvent,
  } = useAdmin();


  const [loading, setLoading] =
    useState(false);


  const handleCreate = (
    eventData
  ) => {

    setLoading(true);


    setTimeout(() => {

      createEvent(
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
            Create Event
          </h1>

          <p>
            Add a new event to your
            event management system.
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