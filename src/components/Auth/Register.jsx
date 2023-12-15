import { VpnKeyOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  Checkbox,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register as registerThunk } from "../../store/features/auth/thunks/authThunks";
import PrivacyAgreement from "./PrivacyAgreement";
import { reset } from "../../store/features/auth/authSlice";

const Register = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  // const [notify, setNotify] = useState(false);
  const { isRegistered, isLoading } = useSelector((state) => state.auth);
  console.log(isRegistered);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    if (Object.keys(errors).length === 0) {
      dispatch(registerThunk(data));
    }
  };
  useEffect(() => {
    if (isRegistered) {
      navigate("/login");
    }
  }, [isRegistered]);

  useEffect(() => {
    dispatch(reset());
  }, []);
  return (
    <>
      <Typography
        variant="h2"
        component="h2"
        sx={{ my: "30px", fontWeight: 700, fontSize: "32px" }}
        color="text.main"
      >
        انشاء حساب لطبيب
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup sx={{ my: "30px" }}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <TextField
                error={errors.firstName}
                helperText={errors.firstName?.message}
                {...register("firstName", {
                  required: "You must specify a firstname",
                  minLength: {
                    value: 3,
                    message: "firstname must have at least 3 chracters lenght",
                  },
                })}
                variant="standard"
                fullWidth
                type="text"
                label="الاسم الاول"
                sx={{
                  "& .MuiInput-underline:hover:before ": {
                    borderBottom: "2px solid var(--border-color) !important",
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={errors.lastName}
                helperText={errors.lastName?.message}
                {...register("lastName", {
                  required: "You must specify a lastname",
                  minLength: {
                    value: 3,
                    message: "lastname must have at least 3 chracters lenght",
                  },
                })}
                name="lastName"
                variant="standard"
                fullWidth
                type="text"
                label="الاسم الاخير"
                sx={{
                  "& .MuiInput-underline:hover:before ": {
                    borderBottom: "2px solid var(--border-color) !important",
                  },
                }}
              />
            </Grid>
          </Grid>
        </FormGroup>
        <FormGroup sx={{ my: "30px" }}>
          <TextField
            error={errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
            {...register("phoneNumber", {
              required: "Required",
              minLength: {
                value: 11,
                message: "please enter a valid number",
              },
            })}
            name="phoneNumber"
            type="tel"
            variant="standard"
            fullWidth
            label="رقم الهاتف"
            sx={{
              "& .MuiInput-underline:hover:before ": {
                borderBottom: "2px solid var(--border-color) !important",
              },
            }}
          />
        </FormGroup>
        <FormGroup sx={{ my: "30px" }}>
          <TextField
            error={errors.email}
            helperText={errors.email?.message}
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
          />
        </FormGroup>
        <FormGroup sx={{ my: "30px" }}>
          <TextField
            error={errors.skills}
            helperText={errors.skills?.message}
            {...register("skills", {
              required: "Required",
            })}
            variant="standard"
            fullWidth
            type="text"
            label="المهارات"
            sx={{
              "& .MuiInput-underline:hover:before ": {
                borderBottom: "2px solid var(--border-color) !important",
              },
            }}
          />
        </FormGroup>
        <FormGroup sx={{ my: "30px" }}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <TextField
                error={errors.password}
                helperText={errors.password?.message}
                {...register("password", {
                  required: "You must specify a password",
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                })}
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
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={errors.passwordConfirm}
                helperText={errors.passwordConfirm?.message}
                {...register("passwordConfirm", {
                  required: true,
                  validate: (val) => {
                    if (watch("password") != val) {
                      return "Your passwords do no match";
                    }
                  },
                })}
                name="passwordConfirm"
                variant="standard"
                fullWidth
                type="password"
                label="تأكيد كلمة السر"
                sx={{
                  "& .MuiInput-underline:hover:before ": {
                    borderBottom: "2px solid var(--border-color) !important",
                  },
                }}
              />
            </Grid>
          </Grid>
        </FormGroup>
        <Typography
          variant="body2"
          component="p"
          color="text.main"
          sx={{ cursor: "pointer" }}
        >
          هل توافق علي
          <Typography
            component="span"
            variant="body2"
            sx={{
              textDecoration: "underline",
              mx: "5px",
            }}
            onClick={() => setOpen(true)}
          >
            اتفاقية الخصوصية ؟
          </Typography>
          <Checkbox
            {...register("privacyPolicy", {
              required: "should accept privacy policy",
            })}
          />
        </Typography>
        {errors.privacyPolicy && (
          <Typography color="red">{errors.privacyPolicy?.message}</Typography>
        )}
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
            <span> انشاء حساب</span>
          </LoadingButton>

          <Button
            variant="outlined"
            sx={{
              minWidth: "150px",
              fontWeight: "600",
              fontSize: "16px",
            }}
            onClick={() => navigate("/login")}
          >
            العودة الي تسجيل الدخول
          </Button>
        </Box>
      </form>
      <PrivacyAgreement open={open} setOpen={setOpen} />
    </>
  );
};

export default Register;
