import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectComplaintById } from "./complaintsApiSlice";
// import { selectAllUsers } from "../users/usersApiSlice";
import EditComplaintForm from "./EditComplaintForm";
import { useGetComplaintsQuery } from "./complaintsApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import useAuth from "../../hooks/useAuth";
// render the spinner on the page when content is being loaded or processed.
import PulseLoader from "react-spinners/PulseLoader";
import useTitle from "../../hooks/useTitle";

const EditComplaint = () => {
  // 12.10 useQuery to replace useSelector, add PulseLoader & useTitle
  useTitle("Edit Complaint");
  const { id } = useParams();

  const { username, isManager, isAdmin } = useAuth();

  const { complaint } = useGetComplaintsQuery("complaintsList", {
    selectFromResult: ({ data }) => ({
      complaint: data?.entities[id],
    }),
  });

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!complaint || !users?.length) return <PulseLoader color={"#FFF"} />;

  // prevent unauthorized role get access to complaint
  if (!isManager && !isAdmin) {
    if (complaint.username !== username) {
      return <p className="errmsg">No access</p>;
    }
  }

  const content = <EditComplaintForm complaint={complaint} users={users} />;

  // const complaint = useSelector((state) => selectComplaintById(state, id));
  // const users = useSelector(selectAllUsers);

  // const content =
  //   complaint && users ? (
  //     <EditComplaintForm complaint={complaint} users={users} />
  //   ) : (
  //     <p>Loading...</p>
  //   );

  return content;
};
export default EditComplaint;
