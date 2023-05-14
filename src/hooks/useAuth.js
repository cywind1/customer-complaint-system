import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
// jwt-decode library can be used to decode the JWT and extract the information contained within it. This information can then be used to authenticate the user and perform authorized actions within the application.

import jwtDecode from "jwt-decode";

// Define hook for getting user authentication information
const useAuth = () => {
  // Get the current token from the Redux store
  const token = useSelector(selectCurrentToken);

  // Initialize default values for user roles and status
  let isManager = false;
  let isAdmin = false;
  let status = "Customer";

  if (token) {
    // If a token is present, decode it to get user information
    const decoded = jwtDecode(token);

    // Destructure UserInfo object from decoded token to get user's username and roles.
    const { username, roles } = decoded.UserInfo;

    // Check if user is a manager or admin based on their roles
    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");

    // Update user status based on role
    // sequence is important, checking the higher rank first
    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";

    // Return an object containing user authentication information
    return { username, roles, status, isManager, isAdmin };
  }

  // If no token is present, return default values
  return { username: "", roles: [], isManager, isAdmin, status };
};
export default useAuth;
