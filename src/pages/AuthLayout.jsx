import { CardMedia, Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef } from "react";
import logo from "../assets/logo.png";

import { Player } from "@lottiefiles/react-lottie-player";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const AuthLayout = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const animationRef = useRef(null);
  useEffect(() => {
    console.log(user);
    if (user) {
      navigate("/");
    }
  }, [user]);
  // console.log();

  const doSomething = () => {
    const time = animationRef?.current?.state?.instance?.timeCompleted;
    console.log(time);
    const timeoutId = setTimeout(() => {
      animationRef?.current?.pause();
    }, time);
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        // backgroundColor: "bg",
        position: "relative",
      }}
    >
      {/* Grid System  */}
      <Grid container position="relative" minHeight="100vh">
        {/* Lottie Palyer  */}
        <Grid
          item
          xs={12}
          md={12}
          position={"fixed"}
          width="100%"
          height="100%"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
          }}
        >
          {/* <img
            src={bg}
            alt=""
            width={"100%"}
            // height="100%"
            sx={{
              objectFit: "cover",
            }}
          /> */}
          <Player
            autoplay
            loop
            ref={animationRef}
            onEvent={(event) => {
              // if (event === "load") doSomething(); // check event type and do something
              if (event === "ready") doSomething(); // check event type and do something
            }}
            src="https://assets3.lottiefiles.com/packages/lf20_h55dw0gs.json"
            style={{ height: "100vh", width: "100%", inset: "0" }}
            position="fixed"
          ></Player>
        </Grid>
        {/* Login Form  */}
        <Grid
          item
          xs={12}
          md={12}
          py={"50px"}
          px={"30px"}
          // backgroundColor="rgba(255,255,255,.5)"
          color="main"
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={
            {
              // backdropFilter: " blur(1px)",
              // WebkitBackdropFilter: " blur(1px)",
            }
          }
        >
          {/* Form Container With Shadow */}
          <Paper
            elevation={2}
            sx={{
              maxWidth: 450,
              width: "100%",
              mx: "auto",
              p: "30px",
              textAlign: "center",
              position: "relative",
              background: "transparent",
            }}
          >
            {/* Logo Container With Shadow */}
            <Paper
              elevation={1}
              sx={{
                width: 200,
                height: 200,
                mx: "auto",
                borderRadius: "50%",
                background: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Image */}
              <CardMedia
                component="img"
                image={logo}
                alt="logo"
                sx={{ width: 120 }}
              />
            </Paper>

            {children}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthLayout;
