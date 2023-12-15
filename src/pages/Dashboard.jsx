import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import BudgetChart from "../components/Dashboard/BudgetChart";
import ChartsContainer from "../components/Dashboard/ChartsContainer";
import NumberCard from "../components/Dashboard/NumberCard";
import UsersTable from "../components/Dashboard/UsersTable";

const Dashboard = () => {
  return (
    <>
      <Typography variant="h5" mb="20px">
        Dashboard
      </Typography>
      <NumberCard />
      <ChartsContainer />
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <UsersTable />
        </Grid>
        <Grid item xs={12} md={4}>
          <BudgetChart />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
