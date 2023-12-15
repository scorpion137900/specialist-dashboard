import * as React from "react";

import Slide from "@mui/material/Slide";

import { useForm } from "react-hook-form";
import { notifyError, notifySucess } from "../../utils/helper";
import { useSelector } from "react-redux";
// import { addTimeThunk } from "../../store/features/times/timesThunks";
import ReusableDialog from "./ReusableDialog";
import { useAddTimeMutation } from "../../store/features/times/timesApi";
import { useEffect } from "react";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddTime = ({ open, setOpen }) => {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [addTime, resultAddTime] = useAddTimeMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  // const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // console.log(user);
  const handleDateChange = (e) => {
    let onlyDate = e.$d.toISOString();
    setSelectedDate(onlyDate);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (data) => {
    if (!selectedDate) {
      notifyError("Please select date and time");
      return;
    }
    addTime({
      // ...data,
      availableTime: selectedDate,
      staffId: user.staffId,
    })
      .unwrap()
      .then(() => {
        setOpen(false);
        notifySucess("Added Successfully");
        setTimeout(() => {
          resultAddTime?.reset();
        }, 1000);
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
      })
      .catch((error) => {
        notifyError(
          error?.data?.message || "Sorry Can't Add time something happened"
        );
        resultAddTime?.reset();
      });
  };

  return (
    <ReusableDialog
      open={open}
      handleClose={handleClose}
      Transition={Transition}
      titleText="اضافة وقت"
      handleDateChange={handleDateChange}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      submitText="اضافة"
      errors={errors}
      isLoading={resultAddTime?.isLoading}
    />
  );
};
export default AddTime;
