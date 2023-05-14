// 10.9
// purpose of this component is to verify whether the user has a valid token to access protected routes or not.
// help us remain logged in even when we refresh our application

import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const PersistLogin = () => {
  // Get the persist value from local storage
  const [persist] = usePersist();

  // Get the token from the Redux store
  const token = useSelector(selectCurrentToken);

  // A ref to keep track of whether the useEffect has run before
  const effectRan = useRef(false);

  // A state variable to keep track of whether the refresh token request was successful
  const [trueSuccess, setTrueSuccess] = useState(false);

  // Call the useRefreshMutation hook to get the refresh function and its state (refresh the user's access token)
  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    // If the effect has run before or the environment is not in development mode
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode
      // Call the verifyRefreshToken function if there is no token and there is a persist value
      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          // Call the verifyRefreshToken function if there is no token and there is a persist value
          // const response =
          await refresh();
          // const { accessToken } = response.data
          // Set trueSuccess to true if the refresh token request was successful
          // indicate that the user has a valid token
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };
      // Call verifyRefreshToken if no token and with a persist value
      // when refresh, no token
      if (!token && persist) verifyRefreshToken();
    }
    // Set the effectRan ref to true
    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  let content;
  // If there is no persist value, render the Outlet component
  if (!persist) {
    // persist: no
    console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {
    //persist: yes, token: no
    // If the refresh token request is loading, render a "Loading..." message
    console.log("loading");
    content = <p>Loading...</p>;
  } else if (isError) {
    //persist: yes, token: no
    // If there is an error with the refresh token request, render an error message with a link to the login page
    console.log("error");
    // refresh token expires, status 403
    content = (
      <p className="errmsg">
        {`${error.data?.message} - `}
        <Link to="/login">Please login again</Link>.
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    // If the refresh token request was successful and trueSuccess is true, render the Outlet component
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    // If there is a token and the state is uninitialized, render the Outlet component
    console.log("token and uninit");
    console.log(isUninitialized);
    content = <Outlet />;
  }
  // Return the content variable
  return content;
};
export default PersistLogin;
