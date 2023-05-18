import { useParams } from "react-router-dom";
// import { selectUserById } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";
import { useGetUsersQuery } from "./usersApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import useTitle from "../../hooks/useTitle";

const EditUser = () => {
  useTitle("Customer Complaints System: Edit User");
  const { id } = useParams();

  // ensure we have the user data before we need it inside the edit user form
  // pre-populate the form we need the existing data to show up in the form, this will confirm we have it as we render that edit user form

  // const user = useSelector((state) => selectUserById(state, id));
  // const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>;
  // 12.9 useGetUsersQuery & PulseLoader
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  if (!user) return <PulseLoader color={"#FFF"} />;

  const content = <EditUserForm user={user} />;
  return content;
};
export default EditUser;
