import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import EmailVerification from "../components/EmailVerification";

const VerifyEmailPage = () => {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");
  const token = params.get("token");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            textAlign: "center",
            maxWidth: "600px",
            mx: "auto",
            boxShadow: "0 0 2px rgba(0,0,0,.2)",
            p: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Typography component={"h3"} variant="h3">
            Verify Your Email
          </Typography>
          <EmailVerification email={email} token={token} />
        </Box>
      </Container>
    </Box>
  );
};

export default VerifyEmailPage;
