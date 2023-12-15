import * as React from "react";

import Slide from "@mui/material/Slide";

import { useForm } from "react-hook-form";
import { notifyError, notifySucess } from "../../utils/helper";

import ReusableDialog from "./ReusableDialog";
import dayjs from "dayjs";
import { useState } from "react";
import { useEffect } from "react";
import { useUpdateTimeMutation } from "../../store/features/times/timesApi";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpdateTime = ({ open, setOpen, time }) => {
  const converterTime = dayjs(time?.availableTime);

  const [selectedDate, setSelectedDate] = useState(null);
  const [updateTime, resultUpdateTime] = useUpdateTimeMutation();
  useEffect(() => {
    setSelectedDate(time?.availableTime);
  }, [open]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const handleDateChange = (e) => {
    // console.log(e);
    let onlyDate = e.$d.toISOString();
    setSelectedDate(onlyDate);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async (data) => {
    if (!selectedDate) {
      notifyError("Please select date and time");
      return;
    }
    updateTime({
      // newAvailableTimeDay: data.availableTimeDay,
      // newAvailableTimeMonth: data.availableTimeMonth,
      newAvailableTime: selectedDate,
      timeId: time?.timeId,
    })
      .unwrap()
      .then((payload) => {
        notifySucess(payload?.message || "updated Successfull");
      })
      .catch((err) => {
        notifyError(err?.data?.message || err?.message || "failed to update");
      });
  };
  useEffect(() => {
    if (resultUpdateTime?.isSuccess) {
      setOpen(false);
      notifySucess("Updated Successfully");
      resultUpdateTime?.reset();
      reset(
        {
          availableTimeDay: null,
          availableTimeMonth: null,
        },
        {
          keepErrors: false,
          keepDirty: false,
        }
      );
    }
  }, [resultUpdateTime?.isSuccess]);
  useEffect(() => {
    if (resultUpdateTime?.isError) {
      notifyError("Sorry Can't Update time something happened");
      resultUpdateTime?.reset();
    }
  }, [resultUpdateTime?.isError]);

  return (
    <ReusableDialog
      open={open}
      handleClose={handleClose}
      Transition={Transition}
      titleText="تعديل وقت"
      handleDateChange={handleDateChange}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      submitText="تعديل"
      errors={errors}
      values={time}
      converterTime={converterTime}
      setValue={setValue}
      isLoading={resultUpdateTime?.isLoading}
    />
  );
};
export default UpdateTime;
// <Dialog
//   fullScreen
//   open={open}
//   onClose={handleClose}
//   TransitionComponent={Transition}
// >
//   <AppBar sx={{ position: "relative" }}>
//     <Container maxWidth="xl">
//       <Toolbar>
//         <IconButton
//           edge="start"
//           color="inherit"
//           onClick={handleClose}
//           aria-label="close"
//         >
//           <CloseIcon />
//         </IconButton>
//         <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
//           اضافة وقت
//         </Typography>
//       </Toolbar>
//     </Container>
//   </AppBar>
//   <Container maxWidth="xl">
//     <Box
//       sx={{
//         width: "100%",
//         maxWidth: 600,
//         mx: "auto",
//         my: "200px",
//         "& .MuiPickersLayout-root": {
//           display: "flex",
//           flexWrap: "wrap",
//         },
//       }}
//       dir="ltr"
//     >
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <StaticDateTimePicker
//           orientation="landscape"
//           onChange={handleDateChange}
//           sx={{
//             "& .MuiDialogActions-root.MuiDialogActions-spacing.MuiPickersLayout-actionBar":
//               {
//                 display: "none",
//               },
//           }}
//         />
//       </LocalizationProvider>
//       <Box>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <TextField
//             type="number"
//             {...register("availableTimeMonth", {
//               required: "This field is required",
//               valueAsNumber: true,
//               pattern: {
//                 value: /^(0|[1-9]\d*)(\.\d+)?$/,
//                 message: "Please enter a valid number",
//               },
//             })}
//             defaultValue={time?.availableTimeMonth}
//             error={errors.availableTimeMonth}
//             helperText={errors.availableTimeMonth?.message}
//             label="availableTimeMonth"
//             fullWidth
//             sx={{
//               my: "30px",
//             }}
//           />
//           <TextField
//             type="number"
//             defaultValue={time?.availableTimeDay}
//             {...register("availableTimeDay", {
//               required: "This field is required",
//               valueAsNumber: true,
//               pattern: {
//                 value: /^(0|[1-9]\d*)(\.\d+)?$/,
//                 message: "Please enter a valid number",
//               },
//             })}
//             fullWidth
//             sx={{
//               my: "30px",
//             }}
//             label="availableTimeDay"
//             error={errors.availableTimeDay}
//             helperText={errors.availableTimeDay?.message}
//           />
//           <Button type="submit" variant="contained">
//             Submit
//           </Button>
//         </form>
//       </Box>
//     </Box>
//   </Container>
// </Dialog>
