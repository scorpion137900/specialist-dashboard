/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../../utils/constants";
const staffUserApi = createApi({
  reducerPath: "staffusers",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/StaffUser`,
  }),
  endpoints(builder) {
    return {
      getAllStaffUsers: builder.query({
        providesTags: ["staffUser"],
        query: () => {
          return {
            url: `/GetStaff`,
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
export { staffUserApi };
export const { useGetAllStaffUsersQuery } = staffUserApi;
