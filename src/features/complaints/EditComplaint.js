import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectComplaintById } from "./complaintsApiSlice";
import { selectAllUsers } from "../users/usersApiSlice";
import EditComplaintForm from "./EditComplaintForm";

const EditComplaint = () => {
  const { id } = useParams();

  const complaint = useSelector((state) => selectComplaintById(state, id));
  const users = useSelector(selectAllUsers);

  const content =
    complaint && users ? (
      <EditComplaintForm complaint={complaint} users={users} />
    ) : (
      <p>Loading...</p>
    );

  return content;
};
export default EditComplaint;
