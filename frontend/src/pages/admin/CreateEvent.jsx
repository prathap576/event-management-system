import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import AdminSidebar from "../../components/admin/AdminSidebar";

import EventForm from "../../components/Admin/EventForm";


function CreateEvent() {

  const navigate =
    useNavigate();


  // =========================================
  // SCROLL TO TOP WHEN PAGE OPENS
  // =========================================

  useEffect(() => {

    window.scrollTo(0, 0);

  }, []);


  // =========================================
  // LOADING STATE
  // =========================================

  const [loading, setLoading] =
    useState(false);


  // =========================================
  // CREATE EVENT
  // =========================================

  const handleCreate = async (
    eventData
  ) => {

    setLoading(true);

    try {

      const response =
        await fetch(
          "http://localhost:8080/api/events",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(eventData),
          }
        );


      // =========================================
      // HANDLE ERROR
      // =========================================

      if (!response.ok) {

        const error =
          await response.text();

        console.error(
          "Create event failed:",
          error
        );

        alert(
          "Failed to create event."
        );

        return;
      }


      // =========================================
      // SUCCESS RESPONSE
      // =========================================

      const createdEvent =
        await response.json();


      console.log(
        "Event created successfully:",
        createdEvent
      );


      alert(
        "Event created successfully!"
      );


      // =========================================
      // GO TO MANAGE EVENTS
      // =========================================

      navigate(
        "/admin/events"
      );

    } catch (error) {

      console.error(
        "Error creating event:",
        error
      );

      alert(
        "Unable to connect to backend."
      );

    } finally {

      setLoading(false);

    }

  };


  // =========================================
  // UI
  // =========================================

  return (

    <div className="admin-layout">

      {/* SIDEBAR */}

      <AdminSidebar />


      {/* MAIN CONTENT */}

      <main className="admin-main">

        {/* PAGE HEADER */}

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


        {/* EVENT FORM */}

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