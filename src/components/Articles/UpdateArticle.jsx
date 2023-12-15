import * as React from "react";
import Button from "@mui/material/Button";

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import {
  formats,
  HostUrl,
  imageUrlToFile,
  modules,
} from "../../utils/constants";
import { useRef } from "react";
import {
  useGetArticleQuery,
  useUpdateArticleMutation,
} from "../../store/features/articles/articlesApi";
import { notifyError, notifySucess } from "../../utils/helper";
import { useEffect } from "react";
import CustomSkeleton from "../CustomSkeleton";
import { useGetAllSpecialitiesQuery } from "../../store/features/Specialities/specialitiesApi";
import UploadButton from "./UploadButton";
import { useState } from "react";
import IsLoadingMessage from "../IsLoadingMessage";
import { useSelector } from "react-redux";

export default function UpdateArticlePage() {
  const { state } = useLocation();
  const article = state?.article;
  const { user } = useSelector((state) => state?.auth);
  const quillRef = useRef();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState(
    `${HostUrl}${article?.articleImage}`
  );
  console.log(imageUrl);
  const [image, setImage] = useState(null);
  // console.log(article);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  useEffect(() => {
    setValue("content", article?.content);
  }, []);
  useEffect(() => {
    const loadImage = async () => {
      const img = await imageUrlToFile(
        `${HostUrl}${article?.articleImage}`,
        "image"
      );

      setImage(img);
    };
    loadImage();
  }, [article]);
  const [updateArticle, updateResult] = useUpdateArticleMutation();
  const { data, isFetching, isError } = useGetArticleQuery(id);
  const { data: specialities, isError: isSpecialitiesError } =
    useGetAllSpecialitiesQuery();
  if (isFetching)
    return (
      <Box
        sx={{
          pb: "100px ",
          pt: "100px",
        }}
      >
        {" "}
        <CustomSkeleton />{" "}
      </Box>
    );
  if (isError) notifyError("This Article not found");
  if (!isFetching && !data && !article) navigate("/articles");
  const submit = async (data) => {
    // console.log(data);
    if (!image) notifyError("please upload an Image");
    if (Object.keys(errors).length === 0) {
      const formData = new FormData();
      formData.append("Title", data?.title);
      formData.append("Content", data?.content);
      formData.append("SpecialtiesId", data?.specialtiesId);
      formData.append("ArticleId", article?.id);
      formData.append("ArticleImage", image);
      await updateArticle(formData)
        .unwrap()
        .then((payload) => {
          notifySucess(payload.message);
          if (user?.isMaster) navigate("/articles");
          else navigate("/articles/staff-articles");
        })
        .catch((error) => {
          console.log(error);
          notifyError(error?.data?.message || "some thing happened");
        });
      // setTimeout(() => {
      //   navigate("/articles");
      // }, 1000);
    }
  };

  return (
    <Box
      sx={{
        pb: "100px ",
        pt: "100px",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          padding: "20px",
        }}
      >
        <form onSubmit={handleSubmit(submit)}>
          <TextField
            required
            id="title"
            margin="dense"
            label="Title"
            fullWidth
            defaultValue={article?.title}
            // value={title}
            // onChange={(e) => setTitle(e.target.value)}
            {...register("title", {
              required: "this field is required",
            })}
            error={errors.title}
            helperText={errors.title?.message}
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
              defaultValue={article?.specialtiesId}
              // onChange={setSelected}
            >
              {specialities?.result?.map((element, index) => {
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

          <Paper
            dir="ltr"
            sx={{
              border: `${errors.content ? "1px solid red" : ""}`,
              my: "10px",
            }}
          >
            <ReactQuill
              {...register("content", {
                required: "this field is required",
              })}
              theme="snow"
              // value={value}
              defaultValue={article?.content}
              onChange={(data) => setValue("content", data)}
              modules={modules}
              formats={formats}
              ref={quillRef}
              error={errors.content}
            />
          </Paper>
          {errors?.content && (
            <Typography variant="p" color="error">
              {errors?.content?.message}
            </Typography>
          )}
          <Typography
            variant="body2"
            sx={{
              my: "10px",
            }}
          >
            Edit Picture
          </Typography>
          <UploadButton
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            setImage={setImage}
          />
        </form>
        <Box py={"20px"} sx={{ display: "flex", gap: "10px" }}>
          <Button
            onClick={() => navigate(-1)}
            color="error"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(submit)}
            color="success"
            variant="contained"
          >
            Update
          </Button>
        </Box>

        {updateResult?.isLoading && (
          <IsLoadingMessage
            isLoading={updateResult?.isLoading}
            msg={"Plaese Wait While updating Article"}
          />
        )}
      </Paper>
    </Box>
  );
}
