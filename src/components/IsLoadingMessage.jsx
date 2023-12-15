import { Box, CircularProgress, Snackbar } from "@mui/material";
import React from "react";

const IsLoadingMessage = ({ isLoading, msg, children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        left: "0",
        top: "0",
        right: "0",
        bottom: "0",
        inset: "0",
        zIndex: "9999",
        background: "rgba(0,0,0,.4)",
      }}
    >
      {/* {!children && <CircularProgress fontSize={"large"} />} */}
      <Box component={"span"} className="loader"></Box>
      <Snackbar
        sx={{ justifyContent: "center" }}
        open={isLoading}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        message={msg}
      />
      {/* {children} */}
    </Box>
  );
};

export default IsLoadingMessage;
