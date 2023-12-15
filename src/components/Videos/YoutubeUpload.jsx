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
import { useNavigate } from "react-router-dom";
import { useGetAllSpecialitiesQuery } from "../../store/features/Specialities/specialitiesApi";
import { useAddVideoMutation } from "../../store/features/videos/videos";
import { notifyError, notifySucess } from "../../utils/helper";
import UploadButton from "../Articles/UploadButton";
import logoAnimation from "../../assets/logo.gif";
import IsLoadingMessage from "../IsLoadingMessage";
import { useGetAllTypesQuery } from "../../store/features/videoTypes/videoTypes";
// import { useLocation, useNavigate } from "react-router-dom";
// import { googleLogout } from "@react-oauth/google";
// import axios from "axios";

const YouTubeUpload = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState(null);
  const { data, isError } = useGetAllSpecialitiesQuery();
  const { data: videoTypes, isError: typesError } = useGetAllTypesQuery();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [addVideo, results] = useAddVideoMutation();
  useEffect(() => {
    if (isError) notifyError("failed to get all specialities");
  }, [isError]);
  useEffect(() => {
    if (typesError) notifyError("failed to get all Video Types");
  }, [typesError]);
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
      formData.append("SpecialtiesId", data?.specialtiesId);
      formData.append("Link", data?.Link);
      formData.append("Thumbnail", image);
      formData.append("StaffId", user?.staffId);
      formData.append("VideoTypeId", data?.VideoTypeId);
      await addVideo(formData)
        .unwrap()
        .then((payload) => {
          notifySucess("Added Successfully");
          if (user?.isMaster) navigate("/videos");
          else navigate("/videos/staff-videos");
          results?.reset();
        })
        .catch((err) => {
          notifyError("Error while Adding Video");
        });
      console.log(data);
      console.log(formData);
    }
  };
  // if (results?.isSuccess) {
  //   notifySucess("Added Successfully");
  //   navigate("/videos");

  //   results?.reset();
  // }
  // if (results?.isError) notifyError("Error while Adding Video");
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
          <FormControl fullWidth margin="dense" error={errors?.VideoTypeId}>
            <InputLabel id="demo-simple-select-label-1">Video Types</InputLabel>

            <Select
              required
              id="demo-simple-select-1"
              label="VideoTypes"
              fullWidth
              {...register("VideoTypeId", {
                required: "this field is required",
              })}
              // onChange={setSelected}
            >
              {console.log(videoTypes)}
              {videoTypes?.result?.map((element, index) => {
                return (
                  <MenuItem key={index} value={element?.id}>
                    {element?.type}
                  </MenuItem>
                );
              })}
            </Select>
            {errors?.VideoTypeId && (
              <FormHelperText>{errors?.VideoTypeId?.message}</FormHelperText>
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
            {...register("Link", {
              required: "this field is required",
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
            color="success"
            type="submit"
            variant="contained"
            sx={{ mt: "20px " }}
          >
            Add Video{" "}
          </Button>
        </form>
      </Paper>
      {results?.isLoading && (
        <IsLoadingMessage
          isLoading={results?.isLoading}
          msg={"Plaese Wait While Adding Video"}
        />
      )}
    </>
  );
};

export default YouTubeUpload;
