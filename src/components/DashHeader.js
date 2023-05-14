// DashHeader component renders the header for the dashboard page.
// Link component is used to create links between different pages in the application.
// allows to create links between pages without having to reload the entire page each time.
// repeated declare is not allowed
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link, useLocation } from "react-router-dom";

import { useSendLogoutMutation } from "../features/auth/authApiSlice";

import useAuth from "../hooks/useAuth";
// define regular expressions to match routes
const DASH_REGEX = /^\/dash(\/)?$/;
const COMPLAINTS_REGEX = /^\/dash\/complaints(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  // get user authentication information
  const { isManager, isAdmin } = useAuth();

  // get functions to navigate and identify the current location
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // use sendLogout mutation from authApiSlice
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  // if logout was successful, navigate back to home page

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  // // no longer needed after 4 buttons added
  // // display message while logging out
  // if (isLoading) return <p>Logging Out...</p>;
  // // display error message if logout fails
  // if (isError) return <p>Error: {error.data?.message}</p>;

  // functions to navigate to different pages
  const onNewComplaintClicked = () => navigate("/dash/complaints/new");
  const onNewUserClicked = () => navigate("/dash/users/new");
  const onComplaintsClicked = () => navigate("/dash/complaints");
  const onUsersClicked = () => navigate("/dash/users");

  // set dashClass if not on dash, complaints or users page
  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !COMPLAINTS_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "dash-header__container--small";
  }

  // create newComplaintButton if on complaints page
  let newComplaintButton = null;
  if (COMPLAINTS_REGEX.test(pathname)) {
    newComplaintButton = (
      <button
        className="icon-button"
        title="New Complaint"
        onClick={onNewComplaintClicked}
      >
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    );
  }

  // create newUserButton if on users page
  let newUserButton = null;
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button
        className="icon-button"
        title="New User"
        onClick={onNewUserClicked}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    );
  }

  // create userButton if user is manager or admin, not on users page
  let userButton = null;
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
      userButton = (
        <button className="icon-button" title="Users" onClick={onUsersClicked}>
          <FontAwesomeIcon icon={faUserGear} />
        </button>
      );
    }
  }

  // create complaintsButton if not on complaints & dash page
  let complaintsButton = null;
  if (!COMPLAINTS_REGEX.test(pathname) && pathname.includes("/dash")) {
    complaintsButton = (
      <button
        className="icon-button"
        title="Complaints"
        onClick={onComplaintsClicked}
      >
        <FontAwesomeIcon icon={faFilePen} />
      </button>
    );
  }

  // create logoutButton with sendLogout function
  const logoutButton = (
    <button className="icon-button" title="Logout" onClick={sendLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  // sets the class for displaying error messages.
  const errClass = isError ? "errmsg" : "offscreen";

  let buttonContent;
  // displays a message when the user clicks the logout button.
  if (isLoading) {
    buttonContent = <p>Logging Out...</p>;
  } else {
    // creates a navigation menu for the dashboard page including 4 buttons.
    buttonContent = (
      <>
        {newComplaintButton}
        {newUserButton}
        {complaintsButton}
        {userButton}
        {logoutButton}
      </>
    );
  }

  // renders the content for the dashboard header including any error messages and the navigation menu.
  // Cannot read properties of undefined (reading 'data')
  // <p className={errClass}>{error.data?.message}</p>
  // !learn if don't have "error", data property doesn't exist, optional chaining is required
  // will return undefined instead of throwing an error, which allows code to continue executing without breaking
  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <header className="dash-header">
        <div className={`dash-header__container ${dashClass}`}>
          <Link to="/dash">
            <h1 className="dash-header__title">Customer Complaints System</h1>
          </Link>
          <nav className="dash-header__nav">{buttonContent}</nav>
        </div>
      </header>
    </>
  );
  return content;
};

export default DashHeader;
