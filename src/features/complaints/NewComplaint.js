// useSelector -> hook that allows components to extract data from the Redux store
import { useSelector } from "react-redux";
// a selector function for returning an array of all users from the Redux store
import { selectAllUsers } from "../users/usersApiSlice";
import NewComplaintForm from "./NewComplaintForm";

const NewComplaint = () => {
  // extract array of selectAllUsers from the store, which is then passed as a prop to the NewComplaintForm component
  const users = useSelector(selectAllUsers);

  const content = users ? (
    <NewComplaintForm users={users} />
  ) : (
    <p>Loading...</p>
  );

  return content;
};
export default NewComplaint;
