import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// Define hook for getting footer info
const DashFooter = () => {
  // Get user authen info from useAuth hook
  const { username, status } = useAuth();

  // navigate and get current location
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Handle Home button click event
  const onGoHomeClicked = () => navigate("/dash");

  // Show Home button only if not already on the dashboard
  let goHomeButton = null;
  if (pathname !== "/dash") {
    goHomeButton = (
      <button
        className="dash-footer__button icon-button"
        title="Home"
        onClick={onGoHomeClicked}
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }

  // Render the footer with username, status and possibly the Home button
  const content = (
    <footer className="dash-footer">
      {goHomeButton}
      <p> Current User: {username}</p>
      <p> Status: {status} </p>
    </footer>
  );
  return content;
};

export default DashFooter;
