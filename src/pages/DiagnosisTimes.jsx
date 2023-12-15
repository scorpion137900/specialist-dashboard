import React, { useEffect, useState } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import {
  Button,
  Chip,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAvailableTimes,
  updateAvailableTimes,
} from "../store/features/AvilableTimes/AvailableTimesThunks";
import { Box } from "@mui/system";
import { useTheme } from "@emotion/react";
import { TimelineOppositeContent } from "@mui/lab";
import CustomSkeleton from "../components/CustomSkeleton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";
import ConfirmModal from "../components/Pricing/ConfirmModal";
import CustomModal from "../components/CustomModal";
const DiagnosisTimes = () => {
  const [isOpen, setIsOpen] = useState({ open: false, data: null });
  const [boquetUpdate, setBoquetUpdate] = useState(false);

  const { availableTimes: times, auth } = useSelector((state) => state);
  const { availableTimes, isLoading } = times;
  const { patientId, reports } = auth.user;
  const navigate = useNavigate();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  console.log(availableTimes, "availableTimes");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAvailableTimes());
  }, []);
  const handletimeNavigate = async (time) => {
    // yirerat453@in2reach.com
    if (reports === null) {
      navigate("/pricing");
    }
    if (reports === 0) {
      setBoquetUpdate(true);
    }
    if (reports && reports > 0) {
      await dispatch(
        updateAvailableTimes({ timeId: time.timeId, status: "Pending" })
      );
      setIsOpen({ open: true, data: time.timeId });
    }
    // try {
    //   const response = await axios.post(
    //     `${API_URL}/ReportVideoChat/CreateReportVideoChat?patientId=${patientId}&availabletimeId=${time.timeId}`
    //   );
    //   setIsOpen({ open: true, data: { timeId: time.timeId, patientId } });
    // } catch (error) {
    //   if (error.response.data.message === "100") {
    //     return navigate("/pricing");
    //   }
    //   if (error.response.data.message === "101") {
    //     return setBoquetUpdate(true);
    //   }
    // }
    // console.log(response.response.data.message);
    // console.log(timeId);
    // dispatch(updateAvailableTimes({ timeId: time.timeId, status: "Pending" }));
    // // window.location.href = `${window.location.origin}/pricing`;
    // navigate("/pricing", { state: time, replace: true });
  };
  console.log(boquetUpdate);
  return (
    <>
      <Container maxWidth="xl" sx={{ py: "150px", minHeight: "500px" }}>
        <Typography
          component="h3"
          variant="h3"
          textAlign="center"
          color="text.secondary"
          my="50px"
        >
          Available Times
        </Typography>
        {isLoading ? (
          <CustomSkeleton />
        ) : (
          <>
            {availableTimes?.length === 0 ? (
              <Typography variant="h6" component="h6" color="text.secondary">
                There is No Available Times
              </Typography>
            ) : (
              <Timeline position={matches ? "alternate" : "left"}>
                {availableTimes?.map((time) => {
                  const timeFormat = String(
                    new Date(time?.availableTime)
                  ).slice(0, -40);
                  const hours = timeFormat.slice(-10);
                  const date = timeFormat.slice(0, -10);
                  const color =
                    time?.status === "Available"
                      ? "primary"
                      : time?.status === "Pending"
                      ? "warning"
                      : "error";
                  return (
                    <TimelineItem key={time?.timeId}>
                      <TimelineOppositeContent
                        sx={{ display: `${matches ? "flex" : "none"}` }}
                      ></TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot color={color} />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent p={5}>
                        <Box
                          sx={{
                            backgroundColor: "light.main",
                            boxShadow: "0px 0px 2px rgba(0,0,0,0.2)",
                            color: "main",
                            p: "20px",
                          }}
                        >
                          <Typography
                            variant="h6"
                            component="h6"
                            color="text.secondary"
                          >
                            {date}
                          </Typography>
                          <Typography
                            variant="p"
                            component="p"
                            color="text.secondary"
                            mb="10px"
                          >
                            {hours}
                          </Typography>

                          <Chip
                            variant="outlined"
                            label={`${time?.availableTimeMonth} Months`}
                            color={color}
                          />
                          <Chip
                            variant="outlined"
                            label={`${time?.availableTimeDay} Days`}
                            color={color}
                            sx={{ mx: "5px" }}
                          />
                          <Chip label={`${time?.status}`} color={color} />
                          <Typography>
                            <Button
                              variant="outlined"
                              sx={{
                                mt: "12px",
                                fontWeight: "bold",
                                fontSize: "16px",
                              }}
                              color={color}
                              onClick={() => handletimeNavigate(time)}
                              disabled={
                                time?.status === "Pending" ||
                                time?.status === "Reserved"
                              }
                            >
                              {time?.status === "Pending"
                                ? "قيد الحجز"
                                : time.status === "Reserved"
                                ? "تم الحجز"
                                : "      بدأ الحجز"}
                            </Button>
                          </Typography>
                        </Box>
                      </TimelineContent>
                    </TimelineItem>
                  );
                })}
              </Timeline>
            )}
          </>
        )}
      </Container>
      <ConfirmModal
        open={isOpen}
        handleClose={() => setIsOpen({ open: false, data: null })}
        date={new Date()}
      />

      <CustomModal
        open={boquetUpdate}
        handleClose={() => setBoquetUpdate(false)}
      >
        {/* <Typography id="modal-modal-title" variant="h6" component="h2">
          تاكيد الحجز
        </Typography> */}
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          الباقه الخاصه بك غير كافيه
        </Typography>
        <Stack sx={{ marginTop: "10px" }} spacing={2} direction="row">
          <Button onClick={() => navigate("/addons")} variant="outlined">
            شراء تشخيص
          </Button>
          <Button
            sx={{ marginRight: "10px" }}
            onClick={() => navigate("/pricing")}
            variant="contained"
          >
            تحديث الباقه الخاصه بك
          </Button>
        </Stack>
      </CustomModal>
    </>
  );
};

export default DiagnosisTimes;
