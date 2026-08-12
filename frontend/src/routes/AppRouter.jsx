import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Home from "../pages/Home";

import AdminRoute from "./AdminRoute";

import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageEvents from "../pages/admin/ManageEvents";
import CreateEvent from "../pages/admin/CreateEvent";
import EditEvent from "../pages/admin/EditEvent";
import EventRegistrations from "../pages/admin/EventRegistrations";

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>

        {/* PUBLIC WEBSITE */}

        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        {/* ADMIN AREA */}

        <Route element={<AdminRoute />}>

          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/events"
            element={<ManageEvents />}
          />

          <Route
            path="/admin/events/create"
            element={<CreateEvent />}
          />

          <Route
            path="/admin/events/edit/:id"
            element={<EditEvent />}
          />

          <Route
            path="/admin/registrations"
            element={<EventRegistrations />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default AppRouter;