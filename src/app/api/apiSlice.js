import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// https://redux-toolkit.js.org/rtk-query/api/createApi
// createApi() = allows you to define a set of "endpoints" that describe how to retrieve data from backend APIs
// connection with frontend and backend
// https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery
// a small wrapper around fetch that aims to simplify HTTP requests
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  tagTypes: ["Complaint", "User"],
  endpoints: (builder) => ({}),
});
