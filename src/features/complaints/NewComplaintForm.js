import React from "react";
import { useState, useEffect } from "react";
import { useAddNewComplaintMutation } from "./complaintsApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

// users -> linked with NewComplaint
// !Learn -> {} = object destructuring syntax
// {users} = extract object -> assign to variable
const NewComplaintForm = ({ users }) => {
  // DEBUG = users[0] = undefined
  // console.log("users[0]:", users[0]);

  const [addNewComplaint, { isLoading, isSuccess, isError, error }] =
    useAddNewComplaintMutation();

  const navigate = useNavigate();

  // NOT username, validUsername
  // access to Model
  const [userId, setUserId] = useState(users[0].id);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setUserId("");
      setTitle("");
      setText([]);
      navigate("/dash/complaints");
    }
  }, [isSuccess, navigate]);

  // event handlers that update the state variables title, text, and userid, respectively, based on changes made by the user to the corresponding input fields in the form
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveComplaintClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewComplaint({ user: userId, title, text });
    }
  };

  // const options = users.values().map((user) => {
  const options = Object.keys(users).map((key) => {
    const user = users[key];
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  // variable that holds the string value, false if empty string
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validTextClass = !text ? "form__input--incomplete" : "";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>
      <form className="form" onSubmit={onSaveComplaintClicked}>
        <div className="form__title-row">
          <h2>New Complaint</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="title">
          Title:
        </label>
        <input
          // NOT ${title}
          className={`form__input ${validTitleClass}`}
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        <label className="form__label" htmlFor="text">
          Text:
        </label>
        {/* input = 1 line,  textarea = n lines */}
        <textarea
          className={`form__input form__input--text ${validTextClass}`}
          id="text"
          name="text"
          type="text"
          autoComplete="off"
          value={text}
          onChange={onTextChanged}
        />

        <label
          className="form__label form__checkbox-container"
          htmlFor="username"
        >
          SUBMITTED BY:
        </label>
        <select
          id="username"
          name="username"
          className="form__select"
          value={userId}
          onChange={onUserIdChanged}
        >
          {options}
        </select>
      </form>
    </>
  );
  return content;
};

export default NewComplaintForm;
