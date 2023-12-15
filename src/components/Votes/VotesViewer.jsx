import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomBox from "../CustomBox";
import { useGetStaffReportsQuery } from "../../store/features/reports/reportsApi";

// import DeleteReportConfirm from "./DeleteReportConfirm";
import CustomSkeleton from "../CustomSkeleton";
import { Box, Button, Typography } from "@mui/material";

// import ReportsTable from "./ReportsTable";
// import { useReportsContext } from "../../Context/Reports";
import { notifyError } from "../../utils/helper";
import { useGetPatientVotesByStaffIdQuery } from "../../store/features/votes/votes";
import VotesTable from "./VotesTable";
import DeleteVoteConfirm from "./DeleteVoteConfirm";
import { useVotesContext } from "../../Context/Votes";
import Vote from "./Vote";

const VotesViewer = ({ propId }) => {
  const { id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    if (!id && !propId) navigate("/");
  }, [id]);
  const { data, isError, isFetching } = useGetPatientVotesByStaffIdQuery(
    id || propId
  );

  const { openDelete, setOpenDelete, deletedItem, setDeletedItem, openView } =
    useVotesContext();

  useEffect(() => {
    if (isError) notifyError("Failed to Get Votes");
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
                <VotesTable rows={data?.result} />
              </Box>
              {openView && <Vote vote={openView} />}
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
                No Votes Found For This Staff{" "}
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

      <DeleteVoteConfirm
        open={openDelete}
        setOpen={setOpenDelete}
        deletedItem={deletedItem}
        setDeletedItem={setDeletedItem}
      />
    </>
  );
};

export default VotesViewer;
