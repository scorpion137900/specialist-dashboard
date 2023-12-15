/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../../utils/constants";
const specialitiesApi = createApi({
  reducerPath: "specialities",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/Specialities`,
  }),
  endpoints(builder) {
    return {
      getAllSpecialities: builder.query({
        providesTags: ["specialities"],
        query: () => {
          return {
            url: `/GetAllSpecialities`,
            method: "GET",
          };
        },
      }),
      addSpecialitise: builder.mutation({
        invalidatesTags: ["specialities"],
        query(data) {
          return {
            url: "/AddSpecialitie",
            method: "POST",
            body: data,
          };
        },
      }),
      updateSpecialitise: builder.mutation({
        invalidatesTags: ["specialities"],
        query(data) {
          return {
            url: "/UpdateSpecialitie",
            method: "PUT",
            body: data,
          };
        },
      }),

      deleteSpecialitise: builder.mutation({
        invalidatesTags: ["specialities"],
        query(id) {
          return {
            url: `/DeleteSpecialitie?specialitiesid=${id}`,
            method: "DELETE",
          };
        },
      }),
      searchSpecialitise: builder.query({
        query(specialitiename) {
          return {
            url: `/SearchSpecialitie?specialitiename=${specialitiename}`,
            method: "GET",
          };
        },
      }),
    };
  },
});
export { specialitiesApi };
export const {
  useGetAllSpecialitiesQuery,
  useAddSpecialitiseMutation,
  useDeleteSpecialitiseMutation,
  useUpdateSpecialitiseMutation,
  useLazySearchSpecialitiseQuery,
} = specialitiesApi;
