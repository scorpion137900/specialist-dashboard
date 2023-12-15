/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../../utils/constants";
const reportsApi = createApi({
  reducerPath: "reports",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/SessionReports`,
  }),
  endpoints(builder) {
    return {
      getAllReports: builder.query({
        providesTags: ["reports"],
        query: () => {
          return {
            url: `/GetAllSessionReports`,
            method: "GET",
          };
        },
      }),
      getStaffReports: builder.query({
        providesTags: ["reports"],
        query: (staffId) => {
          return {
            url: `/GetStaffSessionReports?staffId=${staffId}`,
            method: "GET",
          };
        },
      }),
      addReport: builder.mutation({
        invalidatesTags: ["reports"],
        query(data) {
          return {
            url: "/AddSessionReports",
            method: "POST",
            body: data,
          };
        },
      }),
      editReport: builder.mutation({
        invalidatesTags: ["reports"],
        query(data) {
          return {
            url: `/EditSessionReports?SessionReportsId=${data?.id}`,
            method: "PUT",
            body: data,
          };
        },
      }),

      deleteReport: builder.mutation({
        invalidatesTags: ["reports"],
        query(id) {
          return {
            url: `/DeleteSessionReports?sessionReportsId=${id}`,
            method: "DELETE",
          };
        },
      }),
      //  searchFiles: builder.mutation({
      //    query(query) {
      //      return {
      //        url: `/FileSearch`,
      //        method: "Post",
      //        body: query,
      //      };
      //    },
      //  }),
    };
  },
});
export { reportsApi };
export const {
  useGetAllReportsQuery,
  useAddReportMutation,
  useGetStaffReportsQuery,
  useDeleteReportMutation,
  useEditReportMutation,
} = reportsApi;
