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
import { useEffect } from "react";
import { useRef, useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useGetAllSpecialitiesQuery } from "../../store/features/Specialities/specialitiesApi";
import { formats, modules } from "../../utils/constants";
import { notifyError } from "../../utils/helper";

const TextEditor = ({ register, errors, setValue }) => {
  const quillRef = useRef();
  const { data, isError, isSuccess } = useGetAllSpecialitiesQuery();
  const [specialities, setSpecialities] = useState([]);
  console.log(specialities);
  // const handleGetText = () => {
  //   if (quillRef.current) {
  //     const editor = quillRef.current.getEditor();
  //     const content = editor.getContents();
  //     const text = editor.getText();

  //     console.log("Content:", content);
  //     console.log("Text:", text);
  //     console.log("value", value);
  //   }
  // };
  useEffect(() => {
    setSpecialities(data?.result);
    console.log(data?.result, "data?.resultdata?.resultdata?.result");
  }, [isSuccess]);
  useEffect(() => {
    if (isError) notifyError("failed to get all specialities");
  }, [isError]);
  return (
    <>
      <TextField
        required
        id="title"
        margin="dense"
        label="Title"
        fullWidth
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
          // onChange={setSelected}
        >
          {specialities?.map((element, index) => {
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
          mt: "10px",
        }}
      >
        <ReactQuill
          {...register("content", {
            required: "this field is required",
          })}
          theme="snow"
          // value={value}
          onChange={(data) => console.log(setValue("content", data))}
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
      {/* <div dangerouslySetInnerHTML={{ __html: value }} /> */}
    </>
  );
};

export default TextEditor;
