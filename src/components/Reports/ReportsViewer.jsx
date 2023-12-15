import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomBox from "../CustomBox";
import { useGetStaffReportsQuery } from "../../store/features/reports/reportsApi";
import Report from "./Report";
import DeleteReportConfirm from "./DeleteReportConfirm";
import CustomSkeleton from "../CustomSkeleton";
import { Box, Button, Typography } from "@mui/material";
import IsLoadingMessage from "../IsLoadingMessage";
import ReportsTable from "./ReportsTable";
import { useReportsContext } from "../../Context/Reports";
import { notifyError } from "../../utils/helper";

const ReportsViewer = ({ propId }) => {
  const { id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    if (!id && !propId) navigate("/");
  }, [id]);
  const { data, isError, isFetching } = useGetStaffReportsQuery(id || propId);

  const {
    openDelete,
    setOpenDelete,
    deletedItem,
    setDeletedItem,
    updatedItem,
    openView,
  } = useReportsContext();

  useEffect(() => {
    if (isError) notifyError("Failed to Get Reports");
  }, [isError]);

  // const [edited, setEdited] = useState(false);
  return (
    <>
      {isFetching ? (
        <CustomSkeleton />
      ) : (
        <>
          {data?.result?.length > 0 ? (
            <>
              <Box
                sx={{
                  padding: "20px",
                  marginBottom: "20px",
                  background: "#fff",
                }}
              >
                <ReportsTable rows={data?.result} />
              </Box>
              {(updatedItem || openView) && <Report report={updatedItem} />}
              {/* {data?.result?.map((item) => (
                <Report
                  key={item?.id}
                  report={item}
                  setOpen={setOpenDelete}
                  setDeletedItem={setDeletedItem}
                  setEdited={setEdited}
                />
              ))} */}
            </>
          ) : (
            <Box
              sx={{
                minHeight: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#fff",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <Typography variant="h5">
                No Reports Found For This Staff{" "}
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() => navigate(-1)}
              >
                Back{" "}
              </Button>
            </Box>
          )}
        </>
      )}

      <DeleteReportConfirm
        open={openDelete}
        setOpen={setOpenDelete}
        deletedItem={deletedItem}
        setDeletedItem={setDeletedItem}
      />
    </>
  );
};

export default ReportsViewer;
