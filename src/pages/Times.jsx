import { Box } from "@mui/material";
import React from "react";

import CustomSkeleton from "../components/CustomSkeleton";
import FullTimeCalendar from "../components/Times/FullTimeCalendar";
import { useGetAllTimesQuery } from "../store/features/times/timesApi";

const Times = () => {
  // const [status, setStatus] = useState("All");
  const { data, isFetching } = useGetAllTimesQuery();
  // const [open, setOpen] = useState(false);
  // const [
  //   trigger,
  //   { data: timesBystatus, error, isFetching: isFetchingStatus },
  // ] = useLazyGetAllAvailableTimeByStatusQuery();
  // let times = data?.result;
  // if (status !== "All") {
  //   times = data?.result?.filter((item) => item.status === status);
  // } else {
  //   times = data?.result;
  // }

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
        {/* <FilterByStatus
          status={status}
          setStatus={setStatus}
          trigger={trigger}
        /> */}
        {isFetching ? (
          <CustomSkeleton />
        ) : (
          <>
            <FullTimeCalendar times={data?.result} />
            {/* <TimesTable rows={times} /> */}
          </>
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

export default Times;
