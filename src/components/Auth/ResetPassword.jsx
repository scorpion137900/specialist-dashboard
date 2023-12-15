import { VpnKeyOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/constants";
import { notifyError, notifySucess } from "../../utils/helper";

const ForgetPasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/User/ResetPassword`, {
        email: user?.email,
        newPassword: data?.newPassword,
        oldPassword: data?.oldPassword,
      });
      //   console.log(res);
      notifySucess(`${res?.data?.message}`);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      //   console.log(error);
      const errors = error?.response?.data?.errors;
      //   console.log(errors);
      if (errors) {
        //loop on errors it's object of objects
        for (const key in errors) {
          notifyError(`${errors[key]}`);
        }
      } else {
        enqueueSnackbar(
          `${error?.response?.data?.message}`,
          notifyOptions("error")
        );
      }
    }
    setLoading(false);
  };
  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: "55vh",
        py: "80px",
      }}
    >
      <Box
        sx={{
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "500px",
          width: "100%",
          margin: "50px auto",
          padding: "50px 30px",
          boxShadow: "0px 0px 2px rgba(0,0,0,0.2)",
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{ my: "30px", fontWeight: 700, fontSize: "32px" }}
          color="text.main"
        >
          Forgot Password Reset
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            fullWidth
            sx={{
              marginBottom: "20px",
            }}
            disabled
            defaultValue={user?.email}
            value={user?.email}
          />
          <TextField
            label="كلمة السر القديمة"
            variant="outlined"
            fullWidth
            {...register("oldPassword", {
              required: "this field is required",
              minLength: {
                value: 6,
                message: "password must be at least 6 characters",
              },
            })}
            error={errors.oldPassword}
            helperText={errors.password?.oldPassword}
            sx={{
              marginBottom: "20px",
            }}
          />
          <TextField
            label="كلمة السر الجديدة"
            variant="outlined"
            fullWidth
            {...register("newPassword", {
              required: "this field is required",
              minLength: {
                value: 6,
                message: "password must be at least 6 characters",
              },
            })}
            error={errors.newPassword}
            helperText={errors.password?.newPassword}
          />
          <LoadingButton
            type="submit"
            loading={loading}
            loadingPosition="end"
            endIcon={<VpnKeyOutlined />}
            variant="contained"
            sx={{
              marginTop: "20px",
              display: "flex",
              marginRight: "auto",
            }}
          >
            تغيير كلمة السر
          </LoadingButton>
        </form>
      </Box>
    </Container>
  );
};

export default ForgetPasswordReset;
