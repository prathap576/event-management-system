import { Navigate, Outlet } from "react-router-dom";

import { useAdmin } from "../context/AdminContext";

function AdminRoute() {

  const {
    admin,
    loading,
  } = useAdmin();


  // --------------------------------------------------
  // Wait until AdminContext finishes loading
  // --------------------------------------------------

  if (loading) {

    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
          fontSize: "18px",
          color: "#334155",
        }}
      >
        Loading...
      </div>
    );

  }


  // --------------------------------------------------
  // Check admin authentication
  // --------------------------------------------------

  const isAdmin =
    admin &&
    admin.role?.toUpperCase() === "ADMIN";


  // --------------------------------------------------
  // Not logged in → Login page
  // --------------------------------------------------

  if (!isAdmin) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  // --------------------------------------------------
  // Admin authenticated
  // --------------------------------------------------

  return <Outlet />;

}

export default AdminRoute;