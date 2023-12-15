/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../../utils/constants";
const bouquetApi = createApi({
  reducerPath: "bouquet",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/Bouquet`,
  }),
  endpoints(builder) {
    return {
      getAllBouquets: builder.query({
        providesTags: ["bouquets"],
        query: () => {
          return {
            url: `/GetAllBouquet`,
            method: "GET",
          };
        },
      }),
      getAllBouquetsType: builder.query({
        invalidatesTags: ["bouquets"],
        query: () => {
          return {
            url: `/GetAllBouquetType`,
            method: "GET",
          };
        },
      }),
      getBouquetUsers: builder.query({
        invalidatesTags: ["bouquets"],
        query: (id) => {
          return {
            url: `/GetBouquetUsers?bouquetId=${id}`,
            method: "GET",
          };
        },
      }),
      addBouquet: builder.mutation({
        invalidatesTags: ["bouquets"],
        query(data) {
          return {
            url: "/AddBouquet",
            method: "POST",
            body: data,
          };
        },
      }),
      updateBouquet: builder.mutation({
        invalidatesTags: ["bouquets"],
        query(data) {
          return {
            url: `/EditBouquet?bouquetId=${data?.id}`,
            method: "PUT",
            body: data.data,
          };
        },
      }),

      deleteBouquet: builder.mutation({
        invalidatesTags: ["bouquets"],
        query(id) {
          return {
            url: `/DeleteBouquet?bouquetId=${id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});
export { bouquetApi };
export const {
  useGetAllBouquetsQuery,
  useGetBouquetUsersQuery,
  useAddBouquetMutation,
  useGetAllBouquetsTypeQuery,
  useDeleteBouquetMutation,
  useUpdateBouquetMutation,
} = bouquetApi;
