import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";

const EditUser = () => {
  const { id } = useParams();

  // ensure we have the user data before we need it inside the edit user form
  // pre-populate the form we need the existing data to show up in the form, this will confirm we have it as we render that edit user form

  const user = useSelector((state) => selectUserById(state, id));

  const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>;

  return content;
};
export default EditUser;
