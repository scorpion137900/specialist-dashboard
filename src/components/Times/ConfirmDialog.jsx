import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteTimeMutation } from "../../store/features/times/timesApi";
import {
  deleteTimeThunk,
  getStaffTimes,
} from "../../store/features/times/timesThunks";
import { notifyError, notifySucess } from "../../utils/helper";
const ConfirmDialog = ({ open, setOpen, deletedTimeId }) => {
  const { staffId } = useSelector((state) => state.auth.user);
  const [deleteTime, resultDeleteTime] = useDeleteTimeMutation();
  const dispatch = useDispatch();
  const handleDelete = () => {
    deleteTime(deletedTimeId)
      .unwrap()
      .then((payload) => {
        setOpen(false);
        notifySucess(payload.message || "deleted Successfully");
      })
      .catch((err) => {
        notifyError(
          err?.data?.message ||
            err?.message ||
            "Sorry Can't delete time something happened"
        );
      });
    // dispatch(deleteTimeThunk(deletedTimeId)).then(() => {
    //   setTimeout(() => {
    //     dispatch(getStaffTimes(staffId));
    //     setOpen(false);
    //   }, 1000);
    // });
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={() => setOpen(false)}>
      <DialogTitle>Confirm the action</DialogTitle>

      <DialogContent>
        <Typography>Do You Want to Delete Time ?</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setOpen(false)}
          disabled={resultDeleteTime?.isLoading}
        >
          Cancel
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={handleDelete}
          disabled={resultDeleteTime?.isLoading}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
