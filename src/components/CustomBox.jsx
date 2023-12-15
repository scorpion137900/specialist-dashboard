import { Box } from "@mui/material";
import React from "react";

const CustomBox = ({ children }) => {
  return (
    <Box
      sx={{
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
    >
      <Box
        sx={{
          boxShadow: "var(--shadow-1)",
          background: "var(--light-color)",
          p: "20px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default CustomBox;
