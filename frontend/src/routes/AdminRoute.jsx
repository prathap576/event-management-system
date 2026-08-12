import { Navigate, Outlet } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

function AdminRoute() {
  const { isAdmin, loading } = useAdmin();

  if (loading) {
    return (
      <div className="route-loading">
        Checking admin access...
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}


export default AdminRoute;