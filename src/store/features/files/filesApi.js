/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../../utils/constants";
const filesApi = createApi({
  reducerPath: "files",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/FileStaff`,
  }),
  endpoints(builder) {
    return {
      getAllFiles: builder.query({
        providesTags: ["files"],
        query: ({ page, pageSize }) => {
          return {
            url: `/GetAllFiles?page=${page + 1}&pageSize=${pageSize}`,
            method: "GET",
          };
        },
      }),
      getStaffFiles: builder.query({
        providesTags: ["files"],
        query: (staffId) => {
          return {
            url: `/GetStaffFiles?staffId=${staffId}`,
            method: "GET",
          };
        },
      }),
      addFile: builder.mutation({
        invalidatesTags: ["files"],
        query(data) {
          return {
            url: "/AddFile",
            method: "POST",
            body: data,
          };
        },
      }),
      updateFile: builder.mutation({
        invalidatesTags: ["files"],
        query(data) {
          return {
            url: "/UpdateFile",
            method: "PUT",
            body: data,
          };
        },
      }),

      deleteFile: builder.mutation({
        invalidatesTags: ["files"],
        query(fileId) {
          return {
            url: `/DeleteFile?fileId=${fileId}`,
            method: "DELETE",
          };
        },
      }),
      searchFiles: builder.mutation({
        query(query) {
          return {
            url: `/FileSearch`,
            method: "Post",
            body: query,
          };
        },
      }),
    };
  },
});
export { filesApi };
export const {
  useGetAllFilesQuery,
  useGetStaffFilesQuery,
  useDeleteFileMutation,
  useUpdateFileMutation,
  useAddFileMutation,
  useSearchFilesMutation,
} = filesApi;
