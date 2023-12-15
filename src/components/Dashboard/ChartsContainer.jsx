import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import ReactApexCharts from "react-apexcharts";
import TimeLineContainer from "./Timeline";

const ChartsContainer = () => {
  const [state, setState] = useState({
    series: [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "series2",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });
  return (
    <Grid container spacing={"20px"} sx={{ mt: "10px" }}>
      <Grid item xs={12} md={8}>
        <Box
          id="chart"
          sx={{
            boxShadow: "var(--shadow-1)",
            background: "var(--light-color)",
            padding: "15px",
          }}
        >
          <Typography variant="h6" mb="20px">
            Reports
          </Typography>
          <ReactApexCharts
            options={state.options}
            series={state.series}
            type="area"
            height={450}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box
          id="chart"
          sx={{
            boxShadow: "var(--shadow-1)",
            background: "var(--light-color)",
            padding: "15px",
          }}
        >
          <Typography variant="h6">Recent Activity</Typography>
          <TimeLineContainer />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChartsContainer;
