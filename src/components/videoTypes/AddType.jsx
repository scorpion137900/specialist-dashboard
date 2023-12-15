// DeleteArticleConfirm.jsx
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { notifyError, notifySucess } from "../../utils/helper";

import { TextField } from "@mui/material";
import { useAddTypeMutation } from "../../store/features/videoTypes/videoTypes";

export default function AddType({ open, setOpen }) {
  const [addType, resultsAdd] = useAddTypeMutation();
  const [value, setValue] = React.useState("");

  const handleClose = () => {
    setOpen(false);
    setValue(null);
  };
  const handleAdd = () => {
    if (!value) {
      notifyError("please add Value");
      return;
    }
    addType({
      type: value,
    })
      .unwrap()
      .then((payload) => {
        notifySucess(payload.message);
        handleClose();
      })
      .catch((error) => notifyError(error.error));
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
        <DialogTitle id="alert-dialog-title">{"تأكيد الإضافة"}</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ mt: "10px" }}
            label="Add Type Here"
            variant="outlined"
            type="text"
            fullWidth
            defaultValue={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleAdd}
            autoFocus
            disabled={resultsAdd?.isLoading}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
