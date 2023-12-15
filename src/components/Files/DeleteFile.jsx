// DeleteArticleConfirm.jsx
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { notifyError, notifySucess } from "../../utils/helper";
import { useDeleteFileMutation } from "../../store/features/files/filesApi";

export default function DeleteFile({
  open,
  setOpen,
  deletedItem,
  setDeletedItem,
}) {
  const [deleteFile, resultsDelete] = useDeleteFileMutation();

  const handleClose = () => {
    setOpen(false);
    setDeletedItem(null);
  };
  const handleDelete = () => {
    deleteFile(deletedItem?.id)
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
            هل أنت متأكد من أنك تريد حذف {deletedItem?.title}
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
