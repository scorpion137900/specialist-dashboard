import { Box, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useVideosContext } from "../../Context/Videos";
import { useGetStaffVideosQuery } from "../../store/features/videos/videos";
import CustomSkeleton from "../CustomSkeleton";
import DeleteDialog from "./DeleteDialog";
import SearchedTable from "./SearchedTable";

const StaffVideos = () => {
  const [open, setOpen] = useState(false);
  const { openDelete, setOpenDelete, deletedItem, setDeletedItem } =
    useVideosContext();
  const { user } = useSelector((state) => state.auth);
  const { data: staffVideos, isFetching } = useGetStaffVideosQuery(
    user?.staffId
  );
  return (
    <>
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
          ) : (
            <>
              {" "}
              {staffVideos?.result.length > 0 ? (
                <SearchedTable videos={staffVideos?.result} />
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
                    There is No Videos for this Staff Add one
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
      <DeleteDialog
        open={openDelete}
        setOpen={setOpenDelete}
        setDeletedVideo={setDeletedItem}
        deletedVideo={deletedItem}
      />
    </>
  );
};

export default StaffVideos;
