import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

import { notifyError, notifySucess } from "../../utils/helper";

import IsLoadingMessage from "../IsLoadingMessage";
import { useDeletePatientVotesMutation } from "../../store/features/votes/votes";
const DeleteVoteConfirm = ({ open, setOpen, deletedItem, setDeletedItem }) => {
  const [deleteFunc, resultDelete] = useDeletePatientVotesMutation();

  const handleDelete = () => {
    deleteFunc(deletedItem?.id)
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
  const onClose = () => {
    setDeletedItem(null);
    setOpen(false);
  };
  return (
    <>
      <Dialog open={open} maxWidth="sm" fullWidth onClose={onClose}>
        <DialogTitle>Confirm the action</DialogTitle>

        <DialogContent>
          <Typography>Do You Want to Delete vote ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setOpen(false)}
            disabled={resultDelete?.isLoading}
          >
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
            disabled={resultDelete?.isLoading}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {resultDelete?.isLoading && (
        <IsLoadingMessage
          msg={"deleting"}
          isLoading={resultDelete?.isLoading}
        />
      )}
    </>
  );
};

export default DeleteVoteConfirm;
