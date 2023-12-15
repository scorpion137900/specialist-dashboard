import { Box, Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ArticlesTable from "../components/Articles/ArticlesTable";
import CustomSkeleton from "../components/CustomSkeleton";
import { useNavigate } from "react-router-dom";
import {
  useGetAllArticlesQuery,
  useLazySearchArticleQuery,
} from "../store/features/articles/articlesApi";
import { notifyError } from "../utils/helper";
import ArticlesSearch from "../components/Articles/ArticlesSearch";
import SearchedTable from "../components/Articles/SearchedTable";

const Articles = () => {
  // const { isLoading, articles } = useSelector((state) => state.articles);
  const [isSearchedArticleShowed, setIsSearchedArticleShowed] = useState(false);
  const [
    trigger,
    { data: searchedArticles, error, isFetching: isFetchingSearch },
  ] = useLazySearchArticleQuery();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { data, isFetching, isError } = useGetAllArticlesQuery({
    page,
    rowsPerPage,
  });
  const articles = data?.result?.articles;
  const articlesTotalCount = data?.result?.articlesTotalCount;
  // console.log(articles,articlesTotalCount)
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  console.log(searchedArticles?.result?.filteredArticles);
  const filterdArticles = searchedArticles?.result?.filteredArticles;
  if (isError) notifyError("Error while fetching articles");
  if (error) notifyError("Error while searching articles");
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pb: "100px ",
          pt: "100px",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            background: "var(--light-color)",
            boxShadow: "var(--shadow-1)",
            p: "20px",
            width: "100%",
          }}
        >
          <ArticlesSearch
            trigger={trigger}
            setIsSearchedArticleShowed={setIsSearchedArticleShowed}
          />
          {isFetching || isFetchingSearch ? (
            <CustomSkeleton />
          ) : isSearchedArticleShowed ? (
            filterdArticles.length > 0 ? (
              <SearchedTable articles={filterdArticles} />
            ) : (
              <Box
                sx={{
                  minHeight: "350px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h5">There is no Results</Typography>
              </Box>
            )
          ) : articlesTotalCount > 0 ? (
            <ArticlesTable
              rows={articles}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              articlesTotalCount={articlesTotalCount}
            />
          ) : (
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold" }}
              textAlign={"center"}
            >
              There is no Articles
            </Typography>
          )}
          {/* 
          <Button
            sx={{ mt: "30px" }}
            color="success"
            variant="contained"
            onClick={() => navigate("/articles/add-article")}
          >
            اضافة مقالة
          </Button> */}
        </Box>
      </Box>
    </>
  );
};

export default Articles;
