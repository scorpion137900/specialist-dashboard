import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import {
  LocalizationProvider,
  StaticDateTimePicker,
} from "@mui/x-date-pickers";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect } from "react";
const ReusableDialog = ({
  open,
  handleClose,
  Transition,
  titleText,
  handleDateChange,
  handleSubmit,
  onSubmit,
  register,
  submitText,
  errors,
  values,
  converterTime,
  setValue,
  isLoading,
}) => {
  useEffect(() => {
    if (values) {
      setValue("availableTimeMonth", values?.availableTimeMonth);
      setValue("availableTimeDay", values?.availableTimeDay);
    }
  }, [open]);
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative", visibility: "hidden" }}>
        <Container maxWidth="xl">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {titleText}
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="xl">
        <Box
          sx={{
            width: "100%",
            maxWidth: 600,
            mx: "auto",
            my: "200px",
            "& .MuiPickersLayout-root": {
              display: "flex",
              flexWrap: "wrap",
            },
          }}
          dir="ltr"
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDateTimePicker
              orientation="landscape"
              onChange={handleDateChange}
              sx={{
                "& .MuiDialogActions-root.MuiDialogActions-spacing.MuiPickersLayout-actionBar":
                  {
                    display: "none",
                  },
              }}
              defaultValue={converterTime ? converterTime : ""}
            />
          </LocalizationProvider>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* <TextField
                type="`number`"
                {...register("availableTimeMonth", {
                  required: "This field is required",
                  valueAsNumber: true,
                  pattern: {
                    value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    message: "Please enter a valid number",
                  },
                })}
                error={errors.availableTimeMonth}
                helperText={errors.availableTimeMonth?.message}
                label="availableTimeMonth"
                fullWidth
                sx={{
                  my: "30px",
                }}
                defaultValue={values ? values?.availableTimeMonth : ""}
              />
              <TextField
                type="number"
                {...register("availableTimeDay", {
                  required: "This field is required",
                  valueAsNumber: true,
                  pattern: {
                    value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    message: "Please enter a valid number",
                  },
                })}
                fullWidth
                sx={{
                  my: "30px",
                }}
                label="availableTimeDay"
                error={errors?.availableTimeDay}
                helperText={errors.availableTimeDay?.message}
                defaultValue={values ? values?.availableTimeDay : ""}
              /> */}
              <Button type="submit" variant="contained" disabled={isLoading}>
                {submitText}
              </Button>
              <Button
                type="button"
                variant="contained"
                disabled={isLoading}
                color="error"
                sx={{
                  mx: "10px",
                }}
                onClick={handleClose}
              >
                Close
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </Dialog>
  );
};

export default ReusableDialog;
