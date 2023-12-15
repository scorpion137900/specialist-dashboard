/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../../utils/constants";
const articleApi = createApi({
  reducerPath: "Articles",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/Article`,
  }),
  endpoints(builder) {
    return {
      getAllArticles: builder.query({
        providesTags: ["Articles"],
        query: ({ page, rowsPerPage }) => {
          return {
            url: `/GetAllArticle?page=${page + 1}&pageSize=${rowsPerPage}`,
            method: "GET",
            // body:{
            //   page:page,
            //   pageSize:rowsPerpage
            // }
          };
        },
      }),
      getStaffArticles: builder.query({
        providesTags: ["Articles"],
        query: (id) => {
          return {
            url: `/GetStaffArticle?Id=${id}`,
            method: "GET",
            // body:{
            //   page:page,
            //   pageSize:rowsPerpage
            // }
          };
        },
      }),
      addArticle: builder.mutation({
        invalidatesTags: ["Articles"],
        query(formData) {
          return {
            url: "/AddArticle",
            method: "POST",
            body: formData,
          };
        },
      }),
      updateArticle: builder.mutation({
        invalidatesTags: ["Articles", "GetArticleContent"],

        query(formData) {
          return {
            url: "/UpdateArticle",
            method: "PUT",
            body: formData,
          };
        },
      }),
      getArticle: builder.query({
        providesTags: ["GetArticleContent"],
        query(id) {
          return {
            url: `/GetArticleContent?ArticleId=${id}`,
            method: "GET",
          };
        },
      }),
      searchArticle: builder.query({
        query({ title, staffName }) {
          return {
            url: `/SearchArticle?title=${title}&StaffName=${staffName}`,
            method: "GET",
          };
        },
      }),
      deleteArticle: builder.mutation({
        invalidatesTags: ["Articles"],
        query(id) {
          return {
            url: `/DeleteArticle?ArticleId=${id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});
export { articleApi };
export const {
  useGetAllArticlesQuery,
  useAddArticleMutation,
  useDeleteArticleMutation,
  useUpdateArticleMutation,
  useGetArticleQuery,
  useLazySearchArticleQuery,
  useGetStaffArticlesQuery,
} = articleApi;
