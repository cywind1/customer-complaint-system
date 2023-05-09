import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";

// https://redux-toolkit.js.org/rtk-query/api/createApi
// createApi() = allows you to define a set of "endpoints" that describe how to retrieve data from backend APIs
// connection with frontend and backend
// https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery
// a small wrapper around fetch that aims to simplify HTTP requests

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500",
  // for HTTP secure cookies
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions);

  // If you want, handle other status codes, too
  if (result?.error?.status === 403) {
    console.log("sending refresh token");

    // send refresh token to get new access token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired. ";
      }
      return refreshResult;
    }
  }
  return result;
};

// fetchBaseQuery({ baseUrl: "http://localhost:3500" }) => baseQueryWithReauth,
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Complaint", "User"],
  endpoints: (builder) => ({}),
});
