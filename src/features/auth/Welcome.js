// component is displayed only after a user logs in, so it is put under the auth folder.
import { Link } from "react-router-dom";

// 11.3
import useAuth from "../../hooks/useAuth";

const Welcome = () => {
  // Extracting user info using the useAuth hook
  const { username, isManager, isAdmin } = useAuth();

  // Getting the current date and time
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className="welcome">
      <p>{today}</p>

      <h1>Welcome {username}! </h1>

      <p>
        <Link to="/dash/complaints">View Customer Complaints</Link>
      </p>
      <p>
        <Link to="/dash/complaints/new">Add New Customer Complaints</Link>
      </p>

      {/* Displaying additional links based on user role, only show the link if they are manager or admin */}
      {(isManager || isAdmin) && (
        <p>
          <Link to="/dash/users">View User Settings</Link>
        </p>
      )}
      {(isManager || isAdmin) && (
        <p>
          <Link to="/dash/users/new">Add New User</Link>
        </p>
      )}
    </section>
  );

  return content;
};
export default Welcome;
