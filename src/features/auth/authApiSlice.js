import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials } from "./authSlice";

// Define a new API slice for authentication
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define a `login` mutation that sends a POST request to the `/auth` endpoint
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        // body of HTTP request will contain all the key-value pairs from the credentials object.
        body: { ...credentials },
      }),
    }),
    // Define a `sendLogout` mutation that sends a POST request to the `/auth/logout` endpoint
    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      // Define an `onQueryStarted` callback function that will be called when the mutation is started
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          // Wait for the query to be fulfilled and extract the data from the response
          const { data } = await queryFulfilled;
          console.log(data);
          // Dispatch the `logOut` action from the `authSlice` to update the authentication state
          dispatch(logOut());
          // Reset the API state after 1 second to clear any cached data
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000); //1s
        } catch (err) {
          console.log(err);
        }
      },
    }),
    // Define a `refresh` mutation that sends a GET request to the `/auth/refresh` endpoint
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      // Define an `onQueryStarted` callback function that will be called when the mutation is started
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          // Wait for the query to be fulfilled and extract the data from the response
          const { data } = await queryFulfilled;
          console.log(data);
          // Extract the new `accessToken` from the response and dispatch the `setCredentials` action from the `authSlice` to update the authentication state
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } =
  authApiSlice;
