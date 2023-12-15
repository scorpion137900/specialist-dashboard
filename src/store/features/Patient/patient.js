/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../../utils/constants";
const patientApi = createApi({
  reducerPath: "patients",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/PatientUser`,
  }),
  endpoints(builder) {
    return {
      getAllPatients: builder.query({
        providesTags: ["Patients"],
        query: () => {
          return {
            url: `/GetPatients`,
            method: "GET",
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
export { patientApi };
export const { useGetAllPatientsQuery } = patientApi;
