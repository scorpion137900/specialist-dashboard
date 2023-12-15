import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import IsLoadingMessage from "../IsLoadingMessage";
import { useEffect } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FileViewer({
  open,
  setOpen,
  selectedViewerFile,
  setSelectedViewerFile,
}) {
  const handleClose = () => {
    setOpen(false);
    setSelectedViewerFile(null);
  };
  const [isLoading, setIsLoading] = React.useState(false);
  useEffect(() => {
    if (open) setIsLoading(true);
  }, [open]);
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullScreen
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{selectedViewerFile?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {open && (
              <iframe
                src={selectedViewerFile?.link?.replace("/view", "/preview")}
                allow="autoplay"
                style={{
                  minHeight: "100vh",
                  border: "none",
                  outline: "none",
                  boxShadow: "0 0  2px rgba(0,0,0,.2)",
                  width: "100%",
                }}
                // onLoadStart={() => setIsLoading(true)}
                onLoad={() => setIsLoading(false)}
                // onEnded={() => setIsLoading(false)}
              ></iframe>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {isLoading && (
        <IsLoadingMessage
          msg={"please Wait Loading File"}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
