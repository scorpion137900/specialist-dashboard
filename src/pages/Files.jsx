import { Box, Typography } from "@mui/material";
import React from "react";
import CustomBox from "../components/CustomBox";
import AllFilesTable from "../components/Files/AllFilesTable";
import { useNavigate } from "react-router-dom";
import CustomSkeleton from "../components/CustomSkeleton";
import {
  useGetAllFilesQuery,
  useSearchFilesMutation,
} from "../store/features/files/filesApi";
import { useEffect } from "react";
import { notifyError } from "../utils/helper";
import FileSearch from "../components/Files/FileSearch";
import { useState } from "react";
import SearchedTable from "../components/Files/SearchedTable";

const Files = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data, isFetching, isError } = useGetAllFilesQuery({
    page: page,
    pageSize: rowsPerPage,
  });

  const [searchFiles, searchFilesResult] = useSearchFilesMutation();
  const [isSearchShow, setIsSearchShow] = useState(false);

  useEffect(() => {
    if (isError) notifyError("Failed To Fetch");
  }, [isError]);

  return (
    <CustomBox>
      <FileSearch trigger={searchFiles} setIsSearchShow={setIsSearchShow} />
      {isFetching || searchFilesResult?.isLoading ? (
        <CustomSkeleton />
      ) : isSearchShow ? (
        <SearchedTable rows={searchFilesResult?.data?.result} />
      ) : data?.result?.videosTotalCount > 0 ? (
        <AllFilesTable
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          rows={data?.result?.videos}
          totalCount={data?.result?.videosTotalCount}
        />
      ) : (
        <Typography> There is No Files</Typography>
      )}
    </CustomBox>
  );
};

export default Files;
