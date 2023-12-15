import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { useGetAllPatientsQuery } from "../../store/features/Patient/Patient";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEditReportMutation } from "../../store/features/reports/reportsApi";
import { notifyError, notifySucess } from "../../utils/helper";
import IsLoadingMessage from "../IsLoadingMessage";
import { useReportsContext } from "../../Context/Reports";

const getDate = (dateTimeString) => {
  const dateTimeObject = new Date(dateTimeString);

  // Extract the date part
  const year = dateTimeObject.getFullYear();
  const month = String(dateTimeObject.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(dateTimeObject.getDate()).padStart(2, "0");

  const dateOnly = `${year}-${month}-${day}`;

  return dateOnly;
};
const Report = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const { setUpdatedItem, setOpenView, openView, updatedItem, setEditView } =
    useReportsContext();
  const [report, setReport] = useState(updatedItem);
  const [selectedPatient, setSelectedPatient] = useState(
    updatedItem?.patientId
  );
  useEffect(() => {
    setValue("patientId", updatedItem?.patientId);

    setSelectedPatient(updatedItem?.patientId);
    setValue("age", updatedItem?.age);
    setValue("date", getDate(updatedItem?.date));
    setValue("geneticDiseaseDetails", updatedItem?.geneticDiseaseDetails);
    setValue("chronicDiseaseDetails", updatedItem?.chronicDiseaseDetails);
    setValue("geneticDisease", updatedItem?.geneticDisease);
    setValue("chronicDisease", updatedItem?.chronicDisease);
    console.log(updatedItem);
  }, [updatedItem]);
  const { user } = useSelector((state) => state.auth);
  const { data: patients } = useGetAllPatientsQuery();
  const [editReport, resultEditReport] = useEditReportMutation();
  const submit = async (data) => {
    editReport({
      ...data,

      staffId: user?.staffId,
      id: report?.id,
    })
      .unwrap()
      .then((payload) => {
        notifySucess(payload.message || "Added Successfully");
      })
      .catch((error) => {
        notifyError(error?.data?.message || "can't Added ");
      });
  };
  return (
    <>
      <Box component={"form"} onSubmit={handleSubmit(submit)}>
        <Grid
          container
          spacing={1}
          sx={{
            margin: "0",
            mb: "20px",
            p: "20px",
            boxShadow: "inset 0 0 2px rgba(0,0,0,.4)",
            backgroundColor: "#fff",
            borderRadius: "10px",
            position: "relative",
          }}
        >
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth margin="dense" error={errors?.patientId}>
              <InputLabel id="demo-simple-select-label">Patients</InputLabel>

              <Select
                id="demo-simple-select"
                label="patients"
                fullWidth
                {...register("patientId")}
                onChange={setSelectedPatient}
                defaultValue={report?.patientId}
                value={selectedPatient}
                disabled
              >
                {patients?.result?.map((element, index) => {
                  return (
                    <MenuItem key={index} value={element?.id}>
                      {element?.name}
                    </MenuItem>
                  );
                })}
              </Select>
              {errors?.patientId && (
                <FormHelperText>{errors?.patientId?.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id={"age"}
              margin="dense"
              label={"age"}
              fullWidth
              type={"number"}
              // multiline
              // rows={1}
              defaultValue={report?.age}
              {...register(`age`, {
                required: "this field is required",
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: "Age must be greater than 0",
                },
              })}
              error={errors?.[`age`]}
              helperText={errors?.[`age`]?.message}
              disabled={openView}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id={"date"}
              margin="dense"
              label={"date"}
              fullWidth
              type={"date"}
              defaultValue={getDate(report?.date)}
              // multiline
              // rows={1}
              {...register(`date`, {
                required: "this field is required",
              })}
              error={errors?.[`date`]}
              helperText={errors?.[`date`]?.message}
              disabled={openView}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id={"geneticDiseaseDetails"}
              margin="dense"
              label={"geneticDiseaseDetails"}
              fullWidth
              multiline
              rows={3}
              type={"text"}
              // multiline
              // rows={1}
              {...register(`geneticDiseaseDetails`)}
              error={errors?.[`geneticDiseaseDetails`]}
              helperText={errors?.[`geneticDiseaseDetails`]?.message}
              defaultValue={report?.geneticDiseaseDetails}
              disabled={openView}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id={"chronicDiseaseDetails"}
              margin="dense"
              label={"chronicDiseaseDetails"}
              fullWidth
              multiline
              rows={3}
              type={"text"}
              // multiline
              // rows={1}
              {...register(`chronicDiseaseDetails`)}
              error={errors?.[`chronicDiseaseDetails`]}
              helperText={errors?.[`chronicDiseaseDetails`]?.message}
              defaultValue={report?.chronicDiseaseDetails}
              disabled={openView}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox {...register("chronicDisease")} />}
                label="chronicDisease"
                defaultChecked={report?.chronicDisease}
                disabled={openView}
              />
              <FormControlLabel
                control={<Checkbox {...register("geneticDisease")} />}
                label="geneticDisease"
                defaultChecked={report?.geneticDisease}
                disabled={openView}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              type={"submit"}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, maxWidth: "fit-content" }}
              disabled={resultEditReport?.isLoading || openView}
            >
              Edit
            </Button>
            <Button
              type="button"
              fullWidth
              color="error"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                marginInlineStart: 1,
                maxWidth: "fit-content",
              }}
              disabled={resultEditReport?.isLoading}
              onClick={() => {
                setUpdatedItem(null);
                setOpenView(false);
                setEditView(false);
              }}
            >
              CLOSE
            </Button>
          </Grid>
        </Grid>
      </Box>
      {resultEditReport?.isLoading && (
        <IsLoadingMessage
          isLoading={resultEditReport?.isLoading}
          msg={"Please Wait While Editing Report"}
        />
      )}
    </>
  );
};

export default Report;
