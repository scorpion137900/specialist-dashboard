import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { formatDateToCustomString } from "../../utils/CalendarHelpers";
import IsLoadingMessage from "../IsLoadingMessage";
import CheckActiveTimeStatus from "./CheckActiveTimeStatus";

const ItemActiveCalendar = ({ start, events, onClick, ...props }) => {
  const [isLoadingActive, setIsLoadingActive] = useState();
  const selectedTime = events.find((event) => {
    return event?.start.toString() == start.toString();
  });
  console.log(props);
  return (
    <>
      {selectedTime ? (
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 22,
          }}
        >
          <CheckActiveTimeStatus
            checked={selectedTime?.isActive}
            id={selectedTime?.event_id}
            setIsLoadingActive={setIsLoadingActive}
          />
        </Box>
      ) : (
        <Button
          style={{
            height: "100%",
            cursor: "pointer",
          }}
          onClick={() => onClick()}
        ></Button>
      )}
      {isLoadingActive && (
        <IsLoadingMessage
          msg={"Plaese Wait While updating Time Status Active "}
          isLoading={isLoadingActive}
        />
      )}
    </>
  );
};

export default ItemActiveCalendar;
