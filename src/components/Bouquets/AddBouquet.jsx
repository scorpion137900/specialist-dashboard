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
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { notifyError, notifySucess } from "../../utils/helper";
import {
  useAddBouquetMutation,
  useGetAllBouquetsTypeQuery,
} from "../../store/features/bouquet/bouquet";
import IsLoadingMessage from "../IsLoadingMessage";

export default function AddBouquet() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { data: types, isFetching, isError } = useGetAllBouquetsTypeQuery();
  const [addBouquet, resultOfAddBouquet] = useAddBouquetMutation();
  console.log(isError, types);
  React.useEffect(() => {
    if (isError) notifyError("FAILED To GET ALL BOUQUETS TYPES");
  }, [isError]);
  const submit = async (data) => {
    if (Object.keys(errors).length === 0) {
      addBouquet(data)
        // addBouquet(formData)
        .unwrap()
        .then((payload) => {
          console.log(payload);
          notifySucess("Added Success");
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
            error={errors.description}
            helperText={errors.description?.message}
          />
          <FormControl fullWidth margin="dense" error={errors?.bouquetTypeId}>
            <InputLabel id="demo-simple-select-label">Bouquet Type</InputLabel>

            <Select
              required
              id="demo-simple-select"
              label="Bouquet Type"
              fullWidth
              {...register("bouquetTypeId", {
                required: "this field is required",
              })}
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
            {errors?.bouquetTypeId && (
              <FormHelperText>{errors?.bouquetTypeId?.message}</FormHelperText>
            )}
          </FormControl>
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
              />
            </Grid>
          </Grid>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox {...register("canReadArticles")} />}
              label="canReadArticles"
            />
            <FormControlLabel
              control={<Checkbox {...register("canWatchVideo")} />}
              label="canWatchVideo"
            />
            <FormControlLabel
              control={<Checkbox {...register("canAddChild")} />}
              label="canAddChild"
            />
            <FormControlLabel
              control={<Checkbox {...register("canAttendLectures")} />}
              label="canAttendLectures"
            />
            <FormControlLabel
              control={<Checkbox {...register("canAddBouquetAdds")} />}
              label="canAddBouquetAdds"
            />
          </FormGroup>
        </form>

        <Box py={"20px"} sx={{ display: "flex", gap: "10px" }}>
          <Button
            onClick={() => navigate(-1)}
            color="error"
            variant="contained"
            disabled={resultOfAddBouquet?.isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(submit)}
            color="success"
            variant="contained"
            disabled={resultOfAddBouquet?.isLoading}
          >
            Add
          </Button>
        </Box>
      </Box>
      {resultOfAddBouquet?.isLoading && (
        <IsLoadingMessage
          isLoading={resultOfAddBouquet?.isLoading}
          msg={"Please Wait While Adding Bouquets"}
        />
      )}
    </>
  );
}
