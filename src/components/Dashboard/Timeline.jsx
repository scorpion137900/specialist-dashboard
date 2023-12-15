import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Typography } from "@mui/material";

const TimelineContainer = () => {
  const timeLines = [
    {
      heading: "Eat",
      paragraph: "Because you need strength",
      color: "secondary",
    },
    {
      heading: "Repeat",
      paragraph: "Because this is the life you love!",
      color: "primary",
    },
    {
      heading: "Eat",
      paragraph: "Because you need strength",
      color: "secondary",
    },
    {
      heading: "Repeat",
      paragraph: "Because this is the life you love!",
      color: "text",
    },
    {
      heading: "Eat",
      paragraph: "Because you need strength",
      color: "secondary",
    },
    {
      heading: "Repeat",
      paragraph: "Because this is the life you love!",
      color: "primary",
    },
    {
      heading: "Eat",
      paragraph: "Because you need strength",
      color: "secondary",
    },
  ];
  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {timeLines.map((el, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot color={el.color} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6" component="span">
              {el.heading}
            </Typography>
            <Typography>{el.paragraph}</Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};
export default TimelineContainer;
