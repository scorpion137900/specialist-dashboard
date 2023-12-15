import { Chip, Typography } from "@mui/material";
import { isNumber } from "@mui/x-data-grid/internals";
import React from "react";

const Feature = ({ value, text, number }) => {
  return (
    <Typography
      variant="p"
      sx={{
        fontSize: "1.0rem",
        textAlign: "center",
        fontWeight: "bold",
        width: "100%",
        display: "block",
        margin: "8px auto",
      }}
    >
      {text}
      {"    "}
      {!isNumber(number) && (
        <>
          {value ? (
            <Chip label="Yes" color="success" size="small" />
          ) : (
            <Chip label="No" color="error" size="small" />
          )}{" "}
        </>
      )}
      {isNumber(number) && !value && (
        <Chip label={number} color="primary" size="small" />
      )}
    </Typography>
  );
};

export default Feature;
