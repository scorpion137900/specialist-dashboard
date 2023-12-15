// DeleteArticleConfirm.jsx
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { notifyError, notifySucess } from "../../utils/helper";
import { useDeleteSpecialitiseMutation } from "../../store/features/Specialities/specialitiesApi";

export default function DeleteSpecialitise({
  open,
  setOpen,
  deletedItem,
  setDeletedItem,
}) {
  const [deleteSpecialist, resultsDelete] = useDeleteSpecialitiseMutation();
  console.log(resultsDelete, "resultsDeleteresultsDeleteresultsDelete");
  const handleClose = () => {
    setOpen(false);
    setDeletedItem(null);
  };
  const handleDelete = () => {
    deleteSpecialist(deletedItem?.id)
      .unwrap()
      .then((payload) => {
        notifySucess(payload.message);
        handleClose();
      })
      .catch((error) => notifyError(error.error));
    // handleClose();
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"تأكيد الحذف؟"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            هل أنت متأكد من أنك تريد حذف {deletedItem?.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            autoFocus
            disabled={resultsDelete?.isLoading}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
