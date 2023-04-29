// component that uses the useEffect hook to fetch data from two API endpoints, getComplaints and getUsers which are defined using createApi from reduxjs
// why this file is needed?
// create active subscription remains active at EditUser
// create a subscription that lasts for the duration of our protected pages

import { store } from "../../app/store";
import { complaintsApiSlice } from "../complaints/complaintsApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");
    // when component mounts, it dispatches the initiate method of the getComplaints and getUsers endpoints, which triggers a network request to fetch data from the server.
    // store.dispatch method is used to dispatch these actions.
    const complaints = store.dispatch(
      complaintsApiSlice.endpoints.getComplaints.initiate()
    );
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    return () => {
      console.log("unsubscribing");
      // when component unmounts, the unsubscribe method is called on each of the requests, which cancels any pending requests and cleans up any resources associated with them.
      complaints.unsubscribe();
      users.unsubscribe();
    };
    // [], no dependencies for the effect, so it will only run once on mount and not be re-run if any of the dependencies change.
  }, []);

  return <Outlet />;
};
export default Prefetch;
