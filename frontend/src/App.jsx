import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import MyRegistrations from "./pages/MyRegistrations";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import Registration from "./pages/Registration";
import About from "./pages/About";
import Contact from "./pages/Contact";

import AdminRoute from "./routes/AdminRoute";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageEvents from "./pages/admin/ManageEvents";
import CreateEvent from "./pages/admin/CreateEvent";
import EditEvent from "./pages/admin/EditEvent";
import EventRegistrations from "./pages/admin/EventRegistrations";

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Routes>

          {/* =================================
              PUBLIC / USER ROUTES
          ================================= */}

          {/* Home */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />

          {/* All Events */}
          <Route
            path="/events"
            element={
              <>
                <Navbar />
                <Events />
              </>
            }
          />

          {/* Event Details */}
          <Route
            path="/events/:id"
            element={
              <>
                <Navbar />
                <EventDetails />
              </>
            }
          />

          {/* Event Registration */}
          <Route
            path="/events/:id/register"
            element={
              <>
                <Navbar />
                <Registration />
              </>
            }
          />

          {/* My Registrations */}
          <Route
            path="/my-registrations"
            element={
              <>
                <Navbar />
                <MyRegistrations />
              </>
            }
          />

          {/* Login */}
          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />
              </>
            }
          />

          {/* Signup */}
          <Route
            path="/signup"
            element={
              <>
                <Navbar />
                <Signup />
              </>
            }
          />

          {/* =================================
              USER DASHBOARD
          ================================= */}

          <Route
            path="/dashboard"
            element={
              <>
                <Navbar />
                <UserDashboard />
              </>
            }
          />

          {/* =================================
              ABOUT
          ================================= */}

          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <About />
              </>
            }
          />

          {/* =================================
              CONTACT
          ================================= */}

          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <Contact />
              </>
            }
          />

          {/* =================================
              ADMIN ROUTES
          ================================= */}

          <Route element={<AdminRoute />}>

            {/* Admin Dashboard */}
            <Route
              path="/admin"
              element={<AdminDashboard />}
            />

            {/* Manage Events */}
            <Route
              path="/admin/events"
              element={<ManageEvents />}
            />

            {/* Create Event */}
            <Route
              path="/admin/events/create"
              element={<CreateEvent />}
            />

            {/* Edit Event */}
            <Route
              path="/admin/events/edit/:id"
              element={<EditEvent />}
            />

            {/* Event Registrations */}
            <Route
              path="/admin/registrations"
              element={<EventRegistrations />}
            />

          </Route>

          {/* =================================
              UNKNOWN ROUTE
          ================================= */}

          <Route
            path="*"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />

        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;