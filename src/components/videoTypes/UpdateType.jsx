// DeleteArticleConfirm.jsx
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { notifyError, notifySucess } from "../../utils/helper";
import { TextField } from "@mui/material";
import { useEditTypeMutation } from "../../store/features/videoTypes/videoTypes";

export default function UpdateType({
  open,
  setOpen,
  updatedItem,
  setUpdatedItem,
}) {
  console.log(updatedItem);
  const [updateType, resultsUpdate] = useEditTypeMutation();
  const [value, setValue] = React.useState(updatedItem?.type);

  const handleClose = () => {
    setOpen(false);
    setUpdatedItem(null);
    setValue(null);
  };
  const handleUpdate = () => {
    if (!value) {
      notifyError("please add Value");
      return;
    }
    updateType({
      id: updatedItem?.id,
      newType: value,
    })
      .unwrap()
      .then((payload) => {
        notifySucess(payload.message);
        handleClose();
      })
      .catch((error) => notifyError(error.message || "some thing happened"));
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
        <DialogTitle id="alert-dialog-title">{"تأكيد التعديل"}</DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            fullWidth
            defaultValue={updatedItem?.type}
            onChange={(e) => setValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleUpdate}
            autoFocus
            disabled={resultsUpdate?.isLoading}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
