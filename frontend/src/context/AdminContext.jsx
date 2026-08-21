import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getEventStatus,
} from "../utils/eventUtils";


const AdminContext = createContext(null);


/* =========================================
   LOCAL STORAGE KEYS
========================================= */

const REGISTRATIONS_KEY =
  "event_management_registrations_v2";

const ADMIN_KEY =
  "event_management_admin";


/* =========================================
   BACKEND URL
========================================= */

const API_URL =
  "http://localhost:8080/api";


/* =========================================
   ADMIN PROVIDER
========================================= */

export function AdminProvider({ children }) {

  const [admin, setAdmin] =
    useState(null);

  // NEW: logged-in user
  const [currentUser, setCurrentUser] =
    useState(null);

  const [events, setEvents] =
    useState([]);

  const [registrations, setRegistrations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  /* =========================================
     INITIAL LOAD
  ========================================= */

  useEffect(() => {
    loadApplicationData();
  }, []);


  /* =========================================
     LOAD APPLICATION DATA
  ========================================= */

  const loadApplicationData = async () => {

    try {

      /* -----------------------------------------
         STORED ADMIN
      ----------------------------------------- */

      const storedAdmin =
        localStorage.getItem(
          ADMIN_KEY
        );


      if (storedAdmin) {

        const parsedAdmin =
          JSON.parse(
            storedAdmin
          );

        setAdmin(parsedAdmin);

        // Also make admin the current user
        setCurrentUser(parsedAdmin);

      }


      /* =========================================
         LOAD EVENTS FROM SPRING BOOT
      ========================================= */

      const eventResponse =
        await fetch(
          `${API_URL}/events`
        );


      if (!eventResponse.ok) {

        throw new Error(
          "Failed to fetch events"
        );

      }


      const backendEvents =
        await eventResponse.json();


      setEvents(
        Array.isArray(backendEvents)
          ? backendEvents
          : []
      );


      /* =========================================
         STORED REGISTRATIONS
      ========================================= */

      const storedRegistrations =
        localStorage.getItem(
          REGISTRATIONS_KEY
        );


      if (storedRegistrations) {

        const parsedRegistrations =
          JSON.parse(
            storedRegistrations
          );


        setRegistrations(
          Array.isArray(
            parsedRegistrations
          )
            ? parsedRegistrations
            : []
        );

      } else {

        setRegistrations([]);

      }


    } catch (error) {

      console.error(
        "Failed to load application data:",
        error
      );


      /*
       * If backend is unavailable,
       * keep events empty.
       */

      setEvents([]);


    } finally {

      setLoading(false);

    }

  };


  /* =========================================
     LOGIN
     CONNECTED TO SPRING BOOT BACKEND
     
     Supports BOTH:
     USER
     ADMIN
  ========================================= */

  const loginAdmin = async (
    email,
    password
  ) => {

    try {

      const response =
        await fetch(
          `${API_URL}/auth/login`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email,
              password,
            }),

          }
        );


      /* =========================================
         LOGIN FAILED
      ========================================= */

      if (!response.ok) {

        let message =
          "Invalid email or password.";


        try {

          const errorData =
            await response.text();


          if (errorData) {

            message =
              errorData;

          }

        } catch (error) {

          console.error(
            "Error reading login response:",
            error
          );

        }


        return {

          success: false,

          message,

        };

      }


      /* =========================================
         LOGIN SUCCESS
      ========================================= */

      const loggedInUser =
        await response.json();


      /* =========================================
         CREATE USER OBJECT
      ========================================= */

      const user = {

        id:
          loggedInUser.id,

        name:
          loggedInUser.name ||
          loggedInUser.username ||
          loggedInUser.email,

        username:
          loggedInUser.username,

        email:
          loggedInUser.email,

        role:
          loggedInUser.role ||
          "USER",

      };


      /* =========================================
         SAVE CURRENT USER
      ========================================= */

      setCurrentUser(user);


      /* =========================================
         ADMIN LOGIN
      ========================================= */

      if (
        user.role?.toUpperCase() ===
        "ADMIN"
      ) {

        setAdmin(user);


        localStorage.setItem(
          ADMIN_KEY,
          JSON.stringify(user)
        );

      }


      /* =========================================
         RETURN LOGIN RESULT
      ========================================= */

      return {

        success: true,

        user: user,

      };


    } catch (error) {

      console.error(
        "Login failed:",
        error
      );


      return {

        success: false,

        message:
          "Unable to connect to the server. Please make sure the Spring Boot backend is running.",

      };

    }

  };


  /* =========================================
     USER / ADMIN LOGOUT
  ========================================= */

  const logoutAdmin = () => {

    setAdmin(null);

    setCurrentUser(null);


    localStorage.removeItem(
      ADMIN_KEY
    );

  };


  /* =========================================
     AUTHENTICATION CHECK
  ========================================= */

  const isAdmin =
    admin?.role?.toUpperCase() ===
    "ADMIN";


  const isAuthenticated =
    currentUser !== null;


  /* =========================================
     CREATE EVENT
     CONNECTED TO SPRING BOOT
  ========================================= */

  const createEvent = async (
    eventData
  ) => {

    try {

      const response =
        await fetch(
          `${API_URL}/events`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              eventData
            ),

          }
        );


      if (!response.ok) {

        const errorText =
          await response.text();


        console.error(
          "Create event failed:",
          errorText
        );


        throw new Error(
          "Failed to create event"
        );

      }


      const createdEvent =
        await response.json();


      /*
       * Add backend-created event
       * to React state.
       */

      setEvents(
        (currentEvents) => [
          ...currentEvents,
          createdEvent,
        ]
      );


      return createdEvent;


    } catch (error) {

      console.error(
        "Create event error:",
        error
      );


      throw error;

    }

  };


  /* =========================================
     UPDATE EVENT
     CONNECTED TO SPRING BOOT
  ========================================= */

  const updateEvent = async (
    id,
    eventData
  ) => {

    try {

      const response =
        await fetch(
          `${API_URL}/events/${id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              eventData
            ),

          }
        );


      if (!response.ok) {

        const errorText =
          await response.text();


        console.error(
          "Update event failed:",
          errorText
        );


        throw new Error(
          "Failed to update event"
        );

      }


      const updatedEvent =
        await response.json();


      /*
       * Update React state
       */

      setEvents(
        (currentEvents) =>
          currentEvents.map(
            (event) =>
              event.id ===
              Number(id)
                ? updatedEvent
                : event
          )
      );


      return updatedEvent;


    } catch (error) {

      console.error(
        "Update event error:",
        error
      );


      throw error;

    }

  };


  /* =========================================
     DELETE EVENT
     CONNECTED TO SPRING BOOT
  ========================================= */

  const deleteEvent = async (
    id
  ) => {

    try {

      const response =
        await fetch(
          `${API_URL}/events/${id}`,
          {
            method: "DELETE",
          }
        );


      if (!response.ok) {

        const errorText =
          await response.text();


        console.error(
          "Delete event failed:",
          errorText
        );


        throw new Error(
          "Failed to delete event"
        );

      }


      /*
       * Remove from React state
       */

      setEvents(
        (currentEvents) =>
          currentEvents.filter(
            (event) =>
              event.id !==
              Number(id)
          )
      );


      return true;


    } catch (error) {

      console.error(
        "Delete event error:",
        error
      );


      throw error;

    }

  };


  /* =========================================
     GET EVENT BY ID
  ========================================= */

  const getEventById = (
    id
  ) => {

    return events.find(
      (event) =>
        event.id ===
        Number(id)
    );

  };


  /* =========================================
     REGISTRATION MANAGEMENT
  ========================================= */

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


  /* =========================================
     CLEAR DATA
  ========================================= */

  const resetDemoData = () => {

    /*
     * Events are stored in MySQL now,
     * so this function only clears
     * local registration data.
     */

    setRegistrations([]);


    localStorage.setItem(
      REGISTRATIONS_KEY,
      JSON.stringify([])
    );

  };


  /* =========================================
     DASHBOARD STATISTICS
  ========================================= */

  const statistics =
    useMemo(() => {

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


  /* =========================================
     CONTEXT VALUE
  ========================================= */

  const value = {

    /* -----------------------------------------
       ADMIN
    ----------------------------------------- */

    admin,

    isAdmin,

    loading,


    /* -----------------------------------------
       CURRENT USER
    ----------------------------------------- */

    currentUser,

    isAuthenticated,


    /* -----------------------------------------
       EVENTS
    ----------------------------------------- */

    events,

    createEvent,

    updateEvent,

    deleteEvent,

    getEventById,


    /* -----------------------------------------
       REGISTRATIONS
    ----------------------------------------- */

    registrations,

    updateRegistrationStatus,


    /* -----------------------------------------
       STATISTICS
    ----------------------------------------- */

    statistics,


    /* -----------------------------------------
       AUTHENTICATION
    ----------------------------------------- */

    loginAdmin,

    logoutAdmin,


    /* -----------------------------------------
       DATA RESET
    ----------------------------------------- */

    resetDemoData,

  };


  /* =========================================
     PROVIDER
  ========================================= */

  return (

    <AdminContext.Provider
      value={value}
    >

      {children}

    </AdminContext.Provider>

  );

}


/* =========================================
   useAdmin HOOK
========================================= */

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