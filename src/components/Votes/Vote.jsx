import { Avatar, Box, Rating, Typography } from "@mui/material";
import React from "react";
import { useGetAllStaffUsersQuery } from "../../store/features/staffUser/staffUser";
import { useGetAllPatientsQuery } from "../../store/features/Patient/Patient";
import { formatDateToCustomString } from "../../utils/CalendarHelpers";

const Vote = ({ vote }) => {
  const { data: staffs } = useGetAllStaffUsersQuery();

  const STAFF = staffs?.result?.find((staff) => staff?.id === vote?.staffId);
  console.log(vote);
  const { data: patients } = useGetAllPatientsQuery();

  const patient = patients?.result?.find(
    (patient) => patient?.id === vote?.patientId
  );

  return (
    <Box
      sx={{
        boxShadow: "inset 0 0 2px rgba(0,0,0,.4)",
        backgroundColor: "#fff",
        borderRadius: "2px",
        p: "20px",
        py: "40px",
      }}
    >
      <Box
        sx={{
          margin: "0",
          mb: "20px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
          width: "100% ",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px ",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px " }}>
            <Avatar
              src={STAFF?.firstName + " " + STAFF?.lastName}
              alt={STAFF?.firstName + " " + STAFF?.lastName}
            />
            {STAFF?.firstName + " " + STAFF?.lastName}
          </Box>
          <Rating
            name="read-only"
            defaultValue={vote?.staffStars}
            precision={0.1}
            readOnly
            max={10}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: "20px ",
          py: "10px",
        }}
      >
        <Avatar src={patient?.name} alt={patient?.name?.toUpperCase()} />

        <Box
          sx={{
            border: "1px solid #ddd",
            p: "10px",
            borderRadius: "10px",
            position: "relative",
            width: "100%",
          }}
        >
          <Typography
            component={"span"}
            variant="span"
            sx={{
              display: "block",
              top: "15px",
              width: "0px",
              height: " 0px",
              position: "absolute",
              background: "transparent",
              border: "10px solid #ddd",
              left: "-20px",
              borderTopColor: "transparent",
              borderLeftColor: "transparent",
              borderBottomColor: "transparent",
            }}
          ></Typography>
          <Typography
            variant="p"
            component={"p"}
            sx={{
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span> {patient?.name}</span>
            <span>{formatDateToCustomString(vote?.voteDateTime)}</span>
          </Typography>
          <Typography variant="p" component={"p"}>
            {vote?.voteText}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ my: "10px" }} component="legend">
              Session Stars
            </Typography>
            <Rating
              name="read-only"
              defaultValue={vote?.sessionStars}
              precision={0.5}
              readOnly
              max={10}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Vote;
