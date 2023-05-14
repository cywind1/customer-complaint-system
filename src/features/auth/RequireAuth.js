// to be used at App.js to protect routes
// prevent unauthorized role get access to page with the address
// used to restrict access to certain routes based on the user's role

import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

// a higher-order component that wraps around components that require authentication and role-based access control
const RequireAuth = ({ allowedRoles }) => {
  // Get the current location
  const location = useLocation();

  // Get the current user's roles from the useAuth hook
  const { roles } = useAuth();

  // Determine the content to display based on whether the user has the necessary roles
  // If the user has at least one of the allowed roles, render the child components
  // If not, redirect to the login page
  const content = roles.some((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
  return content;
};

export default RequireAuth;
