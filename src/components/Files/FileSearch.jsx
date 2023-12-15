import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

import { notifyError } from "../../utils/helper";

const FileSearch = ({ setIsSearchShow, trigger }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
  });
  const onSubmit = async (data) => {
    console.log(data);
    if (
      !data?.fileTitle &&
      !data?.StaffName &&
      !data?.fileType &&
      !data?.specialtie
    ) {
      notifyError("You Should Enter one of Any Input Value To Search");
      return;
    }
    trigger(data)
      .unwrap()
      .then((payload) => {
        // console.log('fulfilled', payload)
        setIsSearchShow(true);
      })
      .catch((error) => {
        setIsSearchShow(false);
        console.error("rejected", error);
        notifyError(error?.data?.message);
      });
  };
  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      action=""
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      <Grid container spacing={"10px"}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            size="small"
            fullWidth
            sx={{ my: "10px" }}
            variant="outlined"
            label="Search By File Title"
            {...register("fileTitle")}
            error={!!errors?.fileTitle}
            helperText={errors?.fileTitle?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            fullWidth
            size="small"
            sx={{ my: "10px" }}
            variant="outlined"
            label="Search By StaffName"
            {...register("StaffName")}
            error={!!errors?.StaffName}
            helperText={errors?.StaffName?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            fullWidth
            size="small"
            sx={{ my: "10px" }}
            variant="outlined"
            label="Search By File Type"
            {...register("fileType")}
            error={!!errors?.fileType}
            helperText={errors?.fileType?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            fullWidth
            size="small"
            sx={{ my: "10px" }}
            variant="outlined"
            label="Search By specialtie"
            {...register("specialtie")}
            error={!!errors?.specialtie}
            helperText={errors?.specialtie?.message}
          />
        </Grid>
      </Grid>

      <Box sx={{ mb: "20px", display: "flex", gap: "10px" }}>
        <Button
          type="button"
          variant="contained"
          color="info"
          onClick={() => {
            reset();
            setIsSearchShow(false);
          }}
        >
          Reset
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default FileSearch;
