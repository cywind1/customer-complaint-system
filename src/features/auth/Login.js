// rafce
import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
// Define Login component
const Login = () => {
  // Define component-level state and references
  const userRef = useRef(); // Ref for the username input element
  const errRef = useRef();
  const [username, setUsername] = useState(""); // State for the username input value
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  // Define necessary hooks and Redux store reference
  const navigate = useNavigate(); // Hook for programmatic navigation
  const dispatch = useDispatch(); // Reference to the Redux store's dispatch function
  const [login, { isLoading }] = useLoginMutation(); // Hook for making API login request

  // Set focus on the username input element on mount
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // Clear error message on username or password change
  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  // Handle form submission on button click or "Enter" keypress
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default (page reload on form submission)
    try {
      // Send login request to API and retrieve access token
      const { accessToken } = await login({ username, password }).unwrap();
      // Dispatch action to update Redux store with access token
      dispatch(setCredentials({ accessToken }));
      // Clear input values and navigate to dashboard
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      // Handle different error scenarios and set error message accordingly
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus(); // Set focus on error message element for accessibility
    }
  };

  // Handle username input change
  const handleUserInput = (e) => setUsername(e.target.value);
  // Handle password input change
  const handlePwdInput = (e) => setPassword(e.target.value);
  // Set error message class based on whether or not there is an error message to display
  const errClass = errMsg ? "errmsg" : "offscreen";

  // If API login request is loading, display loading text
  if (isLoading) return <p>Loading...</p>;

  // Define the JSX content to be rendered
  const content = (
    <section className="public">
      <header>
        <h1>User Login</h1>
      </header>
      <main className="login">
        <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            className="form__input"
            type="text"
            id="username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            className="form__input"
            type="password"
            id="password"
            onChange={handlePwdInput}
            value={password}
            required
          />
          <button className="form__submit-button">Sign In</button>
        </form>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );

  return content;
};
export default Login;
