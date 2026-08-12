import { createContext, useContext, useEffect, useState } from "react";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = () => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setAdmin(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const user = JSON.parse(storedUser);

      setAdmin(user);
      setIsAdmin(
        user?.role?.toUpperCase() === "ADMIN"
      );

    } catch (error) {
      console.error("Error checking admin:", error);

      setAdmin(null);
      setIsAdmin(false);

    } finally {
      setLoading(false);
    }
  };

  const loginAdmin = (userData) => {
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setAdmin(userData);

    setIsAdmin(
      userData?.role?.toUpperCase() === "ADMIN"
    );
  };

  const logoutAdmin = () => {
    localStorage.removeItem("user");

    setAdmin(null);
    setIsAdmin(false);
  };

  const refreshAdmin = () => {
    checkAdmin();
  };

  return (
    <AdminContext.Provider
      value={{
        admin,
        isAdmin,
        loading,
        loginAdmin,
        logoutAdmin,
        refreshAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error(
      "useAdmin must be used inside AdminProvider"
    );
  }

  return context;
}

export default AdminContext;