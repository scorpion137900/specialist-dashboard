import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllSpecialitiesQuery } from "../../store/features/Specialities/specialitiesApi";

import {
  isGoogleDriveLink,
  notifyError,
  notifySucess,
} from "../../utils/helper";
import UploadButton from "../Articles/UploadButton";
import logoAnimation from "../../assets/logo.gif";
import { HostUrl, imageUrlToFile } from "../../utils/constants";
import IsLoadingMessage from "../IsLoadingMessage";
import { useUpdateFileMutation } from "../../store/features/files/filesApi";
// import { useLocation, useNavigate } from "react-router-dom";
// import { googleLogout } from "@react-oauth/google";
// import axios from "axios";

const UpdateFile = () => {
  const { user } = useSelector((state) => state?.auth);
  const { state } = useLocation();
  console.log(state);
  const navigate = useNavigate();
  useEffect(() => {
    if (!state?.id) navigate("/files");
  }, [state]);

  const [imageUrl, setImageUrl] = useState(`${HostUrl}${state?.thumbnail}`);
  const [image, setImage] = useState(null);
  const { data, isError } = useGetAllSpecialitiesQuery();
  const [updateFile, results] = useUpdateFileMutation();

  useEffect(() => {
    if (isError) notifyError("failed to get all specialities");
  }, [isError]);
  console.log(
    "AddFileAddFileAddFileAddFileAddFileAddFileAddFileAddFileAddFileAddFileAddFileAddFileAddFile"
  );
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submit = async (data) => {
    if (!image) {
      notifyError("image is Required");
      return;
    }
    if (Object.keys(errors).length === 0) {
      const formData = new FormData();
      formData.append("Title", data?.title);
      formData.append("Description", data?.Description);
      formData.append("Link", data?.Link);
      formData.append("Thumbnail", image);
      formData.append("Id", state?.id);
      await updateFile(formData)
        .unwrap()
        .then((payload) => {
          notifySucess("updated Successfully");
          if (user?.isMaster) {
            navigate("/files");
          } else navigate("/files/staff-files");
          results?.reset();
        })
        .catch((err) => {
          notifyError(err?.message || err?.data?.message);
        });
    }
  };

  useEffect(() => {
    const loadImage = async () => {
      const img = await imageUrlToFile(
        `${HostUrl}${state?.thumbnail}`
        // "image.jpg"
      );

      setImage(img);
    };
    loadImage();
  }, [state]);
  return (
    <>
      <Paper
        sx={{
          my: "100px",
          p: "10px",
        }}
      >
        <form action="" onSubmit={handleSubmit(submit)}>
          <TextField
            id="title"
            fullWidth
            margin="dense"
            label="Title"
            variant="outlined"
            error={errors?.title}
            helperText={errors?.title?.message}
            defaultValue={state?.title}
            {...register("title", {
              required: "this field is required",
              maxLength: {
                value: 100,
                message: "you exeeceds limit 100",
              },
            })}
            // inputProps={{ maxLength: 100 }}
          />
          <FormControl fullWidth margin="dense" error={errors?.specialtiesId}>
            <InputLabel id="demo-simple-select-label">specialties</InputLabel>

            <Select
              required
              id="demo-simple-select"
              label="specialties"
              fullWidth
              {...register("specialtiesId", {
                required: "this field is required",
              })}
              // onChange={setSelected}

              defaultValue={state?.specialtiesId}
            >
              {data?.result?.map((element, index) => {
                return (
                  <MenuItem key={index} value={element?.id}>
                    {element?.name}
                  </MenuItem>
                );
              })}
            </Select>
            {errors?.specialtiesId && (
              <FormHelperText>{errors?.specialtiesId?.message}</FormHelperText>
            )}
          </FormControl>

          <TextField
            id="Link"
            fullWidth
            margin="dense"
            label="Link"
            variant="outlined"
            error={errors?.Link}
            helperText={errors?.Link?.message}
            type="url"
            defaultValue={state?.link}
            {...register("Link", {
              required: "this file is Required",
              validate: isGoogleDriveLink,
            })}
            // inputProps={{ maxLength: 100 }}
          />
          <TextField
            helperText={errors?.Description?.message}
            error={errors?.Description}
            fullWidth
            id="Description"
            label="Description"
            variant="outlined"
            multiline
            margin="dense"
            rows={4}
            defaultValue={state?.description}
            {...register("Description", {
              required: "this field is required",
              maxLength: {
                value: 5000,
                message: "you exeeceds limit 5000",
              },
            })}

            // inputProps={{ maxLength: 5000 }}
          />
          {/* <TextField
              id="video"
              fullWidth
              margin="dense"
              variant="outlined"
              error={errors.video}
              helperText={errors?.video?.message}
              {...register("video", {
                required: "this field is required",
              })}
              type="file"
              // inputProps={{ maxLength: 100 }}
            /> */}
          <Typography
            variant="body2"
            sx={{
              my: "10px",
            }}
          >
            upload thumbnail
          </Typography>
          <UploadButton
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            setImage={setImage}
          />
          <Button
            color="secondary"
            type="submit"
            variant="contained"
            sx={{ mt: "20px " }}
          >
            Update File{" "}
          </Button>
          <Button
            color="error"
            type="button"
            variant="contained"
            sx={{ mt: "20px ", marginInlineStart: "10px" }}
            onClick={() => navigate(-1)}
          >
            Back{" "}
          </Button>
        </form>
      </Paper>
      {results?.isLoading && (
        <IsLoadingMessage
          isLoading={results?.isLoading}
          msg={"Plaese Wait While updating File"}
        >
          <img
            src={logoAnimation}
            alt=""
            style={{
              // maxWidth: "500px",
              // maxHeight: "500px",
              width: "100%",
              height: "100%",
              objectFit: "fill",
            }}
          />
        </IsLoadingMessage>
      )}
    </>
  );
};

export default UpdateFile;
