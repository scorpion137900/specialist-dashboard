import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CustomSkeleton from "../components/CustomSkeleton";
import SpecialitiesTable from "../components/Specialities/SpecialitiesTable";
import {
  useGetAllSpecialitiesQuery,
  useLazySearchSpecialitiseQuery,
} from "../store/features/Specialities/specialitiesApi";
import { notifyError } from "../utils/helper";
import AddSpecialitise from "../components/Specialities/AddSpecialitise";

const Specialities = () => {
  const { data, isFetching, isError, isSuccess } = useGetAllSpecialitiesQuery();
  const [openAdd, setOpenAdd] = useState(false);
  // const [isSearchedShowed, setIsSearchedShowed] = useState(false);
  // const [
  //   trigger,
  //   {
  //     data: searchedSpecialists,
  //     isError: error,
  //     isFetching: isFetchingSearch,
  //     isSuccess: success,
  //   },
  // ] = useLazySearchSpecialitiseQuery();
  // const specialitiesData = isSearchedShowed
  //   ? searchedSpecialists?.result
  //     ? [searchedSpecialists?.result]
  //     : null
  //   : data?.result;
  // console.log(specialitiesData);
  // const {
  //   handleSubmit,
  //   register,
  //   formState: { errors },
  //   setValue,
  //   reset,
  // } = useForm({
  //   mode: "onSubmit",
  // });
  // const onSubmit = async (data) => {
  //   console.log(data);
  //   setIsSearchedShowed(true);
  //   trigger(data?.specialtise)
  //     .unwrap()
  //     .then((payload) => {
  //       // console.log('fulfilled', payload)
  //     })
  //     .catch((error) => {
  //       setIsSearchedShowed(false);
  //       console.error("rejected", error);
  //       notifyError("failed to search");
  //     });
  // };
  // if (error) notifyError("failed to search");
  useEffect(() => {
    if (isError) notifyError("failed to get specialitise");
  }, []);
  // if (isFetchingSearch || isFetching) return <CustomSkeleton />;
  return (
    <Box
      sx={{
        py: "100px",
      }}
    >
      <Box
        sx={{
          background: "var(--light-color)",
          boxShadow: "var(--shadow-1)",
          p: "20px",
        }}
      >
        {isFetching ? (
          <CustomSkeleton />
        ) : (
          <>
            {/* <Box
              component={"form"}
              onSubmit={handleSubmit(onSubmit)}
              action=""
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <TextField
                size="small"
                sx={{ my: "20px" }}
                variant="outlined"
                label="search "
                {...register("specialtise", {
                  required: "this field is required",
                })}
                error={!!errors?.specialtise}
                helperText={errors?.specialtise?.message}
              />
              <Button
                type="button"
                variant="contained"
                color="info"
                onClick={() => {
                  reset();
                  setIsSearchedShowed(false);
                }}
              >
                Reset
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Search
              </Button>
            </Box> */}
            {data?.result?.length > 0 ? (
              <SpecialitiesTable
                specialities={data?.result}
                openAdd={openAdd}
                setOpenAdd={setOpenAdd}
              />
            ) : (
              <>
                <Typography variant="h5"> There is no Specialitises</Typography>
                <Button
                  color="primary"
                  sx={{
                    mt: "20px",
                  }}
                  variant="contained"
                  onClick={() => setOpenAdd(true)}
                >
                  Add Specialitise
                </Button>
              </>
            )}
          </>
        )}
        <AddSpecialitise open={openAdd} setOpen={setOpenAdd} />
      </Box>
    </Box>
  );
};

export default Specialities;
