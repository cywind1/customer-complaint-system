//7.11
import { useState, useEffect } from "react";
import {
  useUpdateComplaintMutation,
  useDeleteComplaintMutation,
} from "./complaintsApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

// BUG: const EditComplaintForm = (complaint, users)
// Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component.
// Reason: the input value is initially undefined and then set to a defined value, which causes it to become a controlled input. This can happen if the component's state is not initialized properly or if the value of the input is not properly set in the component's state.
// !Learn: curly braces {} -> to destructure the passed object

const EditComplaintForm = ({ complaint, users }) => {
  const { isManager, isAdmin } = useAuth();
  // Define state variables for the update and delete mutations
  const [updateComplaint, { isLoading, isSuccess, isError, error }] =
    useUpdateComplaintMutation();

  const [
    deleteComplaint,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteComplaintMutation();

  // Define a navigate variable using the useNavigate hook from react-router-dom
  const navigate = useNavigate();

  // Define state variables for the form fields
  const [title, setTitle] = useState(complaint.title);
  const [text, setText] = useState(complaint.text);
  const [completed, setCompleted] = useState(complaint.completed);
  const [userId, setUserId] = useState(complaint.user);

  // Use an effect to navigate to the complaints page when the update or delete mutations are successful
  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/complaints");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  // Define functions to handle changes to the form fields
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onCompletedChanged = (e) => setCompleted((prev) => !prev);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  // Determine if the form can be saved
  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  // Handle the save complaint click event
  const onSaveComplaintClicked = async (e) => {
    if (canSave) {
      await updateComplaint({
        id: complaint.id,
        user: userId,
        title,
        text,
        completed,
      });
    }
  };

  // Handle the delete complaint click event
  const onDeleteComplaintClicked = async () => {
    await deleteComplaint({ id: complaint.id });
  };

  // Format the created and updated dates
  const created = new Date(complaint.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(complaint.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  // DEBUG
  // check type of users -> object
  // console.log("Debug: ", typeof users);
  // check users is object or array
  // only array can be used with map()
  // if (Array.isArray(users)) {
  //   console.log("users is an array");
  // } else {
  //   console.log("users is not an array");
  // }

  // const options = users.map((user) =>
  // Bug: users.map is not a function

  // const users = {
  //   user1: { id: 1, username: "Alice" },
  //   user2: { id: 2, username: "Bob" },
  //   user3: { id: 3, username: "Charlie" }
  // };
  // Object.keys(users) returns an array of the keys of the users object, which are the strings "user1", "user2", and "user3"
  // map() to iterate over that array, and for each key, we get the corresponding user object using users[key]

  const options = Object.keys(users).map((key) => {
    const user = users[key];
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  // variable that holds the string value, false if empty string
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validTextClass = !text ? "form__input--incomplete" : "";

  // NO Need
  // const validUserIdClass = !Boolean(users.userId)
  //   ? "form__input--incomplete"
  //   : "";

  // ?? = when return null, "" is the backup return
  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  let deleteButton = null;
  // 11.10
  // only manager / admin can get access to delete button
  if (isManager || isAdmin) {
    deleteButton = (
      <button
        className="icon-button"
        title="Delete"
        onClick={onDeleteComplaintClicked}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    );
  }

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Complaint #</h2>
          {/* TOBE
          <h2>Edit Complaint #{complaint.ticket}</h2> */}
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveComplaintClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            {/* Delete exists, but accessible only to certain roles */}
            {deleteButton}
          </div>
        </div>
        <label className="form__label" htmlFor="complaint-title">
          Title:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="complaint-title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        <label className="form__label" htmlFor="complaint-text">
          Text:
        </label>
        <textarea
          className={`form__input form__input--text ${validTextClass}`}
          id="complaint-text"
          name="text"
          value={text}
          onChange={onTextChanged}
        />
        <div className="form__row">
          <div className="form__divider">
            <label
              className="form__label form__checkbox-container"
              htmlFor="complaint-completed"
            >
              WORK COMPLETE:
              <input
                className="form__checkbox"
                id="complaint-completed"
                name="completed"
                type="checkbox"
                checked={completed}
                onChange={onCompletedChanged}
              />
            </label>

            <label
              className="form__label form__checkbox-container"
              htmlFor="complaint-username"
            >
              SUBMITTED BY
            </label>
            <select
              id="complaint-username"
              name="username"
              className="form__select"
              value={userId}
              onChange={onUserIdChanged}
            >
              {options}
            </select>
          </div>
          <div className="form__divider">
            <p className="form__created">
              Created:
              <br />
              {created}
            </p>
            <p className="form__updated">
              Updated:
              <br />
              {updated}
            </p>
          </div>
        </div>
      </form>
    </>
  );

  return content;
};

export default EditComplaintForm;
