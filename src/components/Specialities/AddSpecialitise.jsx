// DeleteArticleConfirm.jsx
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { notifyError, notifySucess } from "../../utils/helper";
import { useAddSpecialitiseMutation } from "../../store/features/Specialities/specialitiesApi";
import { TextField } from "@mui/material";

export default function AddSpecialitise({ open, setOpen }) {
  const [addSpecialist, resultsAdd] = useAddSpecialitiseMutation();
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
    addSpecialist({
      name: value,
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
            label="Add Specialitise Here"
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
