import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  initialEvents,
  initialRegistrations,
} from "../data/initialData";

import {
  getEventStatus,
} from "../utils/eventUtils";

const AdminContext = createContext(null);

const EVENTS_KEY =
  "event_management_events";

const REGISTRATIONS_KEY =
  "event_management_registrations";

const ADMIN_KEY =
  "event_management_admin";


export function AdminProvider({ children }) {

  const [admin, setAdmin] =
    useState(null);

  const [events, setEvents] =
    useState([]);

  const [registrations, setRegistrations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  // ==================================================
  // INITIAL LOAD
  // ==================================================

  useEffect(() => {
    loadApplicationData();
  }, []);


  const loadApplicationData = () => {

    try {

      const storedAdmin =
        localStorage.getItem(
          ADMIN_KEY
        );

      const storedEvents =
        localStorage.getItem(
          EVENTS_KEY
        );

      const storedRegistrations =
        localStorage.getItem(
          REGISTRATIONS_KEY
        );


      // -----------------------------
      // ADMIN
      // -----------------------------

      if (storedAdmin) {

        setAdmin(
          JSON.parse(storedAdmin)
        );

      }


      // -----------------------------
      // EVENTS
      // -----------------------------

      if (storedEvents) {

        setEvents(
          JSON.parse(storedEvents)
        );

      } else {

        setEvents(initialEvents);

        localStorage.setItem(
          EVENTS_KEY,
          JSON.stringify(
            initialEvents
          )
        );

      }


      // -----------------------------
      // REGISTRATIONS
      // -----------------------------

      if (storedRegistrations) {

        setRegistrations(
          JSON.parse(
            storedRegistrations
          )
        );

      } else {

        setRegistrations(
          initialRegistrations
        );

        localStorage.setItem(
          REGISTRATIONS_KEY,
          JSON.stringify(
            initialRegistrations
          )
        );

      }

    } catch (error) {

      console.error(
        "Failed to load application data:",
        error
      );

      setEvents(
        initialEvents
      );

      setRegistrations(
        initialRegistrations
      );

    } finally {

      setLoading(false);

    }
  };


  // ==================================================
  // ADMIN AUTHENTICATION
  // ==================================================

  const loginAdmin = (
    email,
    password
  ) => {

    if (
      email === "admin@event.com" &&
      password === "admin123"
    ) {

      const adminUser = {

        id: 1,

        name: "Ashok",

        email:
          "admin@event.com",

        role: "ADMIN",

      };


      setAdmin(adminUser);


      localStorage.setItem(
        ADMIN_KEY,
        JSON.stringify(
          adminUser
        )
      );


      return {
        success: true,
      };

    }


    return {

      success: false,

      message:
        "Invalid admin credentials.",

    };

  };


  const logoutAdmin = () => {

    setAdmin(null);

    localStorage.removeItem(
      ADMIN_KEY
    );

  };


  const isAdmin =
    admin?.role?.toUpperCase() ===
    "ADMIN";


  // ==================================================
  // EVENT CRUD
  // ==================================================

  const createEvent = (
    eventData
  ) => {

    const newEvent = {

      ...eventData,

      id: Date.now(),

      status:
        eventData.status ||
        "Published",

      createdAt:
        new Date()
          .toISOString()
          .split("T")[0],

    };


    const updatedEvents = [
      ...events,
      newEvent,
    ];


    setEvents(
      updatedEvents
    );


    localStorage.setItem(
      EVENTS_KEY,
      JSON.stringify(
        updatedEvents
      )
    );


    return newEvent;

  };


  const updateEvent = (
    id,
    eventData
  ) => {

    const updatedEvents =
      events.map(
        (event) =>
          event.id ===
          Number(id)

            ? {
                ...event,
                ...eventData,
                id: event.id,
              }

            : event
      );


    setEvents(
      updatedEvents
    );


    localStorage.setItem(
      EVENTS_KEY,
      JSON.stringify(
        updatedEvents
      )
    );


    return updatedEvents.find(
      (event) =>
        event.id ===
        Number(id)
    );

  };


  const deleteEvent = (
    id
  ) => {

    const updatedEvents =
      events.filter(
        (event) =>
          event.id !==
          Number(id)
      );


    setEvents(
      updatedEvents
    );


    localStorage.setItem(
      EVENTS_KEY,
      JSON.stringify(
        updatedEvents
      )
    );

  };


  const getEventById = (
    id
  ) => {

    return events.find(
      (event) =>
        event.id ===
        Number(id)
    );

  };


  // ==================================================
  // REGISTRATION MANAGEMENT
  // ==================================================

  const updateRegistrationStatus = (
    registrationId,
    status
  ) => {

    const updatedRegistrations =
      registrations.map(
        (registration) =>

          registration.id ===
          Number(registrationId)

            ? {
                ...registration,
                status,
              }

            : registration
      );


    setRegistrations(
      updatedRegistrations
    );


    localStorage.setItem(
      REGISTRATIONS_KEY,
      JSON.stringify(
        updatedRegistrations
      )
    );

  };


  // ==================================================
  // RESET DEMO DATA
  // ==================================================

  const resetDemoData = () => {

    setEvents(
      initialEvents
    );

    setRegistrations(
      initialRegistrations
    );


    localStorage.setItem(
      EVENTS_KEY,
      JSON.stringify(
        initialEvents
      )
    );


    localStorage.setItem(
      REGISTRATIONS_KEY,
      JSON.stringify(
        initialRegistrations
      )
    );

  };


  // ==================================================
  // DASHBOARD STATISTICS
  // ==================================================

  const statistics = useMemo(() => {

    const upcomingEvents =
      events.filter(
        (event) =>
          getEventStatus(event) ===
          "Upcoming"
      ).length;


    const completedEvents =
      events.filter(
        (event) =>
          getEventStatus(event) ===
          "Completed"
      ).length;


    const draftEvents =
      events.filter(
        (event) =>
          getEventStatus(event) ===
          "Draft"
      ).length;


    const publishedEvents =
      events.filter(
        (event) =>
          event.status ===
          "Published"
      ).length;


    const confirmedRegistrations =
      registrations.filter(
        (registration) =>
          registration.status ===
          "Confirmed"
      ).length;


    const pendingRegistrations =
      registrations.filter(
        (registration) =>
          registration.status ===
          "Pending"
      ).length;


    const cancelledRegistrations =
      registrations.filter(
        (registration) =>
          registration.status ===
          "Cancelled"
      ).length;


    return {

      totalEvents:
        events.length,

      upcomingEvents,

      completedEvents,

      draftEvents,

      publishedEvents,

      totalRegistrations:
        registrations.length,

      confirmedRegistrations,

      pendingRegistrations,

      cancelledRegistrations,

    };

  }, [
    events,
    registrations,
  ]);


  // ==================================================
  // CONTEXT VALUE
  // ==================================================

  const value = {

    // Admin
    admin,

    isAdmin,

    loading,


    // Events
    events,

    createEvent,

    updateEvent,

    deleteEvent,

    getEventById,


    // Registrations
    registrations,

    updateRegistrationStatus,


    // Statistics
    statistics,


    // Authentication
    loginAdmin,

    logoutAdmin,


    // Demo
    resetDemoData,

  };


  // ==================================================
  // PROVIDER
  // ==================================================

  return (
    <AdminContext.Provider
      value={value}
    >
      {children}
    </AdminContext.Provider>
  );

}


// ====================================================
// useAdmin HOOK
// ====================================================

export function useAdmin() {

  const context =
    useContext(
      AdminContext
    );


  if (!context) {

    throw new Error(
      "useAdmin must be used inside AdminProvider"
    );

  }


  return context;

}


export default AdminContext;