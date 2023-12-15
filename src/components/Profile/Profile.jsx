import { Avatar, Box, Button, Container, Grid, TextField } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      phoneNumber: data.get("phoneNumber"),
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
      }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: "primary.main",
            width: "100px",
            height: "100px",
            mb: 3,
          }}
        >
          {/* <LockOutlinedIcon /> */}
        </Avatar>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container gap={"10px"} flexWrap="nowrap">
            <Grid item xs={6} mb="20px">
              <TextField
                required
                fullWidth
                id="firstName"
                label="firstName"
                name="firstName"
                autoComplete="firstName"
              />
            </Grid>
            <Grid item xs={6} mb="20px">
              <TextField
                required
                fullWidth
                id="lastName"
                label="lastName"
                name="lastName"
                autoComplete="lastName"
              />
            </Grid>
          </Grid>
          <Grid item xs={6} mb="20px">
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              defaultValue={user?.email}
            />
          </Grid>
          <Grid item xs={6} mb="20px">
            <TextField
              required
              fullWidth
              name="phoneNumber"
              label="phoneNumber"
              type="tel"
              id="phoneNumber"
              autoComplete="phoneNumber"
            />
          </Grid>

          <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
            Update Values
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
