import { VpnKeyOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/constants";
import { notifyError, notifySucess } from "../../utils/helper";

const ForgetPasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (!state) {
      navigate("/forgot-password");
    }
  }, []);
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/User/ForgetPasswordReset`, {
        email: state?.email,
        newPassword: data?.password,
      });
      //   console.log(res);
      notifySucess(`${res?.data?.message}`);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      //   console.log(error);
      notifyError(`${error?.response?.data?.message}` || error?.data?.message);
    }
    setLoading(false);
  };
  return (
    <Box
      sx={{
        marginTop: "30px",
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
          defaultValue={state?.email}
          value={state?.email}
        />
        <TextField
          label="كلمة السر الجديدة"
          variant="outlined"
          fullWidth
          {...register("password", {
            required: "this field is required",
            minLength: {
              value: 6,
              message: "password must be at least 6 characters",
            },
          })}
          error={errors.password}
          helperText={errors.password?.message}
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
  );
};

export default ForgetPasswordReset;
