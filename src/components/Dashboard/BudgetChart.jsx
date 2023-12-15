import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import ReactApexCharts from "react-apexcharts";
function BudgetChart() {
  const [state, setState] = useState({
    series: [
      {
        name: "Radar Series 1",
        data: [45, 52, 38, 24, 33, 10],
      },
      {
        name: "Radar Series 2",
        data: [26, 21, 20, 6, 8, 15],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "radar",
      },
      dataLabels: {
        enabled: true,
        background: {
          enabled: true,
          borderRadius: 2,
        },
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: ["April", "May", "June", "July", "August", "September"],
        labels: {
          show: true,
          style: {
            colors: ["#a8a8a8"],
            fontSize: "11px",
            fontFamily: "Arial",
          },
        },
      },
    },
  });
  return (
    <Box
      sx={{
        backgroundColor: "var(--light-color)",
        boxShadow: "var(--shadow-1)",
        mt: "20px",
        padding: "15px",
      }}
    >
      <Typography variant="h6" mb="20px">
        Budget
      </Typography>
      <ReactApexCharts
        options={state.options}
        series={state.series}
        type="radar"
        height={300}
      />
    </Box>
  );
}

export default BudgetChart;
