import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import CustomSkeleton from "../components/CustomSkeleton";
import VideoTypesTable from "../components/videoTypes/VideoTypesTable";
import { useGetAllTypesQuery } from "../store/features/videoTypes/videoTypes";
import { notifyError } from "../utils/helper";
import AddType from "../components/videoTypes/AddType";

const VideoTypes = () => {
  const { data, isLoading, isError } = useGetAllTypesQuery();
  const [openAdd, setOpenAdd] = React.useState(false);

  useEffect(() => {
    if (isError) notifyError("Failed To Get All Types");
  }, [isError]);
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
          {isLoading ? (
            <CustomSkeleton />
          ) : data?.result?.length > 0 ? (
            <VideoTypesTable
              rows={data?.result}
              openAdd={openAdd}
              setOpenAdd={setOpenAdd}
            />
          ) : (
            <>
              <Typography variant="p" component={"p"}>
                {" "}
                There is No Types
              </Typography>
              <Button
                color="success"
                variant="contained"
                sx={{ my: "20px" }}
                onClick={() => setOpenAdd(true)}
              >
                Add Type
              </Button>
            </>
          )}
          <AddType open={openAdd} setOpen={setOpenAdd} />
        </Box>
      </Box>
    </>
  );
};

export default VideoTypes;
