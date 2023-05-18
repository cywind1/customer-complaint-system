// useSelector -> hook that allows components to extract data from the Redux store
// import { useSelector } from "react-redux";
// a selector function for returning an array of all users from the Redux store
// import { selectAllUsers } from "../users/usersApiSlice";
import NewComplaintForm from "./NewComplaintForm";
import { useGetUsersQuery } from "../users/usersApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import useTitle from "../../hooks/useTitle";

const NewComplaint = () => {
  useTitle("New Complaint");
  // 12.9 useGetUsersQuery & PulseLoader & useTitle
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!users?.length) return <PulseLoader color={"#FFF"} />;

  // extract array of selectAllUsers from the store, which is then passed as a prop to the NewComplaintForm component
  // const users = useSelector(selectAllUsers);

  // // DEBUG: array of 5 objects
  // console.log("users:", users);

  // if (!users?.length) return <p>Not Currently Available</p>;

  const content = <NewComplaintForm users={users} />;

  return content;
};
export default NewComplaint;
