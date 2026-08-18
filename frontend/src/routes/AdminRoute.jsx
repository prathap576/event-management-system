import { Navigate, Outlet } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

function AdminRoute() {
  const { isAdmin, loading } = useAdmin();

  if (loading) {
    return (
      <div className="route-loading">
        <div className="spinner"></div>
        <p>Loading Admin Panel...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;