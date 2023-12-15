import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { API_URL } from "../../utils/constants";
import { notifyError, notifySucess } from "../../utils/helper";
import OtpInput from "react-otp-input";
import { VpnKeyOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleSubmitReset = async (data) => {
    // console.log(data);
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      try {
        const res = await axios.post(
          `${API_URL}/User/ForgetPassword?email=${data?.email}`
        );
        // console.log(res);
        setIsSent(true);
        setEmail(data?.email);
        notifySucess(`Sent to ${data?.email}  Successfully`);
        setIsSent(true);
      } catch (error) {
        console.log(error);
        // console.log(error?.response?.data?.message);
        notifyError(`${error?.response?.data?.message}` ||error?.data?.message);
      }
      setLoading(false);
    }
  };
  const handleOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 4) {
      notifyError(`Please enter a valid OTP`);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${API_URL}/User/ForgetPasswordCheck?token=${otp}`
      );
      // console.log(res);
      notifySucess(`${res?.data?.message}`);
      navigate("/forgot-password-reset", {
        state: {
          //...values
          email,
        },
      });
    } catch (error) {
      // console.log(error);
      notifyError(`${error?.response?.data?.message}` ||error?.data?.message);
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
        Forgot Password
      </Typography>
      {isSent ? (
        <Box dir="ltr">
          <Typography mb="20px" textAlign="left">
            أدخل الكود من اليسار الي اليمين
          </Typography>
          <form onSubmit={handleOtp}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              containerStyle={{
                justifyContent: "space-between",
              }}
              // renderSeparator={<span>-</span>}
              renderInput={(props) => (
                <input {...props} className="otp-input" />
              )}
            />
            <LoadingButton
              type="submit"
              loading={loading}
              loadingPosition="end"
              endIcon={<VpnKeyOutlined />}
              variant="contained"
              sx={{
                marginTop: "20px",
                marginRight: "auto",
              }}
            >
              التحقق من رمز التأكيد
            </LoadingButton>
          </form>
        </Box>
      ) : (
        <form onSubmit={handleSubmit(handleSubmitReset)}>
          <TextField
            label="البريد الإلكتروني"
            fullWidth
            {...register("email", {
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
            error={errors.email}
            helperText={errors.email?.message}
          />
          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            loadingPosition="end"
            endIcon={<VpnKeyOutlined />}
            sx={{
              marginTop: "20px",
              marginRight: "auto",
              display: "flex",
            }}
          >
            إعادة تعيين البريد الإلكتروني
          </LoadingButton>
        </form>
      )}
    </Box>
  );
};

export default ForgotPassword;
