// DeleteArticleConfirm.jsx
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { notifyError, notifySucess } from "../../utils/helper";
import { useUpdateSpecialitiseMutation } from "../../store/features/Specialities/specialitiesApi";
import { TextField } from "@mui/material";

export default function UpdateSpecialitise({
  open,
  setOpen,
  updatedItem,
  setUpdatedItem,
}) {
  const [updateSpecialist, resultsUpdate] = useUpdateSpecialitiseMutation();
  const [value, setValue] = React.useState(updatedItem?.name);

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
    updateSpecialist({
      id: updatedItem?.id,
      name: value,
    })
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
        <DialogTitle id="alert-dialog-title">{"تأكيد التعديل"}</DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            fullWidth
            defaultValue={updatedItem?.name}
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
