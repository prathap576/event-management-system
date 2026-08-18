import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import MyRegistrations from "../pages/MyRegistrations";
import Home from "../pages/Home";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

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
      <Navbar />

      <Routes>
        {/* ================= USER ROUTES ================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/events"
          element={<Events />}
        />

        <Route
          path="/events/:id"
          element={<EventDetails />}
        />

        {/* My Registrations - USER ROUTE */}
        <Route
          path="/my-registrations"
          element={<MyRegistrations />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* ================= ADMIN LOGIN ================= */}

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        {/* ================= PROTECTED ADMIN ROUTES ================= */}

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

        {/* ================= UNKNOWN ROUTE ================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;