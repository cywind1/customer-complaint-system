// Link component is used to create links between different pages in the application. It allows you to create links between different pages in your application without having to reload the entire page each time.
// repeated declare is not allowed
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link, useLocation } from "react-router-dom";

import { useSendLogoutMutation } from "../features/auth/authApiSlice";

// identify the location
const DASH_REGEX = /^\/dash(\/)?$/;
const COMPLAINTS_REGEX = /^\/dash\/complaints(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  if (isLoading) return <p>Logging Out...</p>;

  if (isError) return <p>Error: {error.data?.message}</p>;

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !COMPLAINTS_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "dash-header__container--small";
  }

  const logoutButton = (
    <button className="icon-button" title="Logout" onClick={sendLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  const content = (
    <header className="dash-header">
      <div className="dash-header__container">
        <Link to="/dash">
          {/* <Link to="dash/"> */}
          <h1 className="dash-header__title">Customer Complaints System</h1>
        </Link>
        <nav className="dash-header__nav">
          {/* add more buttons later */}
          {logoutButton}
        </nav>
      </div>
    </header>
  );
  return content;
};

export default DashHeader;
