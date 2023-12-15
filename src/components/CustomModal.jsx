import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ReactDOM from "react-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const CustomModal = ({ open, handleClose, children }) => {
  return ReactDOM.createPortal(
    <Modal
      disableAutoFocus
      onClose={handleClose}
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </Modal>,
    document.getElementById("dialog")
  );
};

export default CustomModal;
