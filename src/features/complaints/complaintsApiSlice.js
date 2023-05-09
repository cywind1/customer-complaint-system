// createSelector is used to create memoized selectors, which are functions that take one or more pieces of state from the Redux store and return a derived value based on that state.

// createEntityAdapter -> can easily create a set of reducer functions for a specific entity, such as a user or post, that can handle adding, updating, and deleting entities.
// adapter functions = addOne, removeOne, updateOne, etc.
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const complaintsAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

// getInitialState() = older versions of React to define the initial state of a component
// new React: component's state is defined in the constructor using this.state
const initialState = complaintsAdapter.getInitialState();

export const complaintsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComplaints: builder.query({
      query: () => "/complaints",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      // Once the subscription is removed (e.g. when last component subscribed to the data unmounts), after an amount of time (default 60 seconds), the data will be removed from the cache.
      // keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedComplaints = responseData.map((complaint) => {
          complaint.id = complaint._id;
          return complaint;
        });
        return complaintsAdapter.setAll(initialState, loadedComplaints);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Complaint", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Complaint", id })),
          ];
        } else return [{ type: "Complaint", id: "LIST" }];
      },
    }),
    // 7_different operations
    addNewComplaint: builder.mutation({
      query: (initialComplaint) => ({
        url: "/complaints",
        method: "POST",
        body: {
          ...initialComplaint,
        },
      }),
      invalidatesTags: [{ type: "Complaint", id: "LIST" }],
    }),
    updateComplaint: builder.mutation({
      query: (initialComplaint) => ({
        url: "/complaints",
        method: "PATCH",
        body: {
          ...initialComplaint,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Complaint", id: arg.id },
      ],
    }),
    deleteComplaint: builder.mutation({
      query: ({ id }) => ({
        url: `/complaints`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Complaint", id: arg.id },
      ],
    }),
    // --end of operations --
  }),
});

export const {
  useGetComplaintsQuery,
  useAddNewComplaintMutation,
  useUpdateComplaintMutation,
  useDeleteComplaintMutation,
} = complaintsApiSlice;

// returns the query result object
export const selectComplaintsResult =
  complaintsApiSlice.endpoints.getComplaints.select();

// creates memorized selector
const selectComplaintsData = createSelector(
  selectComplaintsResult,
  (complaintsResult) => complaintsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllComplaints,
  selectById: selectComplaintById,
  selectIds: selectComplaintIds,
  // Pass in a selector that returns the complaints slice of state
} = complaintsAdapter.getSelectors(
  (state) => selectComplaintsData(state) ?? initialState
);
