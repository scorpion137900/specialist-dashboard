/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../../utils/constants";
const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/User`,
  }),
  endpoints(builder) {
    return {
      getAllUsers: builder.query({
        providesTags: ["users"],
        query: () => {
          return {
            url: `/GetAllUsers`,
            method: "GET",
          };
        },
      }),

      editUserStatus: builder.mutation({
        invalidatesTags: ["users"],
        query({ id, flag }) {
          return {
            url: `/EditUserStatus?id=${id}&Flag=${flag}`,
            method: "PUT",
          };
        },
      }),
    };
  },
});
export { usersApi };
export const {
  useGetAllUsersQuery,
  useEditUserStatusMutation,
  //   useGetStaffVideosQuery,
  //   useAddVideoMutation,
  //   useDeleteVideoMutation,
  //   useUpdateVideoMutation,
  //   useLazySearchVideosQuery,
} = usersApi;
