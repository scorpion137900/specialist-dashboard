/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../../utils/constants";
const videoTypesApi = createApi({
  reducerPath: "videoTypes",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/VideoType`,
  }),
  endpoints(builder) {
    return {
      getAllTypes: builder.query({
        providesTags: ["videoTypes"],
        query: () => {
          return {
            url: `/GetAllVideoTypes`,
            method: "GET",
          };
        },
      }),
      deleteType: builder.mutation({
        invalidatesTags: ["videoTypes"],
        query: (videoTypeId) => {
          return {
            url: `/DeleteVideoType/${videoTypeId}`,
            method: "DELETE",
          };
        },
      }),
      addType: builder.mutation({
        invalidatesTags: ["videoTypes"],
        query: (data) => {
          return {
            url: `/AddVideoType`,
            method: "POST",
            body: data,
          };
        },
      }),
      editType: builder.mutation({
        invalidatesTags: ["videoTypes"],
        query: (data) => {
          return {
            url: `/UpdateVideoType`,
            method: "PUT",
            body: data,
          };
        },
      }),
    };
  },
});
export { videoTypesApi };
export const {
  useGetAllTypesQuery,
  useDeleteTypeMutation,
  useAddTypeMutation,
  useEditTypeMutation,
} = videoTypesApi;
