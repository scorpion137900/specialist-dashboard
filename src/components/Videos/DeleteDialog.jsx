import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useDeleteVideoMutation } from "../../store/features/videos/videos";
import { notifyError, notifySucess } from "../../utils/helper";

const DeleteDialog = ({ open, setOpen, deletedVideo, setDeletedVideo }) => {
  const [deletVideo, result] = useDeleteVideoMutation();
  // const { userId } = useSelector((state) => state.auth.user);
  // const dispatch = useDispatch();
  // const handleDelete = () => {
  //   dispatch(deleteTimeThunk(deletedTimeId)).then(() => {
  //     setTimeout(() => {
  //       dispatch(getAllTimes(staffId));
  //       setOpen(false);
  //     }, 1000);
  //   });
  // };
  const handleClose = () => {
    setOpen(false);
    setDeletedVideo(null);
  };
  const handleDelete = () => {
    deletVideo(deletedVideo?.id)
      .unwrap()
      .then((payload) => {
        notifySucess("deleted Successfully");
        handleClose();
      })
      .catch((err) => {
        notifyError(err?.message);
        handleClose();
      });
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={handleClose}>
      <DialogTitle>Confirm the action</DialogTitle>

      <DialogContent>
        <Typography>Do You Want to Delete {deletedVideo?.title} ?</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={handleClose}
          disabled={result?.isLoading}
        >
          Cancel
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={handleDelete}
          disabled={result?.isLoading}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
