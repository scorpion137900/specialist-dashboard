import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CustomBox from "../CustomBox";
import { useGetStaffFilesQuery } from "../../store/features/files/filesApi";
import { notifyError } from "../../utils/helper";
import CustomSkeleton from "../CustomSkeleton";
import SearchedTable from "./SearchedTable";
import FileViewer from "./FileViewer";
import DeleteFile from "./DeleteFile";
import { useFilesContext } from "../../Context/Files";

const staffFiles = () => {
  const { user } = useSelector((state) => state.auth);

  const {
    data: files,
    isFetching,
    isError,
  } = useGetStaffFilesQuery(user?.staffId);
  useEffect(() => {
    if (isError) notifyError("Error while fetching articles");
  }, [isError]);
  const {
    openView,
    setOpenView,
    openDelete,
    setOpenDelete,
    selectedDeleted,
    setSelectedDeleted,
    selectedViewerFile,
    setSelectedViewerFile,
  } = useFilesContext();
  return (
    <>
      <CustomBox>
        {isFetching ? (
          <CustomSkeleton />
        ) : files?.result?.length > 0 ? (
          <SearchedTable rows={files?.result} />
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
      </CustomBox>
      <FileViewer
        open={openView}
        setOpen={setOpenView}
        selectedViewerFile={selectedViewerFile}
        setSelectedViewerFile={setSelectedViewerFile}
      />
      <DeleteFile
        open={openDelete}
        setOpen={setOpenDelete}
        deletedItem={selectedDeleted}
        setDeletedItem={setSelectedDeleted}
      />
    </>
  );
};

export default staffFiles;
