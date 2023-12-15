import React from "react";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { Grid, Paper, Typography } from "@mui/material";
const items = [
  {
    icon: SupervisorAccountIcon,
    // bgColor: "rgb(209, 233, 252)",
    bgColor: "rgba(221, 25, 136, 0.1)",
    color: "#dd1989",
    heading: "   Total Times",
    paragraph: "4,42,236",
  },
  {
    icon: SupervisorAccountIcon,
    // bgColor: "rgb(208, 242, 255)",
    bgColor: "rgba(14, 201, 211, 0.1)",
    color: "#0ecad3",
    heading: "   Total Videos   ",
    paragraph: "1.35m    ",
  },
  {
    icon: SupervisorAccountIcon,
    bgColor: " rgba(15, 128, 132, 0.1)",
    color: "#0f8084",
    heading: "   Total Bouqets    ",
    paragraph: "1.35m    ",
  },
  {
    icon: SupervisorAccountIcon,
    // bgColor: "rgb(255, 231, 217)",
    bgColor: "rgba(78, 209, 89, 0.1)",
    color: "#4ed15a",
    heading: "   Total Articles    ",
    paragraph: "1.35m    ",
  },
];
const NumberCard = () => {
  return (
    <Grid container spacing="20px">
      {/* Loop Here */}
      {items.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
          <Paper
            elevation={2}
            sx={{
              p: "20px 10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              backgroundColor: "var(  --light-color)",
              boxShadow: "var(--shadow-1)",
            }}
          >
            <Paper
              // variant="outlined"
              sx={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: item.bgColor,
                //   color: " rgb(16, 57, 150)",
                //   backgroundImage:
                //     "linear-gradient(135deg, rgba(16, 57, 150, 0) 0%, rgba(16, 57, 150, 0.24) 100%)",
              }}
            >
              <item.icon fontSize="large" sx={{ color: item.color }} />
            </Paper>
            <Typography
              variant="p"
              sx={{ my: "10px", color: "text.main", fontSize: "1.2rem" }}
            >
              {item.heading}
            </Typography>
            <Typography variant="h4" sx={{ color: "text.main" }}>
              {item.paragraph}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default NumberCard;
