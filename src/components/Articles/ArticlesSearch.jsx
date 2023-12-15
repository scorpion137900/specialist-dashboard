import { Box, Button, Container, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

const ArticlesSearch = ({ trigger, setIsSearchedArticleShowed }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    mode: "onSubmit",
  });

  const isTitleEmpty = !watch("title");
  const isStaffNameEmpty = !watch("staffName");
  const onSubmit = async (data) => {
    console.log(data);
    setIsSearchedArticleShowed(true);
    trigger(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          pb: "30px",
          width: "100%",
          flexWrap: "wrap",
          gap: "30px",
          "@media(max-width:600px)": {
            "& *": {
              width: "100%",
            },
          },
        }}
      >
        <TextField
          id="title"
          type="text"
          label="title"
          variant="standard"
          {...register("title", {
            required: {
              value: isStaffNameEmpty,
              message: "One of The Two Field is Required",
            },
          })}
          error={!!errors?.title}
          helperText={errors?.title?.message}
        />
        <TextField
          id="staffName"
          label="staff Name"
          variant="standard"
          type="text"
          {...register("staffName", {
            required: {
              value: isTitleEmpty,
              message: "One of The Two Field is Required",
            },
          })}
          error={!!errors?.staffName}
          helperText={errors?.staffName?.message}
        />
        <Button
          variant="outlined"
          type="submit"
          sx={{
            mt: "10px",
            //   alignSelf: "self-end",
          }}
        >
          Search
        </Button>
        <Button
          variant="contained"
          type="button"
          sx={{
            mt: "10px",
            //   alignSelf: "self-end",
          }}
          onClick={() => {
            setIsSearchedArticleShowed(false);
            reset();
          }}
        >
          Reset
        </Button>
      </Box>
    </form>
  );
};

export default ArticlesSearch;
