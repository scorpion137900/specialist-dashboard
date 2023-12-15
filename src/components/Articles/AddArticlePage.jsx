import * as React from "react";
import Button from "@mui/material/Button";

import TextEditor from "./TextEditor";
import { useSelector } from "react-redux";
// import { addArticle } from "../../store/features/articles/articleThunk";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAddArticleMutation } from "../../store/features/articles/articlesApi";
import { notifyError, notifySucess } from "../../utils/helper";
import UploadButton from "./UploadButton";
import { useState } from "react";
import logoAnimation from "../../assets/logo.gif";
import IsLoadingMessage from "../IsLoadingMessage";
export default function AddArticlePage() {
  const { user } = useSelector((state) => state.auth);
  // const [loading, setLoading] = useState(false);
  const [addArticle, results] = useAddArticleMutation();
  const [imageUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();

  const submit = async (data) => {
    if (!image) {
      notifyError("Please Upload an Image");
      return;
    }
    if (Object.keys(errors).length === 0) {
      // setLoading(true);
      const formData = new FormData();
      formData.append("Title", data?.title);
      formData.append("Content", data?.content);
      formData.append("SpecialtiesId", data?.specialtiesId);
      formData.append("StaffId", user?.staffId);
      formData.append("ArticleImage", image);
      formData.append("StaffName", user?.name);
      await addArticle(formData)
        .unwrap()
        .then((payload) => {
          notifySucess("Added Successfully");
          if (user?.isMaster) navigate("/articles");
          else navigate("/articles/staff-articles");
          results?.reset();
        })
        .catch((err) => {
          notifyError(err?.data?.message || "Error while Adding article");
        });
    }
  };
  // if (results?.isSuccess) {
  //   notifySucess("Added Successfully");
  //   navigate("/articles");

  //   results?.reset();
  // }
  // if (results?.isError) notifyError("Error while Adding article");
  return (
    <>
      <Box
        sx={{
          background: "var(--light-color)",
          boxShadow: "var(--shadow-1)",
          p: "20px",
        }}
      >
        <form onSubmit={handleSubmit(submit)} style={{ marginBottom: "20px" }}>
          <TextEditor errors={errors} register={register} setValue={setValue} />
        </form>
        <UploadButton
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          setImage={setImage}
        />
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
            Add
          </Button>
        </Box>

        {results?.isLoading && (
          <IsLoadingMessage
            isLoading={results?.isLoading}
            msg={"Plaese Wait While Adding Article"}
          />
        )}
      </Box>
    </>
  );
}
