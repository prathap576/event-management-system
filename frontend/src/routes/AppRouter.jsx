import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminRoute from "./AdminRoute";

import AdminLogin from "../pages/admin/AdminLogin";

import AdminDashboard from "../pages/admin/AdminDashboard";

import ManageEvents from "../pages/admin/ManageEvents";

import CreateEvent from "../pages/admin/CreateEvent";

import EditEvent from "../pages/admin/EditEvent";

import EventRegistrations from "../pages/admin/EventRegistrations";


function AppRouter() {

  return (

    <BrowserRouter>

      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={
            <Navigate
              to="/admin-login"
              replace
            />
          }
        />


        {/* ADMIN LOGIN */}

        <Route
          path="/admin-login"
          element={
            <AdminLogin />
          }
        />


        {/* PROTECTED ADMIN */}

        <Route
          element={
            <AdminRoute />
          }
        >

          <Route
            path="/admin"
            element={
              <AdminDashboard />
            }
          />


          <Route
            path="/admin/events"
            element={
              <ManageEvents />
            }
          />


          <Route
            path="/admin/events/create"
            element={
              <CreateEvent />
            }
          />


          <Route
            path="/admin/events/edit/:id"
            element={
              <EditEvent />
            }
          />


          <Route
            path="/admin/registrations"
            element={
              <EventRegistrations />
            }
          />

        </Route>


        {/* UNKNOWN ROUTE */}

        <Route
          path="*"
          element={
            <Navigate
              to="/admin-login"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}


export default AppRouter;