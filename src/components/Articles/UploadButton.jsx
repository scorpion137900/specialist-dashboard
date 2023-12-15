import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Box, Container } from "@mui/material";
import { DeleteOutline, UploadFileOutlined } from "@mui/icons-material";

export default function UploadButton({ imageUrl, setImageUrl, setImage }) {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImage(file);
    const reader = new FileReader();
    console.log(reader);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "320px",
        border: "1px dashed #ddd",
        position: "relative",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <label htmlFor="upload-image">
          {/* <Button variant="contained" component="span">
            Upload
          </Button> */}
          <UploadFileOutlined
            color="primary"
            sx={{
              fontSize: "120px",
              opacity: ".5",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />
          <input
            id="upload-image"
            hidden
            accept="image/*"
            type="file"
            onChange={handleFileUpload}
          />
        </label>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Uploaded Image"
            height="300"
            style={{ width: "300px ", objectFit: "cover" }}
          />
        )}
      </Stack>
      {imageUrl && (
        <Button
          type="button"
          color="error"
          sx={{
            position: "absolute",
            left: "5px",
            bottom: "5px",
          }}
          onClick={() => {
            setImageUrl(null);
            setImage(null);
          }}
        >
          <DeleteOutline fontSize="large" />
        </Button>
      )}
    </Box>
  );
}
