/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../../utils/constants";
const videosApi = createApi({
  reducerPath: "videos",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/VideoStaff`,
  }),
  endpoints(builder) {
    return {
      getAllVideos: builder.query({
        providesTags: ["videos"],
        query: ({ page, pageSize }) => {
          return {
            url: `/GetAllVideos?page=${page + 1}&pageSize=${pageSize}`,
            method: "GET",
          };
        },
      }),
      getStaffVideos: builder.query({
        providesTags: ["videos"],
        query: (staffId) => {
          return {
            url: `/GetStaffVideos?staffId=${staffId}`,
            method: "GET",
          };
        },
      }),
      addVideo: builder.mutation({
        invalidatesTags: ["videos"],
        query(data) {
          return {
            url: "/AddStaffVideo",
            method: "POST",
            body: data,
          };
        },
      }),
      updateVideo: builder.mutation({
        invalidatesTags: ["videos"],
        query(data) {
          return {
            url: "/UpdateVideo",
            method: "PUT",
            body: data,
          };
        },
      }),

      deleteVideo: builder.mutation({
        invalidatesTags: ["videos"],
        query(id) {
          return {
            url: `/DeleteVideo?videoId=${id}`,
            method: "DELETE",
          };
        },
      }),
      searchVideos: builder.query({
        query(data) {
          return {
            url: `/VideoSearch?VideoTitle=${data?.VideoTitle}&StaffName=${data?.StaffName}&VideoType=${data?.VideoType}&Specialities=${data?.Specialities}`,
            method: "GET",
          };
        },
      }),
    };
  },
});
export { videosApi };
export const {
  useGetAllVideosQuery,
  useGetStaffVideosQuery,
  useAddVideoMutation,
  useDeleteVideoMutation,
  useUpdateVideoMutation,
  useLazySearchVideosQuery,
} = videosApi;
