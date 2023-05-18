import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useGetComplaintsQuery } from "./complaintsApiSlice";
import { memo } from "react";

// import { useSelector } from "react-redux";
// import { selectComplaintById } from "./complaintsApiSlice";

const Complaint = ({ complaintId }) => {
  // const complaint = useSelector((state) => selectComplaintById(state, complaintId));
  // 12.8 add useGetComplaintsQuery & memo, getting data in a different way
  const { complaint } = useGetComplaintsQuery("complaintsList", {
    selectFromResult: ({ data }) => ({
      complaint: data?.entities[complaintId],
    }),
  });
  const navigate = useNavigate();

  if (complaint) {
    const created = new Date(complaint.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const updated = new Date(complaint.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const handleEdit = () => navigate(`/dash/complaints/${complaintId}`);

    return (
      <tr className="table__row">
        <td className="table__cell complaint__status">
          {complaint.completed ? (
            <span className="complaint__status--completed">Completed</span>
          ) : (
            <span className="complaint__status--open">Open</span>
          )}
        </td>
        <td className="table__cell complaint__created">{created}</td>
        <td className="table__cell complaint__updated">{updated}</td>
        <td className="table__cell complaint__title">{complaint.title}</td>
        <td className="table__cell complaint__username">
          {complaint.username}
        </td>

        <td className="table__cell">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

const memoizedComplaint = memo(Complaint);

export default memoizedComplaint;

// export default Complaint;
