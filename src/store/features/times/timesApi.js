/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../../utils/constants";
const timesApi = createApi({
  reducerPath: "times",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/AvailableTime`,
  }),
  endpoints(builder) {
    return {
      getAllTimes: builder.query({
        providesTags: ["times"],
        query: () => {
          return {
            url: `/GetAllTime`,
            method: "GET",
          };
        },
      }),
      getStaffAllTimes: builder.query({
        providesTags: ["times"],
        query: (staffId) => {
          return {
            url: `/GetStaffAllTime?Id=${staffId}`,
            method: "GET",
          };
        },
      }),
      getAllAvailableTimeByStatus: builder.query({
        invalidatesTags: ["times"],
        query: (status) => {
          return {
            url: `/GetAllAvailableTimeByStatus?status=${status}`,
            method: "GET",
          };
        },
      }),
      addTime: builder.mutation({
        invalidatesTags: ["times"],
        query(data) {
          return {
            url: "/AddTime",
            method: "POST",
            body: data,
          };
        },
      }),
      updateTime: builder.mutation({
        invalidatesTags: ["times"],
        query(data) {
          return {
            url: "/updateTime",
            method: "PUT",
            body: data,
          };
        },
      }),
      updateTimeStatus: builder.mutation({
        // invalidatesTags: ["times"],
        query({ id, flag }) {
          return {
            url: `/EditTimeIsActive?Flag=${flag}&TimeId=${id}`,
            method: "PUT",
          };
        },
      }),

      deleteTime: builder.mutation({
        invalidatesTags: ["times"],
        query(id) {
          return {
            url: `/deleteTime?timeid=${id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});
export { timesApi };
export const {
  useGetAllTimesQuery,
  useAddTimeMutation,
  useDeleteTimeMutation,
  useUpdateTimeMutation,
  useGetStaffAllTimesQuery,
  useLazyGetAllAvailableTimeByStatusQuery,
  useUpdateTimeStatusMutation,
} = timesApi;
