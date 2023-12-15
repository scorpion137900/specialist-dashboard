import React from "react";
import CustomBox from "../CustomBox";
import { useForm } from "react-hook-form";
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
import {
  useAddReportMutation,
  useGetStaffReportsQuery,
} from "../../store/features/reports/reportsApi";
import { useSelector } from "react-redux";
import { notifyError, notifySucess } from "../../utils/helper";
import IsLoadingMessage from "../IsLoadingMessage";
import { useGetAllPatientsQuery } from "../../store/features/Patient/Patient";

const AddReport = () => {
  const [addReport, resultOfAddReport] = useAddReportMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const { user } = useSelector((state) => state.auth);
  const submit = async (data) => {
    addReport({
      ...data,

      staffId: user?.staffId,
    })
      .unwrap()
      .then((payload) => {
        console.log(payload);
        notifySucess(payload.message || "Added Successfully");
      })
      .catch((error) => {
        console.log(error);
        notifyError(error?.data?.message || "can't Added ");
      })
      .finally(() => {
        reset();
      });
  };
  const { data: patients, isFetching } = useGetAllPatientsQuery();
  const { data: staffReports } = useGetStaffReportsQuery(user?.staffId);
  const OPTIONS = patients?.result?.filter((patient) => {
    return !staffReports?.result
      ?.map((entry) => entry.patientId)
      .includes(patient.id);
  });

  return (
    <>
      <CustomBox>
        <Box component={"form"} onSubmit={handleSubmit(submit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth margin="dense" error={errors?.patientId}>
                <InputLabel id="demo-simple-select-label">Patients</InputLabel>

                <Select
                  required
                  id="demo-simple-select"
                  label="patients"
                  fullWidth
                  {...register("patientId", {
                    required: "this field is required",
                  })}
                  // onChange={setSelected}
                >
                  {OPTIONS?.map((element, index) => {
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
                // multiline
                // rows={1}
                {...register(`date`, {
                  required: "this field is required",
                })}
                error={errors?.[`date`]}
                helperText={errors?.[`date`]?.message}
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox {...register("chronicDisease")} />}
                  label="chronicDisease"
                />
                <FormControlLabel
                  control={<Checkbox {...register("geneticDisease")} />}
                  label="geneticDisease"
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Button
            onClick={handleSubmit(submit)}
            color="success"
            variant="contained"
            sx={{
              mt: "20px",
            }}
            disabled={resultOfAddReport?.isLoading}
          >
            Add
          </Button>
        </Box>
      </CustomBox>
      {resultOfAddReport?.isLoading && (
        <IsLoadingMessage
          isLoading={resultOfAddReport?.isLoading}
          msg={"Adding..."}
        />
      )}
    </>
  );
};

export default AddReport;
