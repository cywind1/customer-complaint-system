import { useGetComplaintsQuery } from "./complaintsApiSlice";
import Complaint from "./Complaint";

const ComplaintsList = () => {
  const {
    data: complaints,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetComplaintsQuery();

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = complaints;

    const tableContent = ids?.length
      ? ids.map((complaintId) => (
          <Complaint key={complaintId} complaintId={complaintId} />
        ))
      : null;

    content = (
      <table className="table table--complaints">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th complaint__status">
              Username
            </th>
            <th scope="col" className="table__th complaint__created">
              Created
            </th>
            <th scope="col" className="table__th complaint__updated">
              Updated
            </th>
            <th scope="col" className="table__th complaint__title">
              Title
            </th>
            <th scope="col" className="table__th complaint__username">
              Owner
            </th>
            <th scope="col" className="table__th complaint__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};
export default ComplaintsList;
