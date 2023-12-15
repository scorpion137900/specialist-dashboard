import React from "react";
// import { GoogleLogin } from "react-google-login";

// import { GoogleLogin } from "@react-oauth/google";
import { Button } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { Upload } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// const CLIENT_ID = import.meta.env.CLIENT_I

const YouTubeUploadButton = () => {
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      navigate("upload", {
        state: {
          //...values
          access_token: tokenResponse?.access_token,
        },
      });
    },
  });

  return (
    <Button
      variant="contained"
      sx={{
        my: "20px",
        display: "flex",
        gap: "10px",
      }}
      onClick={() => {
        login();
      }}
    >
      Upload Video <Upload />
    </Button>
  );
};

export default YouTubeUploadButton;
