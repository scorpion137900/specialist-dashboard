import * as React from "react";
import Button from "@mui/material/Button";

import { useForm } from "react-hook-form";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { notifyError, notifySucess } from "../../utils/helper";
import {
  useGetAllBouquetsTypeQuery,
  useUpdateBouquetMutation,
} from "../../store/features/bouquet/bouquet";
import IsLoadingMessage from "../IsLoadingMessage";

export default function EditBouquet() {
  const { state } = useLocation();
  console.log(state, "stateeeeeeeeeeeeeeeeeeeeeeeeee");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!state?.id) navigate("/bouquets");
  }, [state]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const {
    data: types,
    isFetching,
    isError,
    isSuccess,
  } = useGetAllBouquetsTypeQuery();
  const [editBouquet, resultOfEditBouquet] = useUpdateBouquetMutation();

  const selectedBouquetType = types?.result?.find(
    (item) => item?.type == state?.bouquetType
  );

  //   console.log(selectedBouquetType);
  React.useEffect(() => {
    if (isError) notifyError("FAILED To GET ALL BOUQUETS TYPES");
  }, [isError]);
  const submit = async (data) => {
    if (Object.keys(errors).length === 0) {
      // const formData = new FormData();
      // formData.append("Name", data?.name);
      // formData.append("Hours", data?.hours);
      // formData.append("Price", data?.price);
      // formData.append("Description", data?.description);
      // formData.append("Reports", data?.reports);
      // formData.append("NumberOfConsutations", data?.numberOfConsultations);
      // formData.append("CanReadArticles", data?.canReadArticles);
      // formData.append("CanWatchVideo", data?.canWatchVideo);
      // formData.append("CanAddChild", data?.canAddChild);
      // formData.append("CanAttendLectures", data?.canAttendLectures);
      // formData.append("NumberOfSessions", data?.numberOfSessions);
      // formData.append("NumberOfChildren", data?.numberOfChildren);
      // formData.append("SessionDuration", data?.sessionDuration);
      // formData.append("NumberOfComments", data?.numberOfComments);
      // formData.append("BouquetTypeId", data?.bouquetTypeId);
      editBouquet({ data: data, id: state?.id })
        // addBouquet(formData)
        .unwrap()
        .then((payload) => {
          console.log(payload);
          notifySucess("Edited Successfully");
          navigate("/bouquets");
        })
        .catch((error) => notifyError(error.error));
    }
  };
  const validateNumberGreaterThanZero = (value) => {
    if (isNaN(value) || parseFloat(value) <= 0) {
      return "Please enter a valid number greater than 0";
    }
    return true;
  };
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
          <TextField
            required
            id="name"
            margin="dense"
            label="Name"
            fullWidth
            {...register("name", {
              required: "this field is required",
            })}
            error={errors.name}
            helperText={errors.name?.message}
            defaultValue={state?.name}
          />
          <TextField
            required
            multiline
            rows={3}
            id="description"
            margin="dense"
            label="Description"
            fullWidth
            {...register("description", {
              required: "this field is required",
            })}
            defaultValue={state?.description}
            error={errors.description}
            helperText={errors.description?.message}
          />
          {/* <FormControl fullWidth margin="dense" error={errors?.bouquetTypeId}>
            <InputLabel id="demo-simple-select-label">Bouquet Type</InputLabel>
            {isSuccess && (
              <Select
                required
                id="demo-simple-select"
                label="Bouquet Type"
                fullWidth
                {...register("bouquetTypeId", {
                  required: "this field is required",
                })}
                defaultValue={selectedBouquetType?.id}
                // onChange={setSelected}
              >
                {types?.result?.map((element, index) => {
                  return (
                    <MenuItem key={index} value={element?.id}>
                      {element?.duration} - {element?.type}
                    </MenuItem>
                  );
                })}
              </Select>
            )}
            {errors?.bouquetTypeId && (
              <FormHelperText>{errors?.bouquetTypeId?.message}</FormHelperText>
            )}
          </FormControl> */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                id="numberOfSessions"
                type="number"
                margin="dense"
                label="Number Of Sessions"
                fullWidth
                {...register("numberOfSessions", {
                  required: "this field is required",
                  validate: validateNumberGreaterThanZero,
                })}
                error={errors.numberOfSessions}
                helperText={errors.numberOfSessions?.message}
                defaultValue={state?.numberOfSessions}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                id="numberOfConsutations"
                type="number"
                margin="dense"
                label="Number Of Consutations"
                fullWidth
                {...register("numberOfConsutations", {
                  required: "this field is required",
                  validate: validateNumberGreaterThanZero,
                })}
                error={errors.numberOfConsutations}
                helperText={errors.numberOfConsutations?.message}
                defaultValue={state?.numberOfConsultations}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                id="numberOfChildren"
                type="number"
                margin="dense"
                label="Number Of Children"
                fullWidth
                {...register("numberOfChildren", {
                  required: "this field is required",
                  validate: validateNumberGreaterThanZero,
                })}
                error={errors.numberOfChildren}
                helperText={errors.numberOfChildren?.message}
                defaultValue={state?.numberOfChildren}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                id="numberOfComments"
                type="number"
                margin="dense"
                label="Number Of Comments"
                fullWidth
                {...register("numberOfComments", {
                  required: "this field is required",
                  validate: validateNumberGreaterThanZero,
                })}
                error={errors.numberOfComments}
                helperText={errors.numberOfComments?.message}
                defaultValue={state?.numberOfComments}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                id="sessionDuration"
                type="number"
                margin="dense"
                label="Session Duration in Minutes"
                fullWidth
                {...register("sessionDuration", {
                  required: "this field is required",
                  validate: validateNumberGreaterThanZero,
                })}
                error={errors.sessionDuration}
                helperText={errors.sessionDuration?.message}
                defaultValue={state?.sessionDuration}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                id="reports"
                type="number"
                margin="dense"
                label="Number of Reports"
                fullWidth
                {...register("reports", {
                  required: "this field is required",
                  validate: validateNumberGreaterThanZero,
                })}
                error={errors.reports}
                helperText={errors.reports?.message}
                defaultValue={state?.reports}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="price"
                type="number"
                margin="dense"
                label="Price in Dollars"
                fullWidth
                {...register("price", {
                  required: "this field is required",
                  validate: validateNumberGreaterThanZero,
                })}
                error={errors.price}
                helperText={errors.price?.message}
                defaultValue={state?.price}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="hours"
                type="number"
                margin="dense"
                label="Number Of Hours"
                fullWidth
                {...register("hours", {
                  required: "this field is required",
                  validate: validateNumberGreaterThanZero,
                })}
                error={errors.hours}
                helperText={errors.hours?.message}
                defaultValue={state?.hours}
              />
            </Grid>
          </Grid>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  {...register("canReadArticles")}
                  defaultChecked={state?.canReadArticles}
                />
              }
              label="canReadArticles"
            />
            <FormControlLabel
              control={
                <Checkbox
                  {...register("canWatchVideo")}
                  defaultChecked={state?.canWatchVideo}
                />
              }
              label="canWatchVideo"
            />
            <FormControlLabel
              control={
                <Checkbox
                  {...register("canAddChild")}
                  defaultChecked={state?.canAddChild}
                />
              }
              label="canAddChild"
            />
            <FormControlLabel
              control={
                <Checkbox
                  {...register("canAttendLectures")}
                  defaultChecked={state?.canAttendLectures}
                />
              }
              label="canAttendLectures"
            />
            <FormControlLabel
              control={
                <Checkbox
                  {...register("canAddBouquetAdds")}
                  defaultChecked={state?.canAddBouquetAdds}
                />
              }
              label="canAddBouquetAdds"
            />
          </FormGroup>
        </form>

        <Box py={"20px"} sx={{ display: "flex", gap: "10px" }}>
          <Button
            onClick={() => navigate(-1)}
            color="error"
            variant="contained"
            disabled={resultOfEditBouquet?.isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(submit)}
            color="success"
            variant="contained"
            disabled={resultOfEditBouquet?.isLoading}
          >
            Edit
          </Button>
        </Box>
      </Box>
      {resultOfEditBouquet?.isLoading && (
        <IsLoadingMessage
          isLoading={resultOfEditBouquet?.isLoading}
          msg={"Please Wait While Editing Bouquet"}
        />
      )}
    </>
  );
}
