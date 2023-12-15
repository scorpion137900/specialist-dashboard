import { VpnKeyOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, FormGroup, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../store/features/auth/authSlice";
import { login } from "../../store/features/auth/thunks/authThunks";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    //check if no errorrs in errors object
    // console.log(data);
    if (Object.keys(errors).length === 0) {
      dispatch(login(data));
    }
  };
  useEffect(() => {
    dispatch(reset());
  }, []);
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);

  return (
    <>
      <Typography
        variant="h2"
        component="h2"
        sx={{ my: "30px", fontWeight: 700, fontSize: "32px" }}
        color="text.main"
      >
        تسجيل الدخول كطبيب
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup sx={{ my: "30px" }}>
          <TextField
            {...register("email", {
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
            variant="standard"
            fullWidth
            type="email"
            label="البريد الالكتروني"
            sx={{
              "& .MuiInput-underline:hover:before ": {
                borderBottom: "2px solid var(--border-color) !important",
              },
            }}
            error={errors.email}
            helperText={errors.email?.message}
          />
        </FormGroup>
        <FormGroup sx={{ my: "30px" }}>
          <TextField
            {...register("password", {
              required: "You must specify a password",
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters",
              },
            })}
            error={errors.password}
            helperText={errors.password?.message}
            variant="standard"
            fullWidth
            type="password"
            label="كلمة السر"
            sx={{
              "& .MuiInput-underline:hover:before ": {
                borderBottom: "2px solid var(--border-color) !important",
              },
            }}
          />
        </FormGroup>
        <Typography
          variant="body12"
          component="p"
          color="text.main"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/forgot-password")}
        >
          هل نسيت كلمة المرور ؟
        </Typography>

        <Box
          sx={{
            mt: "50px",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <LoadingButton
            type="submit"
            sx={{
              minWidth: "150px",
              fontWeight: "600",
              fontSize: "16px",
            }}
            loading={isLoading}
            loadingPosition="end"
            endIcon={<VpnKeyOutlined />}
            variant="contained"
          >
            <span> تسجيل الدخول</span>
          </LoadingButton>

          <Button
            variant="outlined"
            sx={{
              minWidth: "150px",
              fontWeight: "600",
              fontSize: "16px",
            }}
            onClick={() => navigate("/register")}
          >
            انشاء حساب
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
