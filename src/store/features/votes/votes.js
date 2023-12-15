/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../../utils/constants";
const votesApi = createApi({
  reducerPath: "PatientVotes",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/PatientVotes`,
  }),
  endpoints(builder) {
    return {
      getAllpatientVotes: builder.query({
        providesTags: ["votes"],
        query: () => {
          return {
            url: `/GetAllpatientVotes`,
            method: "GET",
          };
        },
      }),
      getPatientVotesByStaffId: builder.query({
        providesTags: ["votes"],
        query: (staffId) => {
          return {
            url: `/GetPatientVotesByStaffId?staffId=${staffId}`,
            method: "GET",
          };
        },
      }),
      deletePatientVotes: builder.mutation({
        invalidatesTags: ["votes"],
        query: (id) => {
          return {
            url: `/DeletePatientVotes?PatientVotes=${id}`,
            method: "DELETE",
          };
        },
      }),
      //  editUserStatus: builder.mutation({
      //    invalidatesTags: ["Patients"],
      //    query({ id, flag }) {
      //      return {
      //        url: `/EditUserStatus?id=${id}&Flag=${flag}`,
      //        method: "PUT",
      //      };
      //    },
      //  }),
    };
  },
});
export { votesApi };
export const {
  useGetAllpatientVotesQuery,
  useGetPatientVotesByStaffIdQuery,
  useDeletePatientVotesMutation,
} = votesApi;
