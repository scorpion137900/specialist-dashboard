import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetStaffArticlesQuery } from "../../store/features/articles/articlesApi";
import { notifyError } from "../../utils/helper";
import CustomSkeleton from "../CustomSkeleton";
import SearchedTable from "./SearchedTable";

const StaffArticles = () => {
  const { user } = useSelector((state) => state.auth);

  const {
    data: articles,
    isFetching,
    isError,
  } = useGetStaffArticlesQuery(user?.staffId);
  useEffect(() => {
    if (isError) notifyError("Error while fetching articles");
  }, [isError]);
  return (
    <Box
      sx={{
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
    >
      <Box
        sx={{
          boxShadow: "var(--shadow-1)",
          background: "var(--light-color)",
          p: "20px",
        }}
      >
        {isFetching ? (
          <CustomSkeleton />
        ) : articles?.result?.length > 0 ? (
          <SearchedTable articles={articles?.result} />
        ) : (
          <Box
            sx={{
              minHeight: "350px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5">
              There is no Articles For This Staff
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default StaffArticles;
