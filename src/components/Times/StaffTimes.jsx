import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetStaffAllTimesQuery } from "../../store/features/times/timesApi";
import CustomSkeleton from "../CustomSkeleton";
import AddTime from "./AddTime";
import FullTimeCalendar from "./FullTimeCalendar";
import TimesTable from "./TimesTable";

const StaffTimes = () => {
  const { user } = useSelector((state) => state.auth);
  // const [open, setOpen] = useState(false);
  const {
    data: staffTimes,
    isFetching,
    isError,
  } = useGetStaffAllTimesQuery(user?.staffId);

  const times = staffTimes?.result;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pb: "100px ",
        pt: "200px",
      }}
    >
      <Box
        sx={{
          boxShadow: "var(--shadow-1)",
          background: "var(--light-color)",
          p: "20px",
          width: "100%",
        }}
      >
        {isFetching ? (
          <CustomSkeleton />
        ) : (
          // <TimesTable rows={times} />
          <FullTimeCalendar times={staffTimes?.result} />
        )}
      </Box>
      {/* <Button
          sx={{ mt: "30px" }}
          color="success"
          variant="contained"
          onClick={() => setOpen(true)}
        >
          اضافة وقت
        </Button>
      <AddTime open={open} setOpen={setOpen} /> */}
    </Box>
  );
};

export default StaffTimes;
