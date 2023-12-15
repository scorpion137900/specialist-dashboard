import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CustomSkeleton from "./CustomSkeleton";
import { useForm } from "react-hook-form";
import { useGetAllStaffUsersQuery } from "../store/features/staffUser/staffUser";
import { notifyError } from "../utils/helper";

const AllReportsAndVotesShared = ({
  btnText,
  btnNavigatePath,
  staffNavigatePath,
  errorText,
}) => {
  const navigate = useNavigate();
  const { data, isFetching, isError } = useGetAllStaffUsersQuery();
  const [searchedData, setSearchedData] = useState(null);
  useEffect(() => {
    if (isError) notifyError("Failed To Fetch");
  }, [isError]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const submitHandler = (formData) => {
    const searchedData = data?.result.filter((item) => {
      const fullName = `${item?.firstName} ${item?.lastName}`.toLowerCase();
      if (fullName?.includes(formData?.staffName?.toLowerCase())) {
        return item;
      }
    });
    setSearchedData(searchedData);
  };
  const allStaffData = searchedData ? searchedData : data?.result;

  //   console.log(data);
  return (
    <>
      <Box
        component={"form"}
        sx={{
          display: "flex",
          gap: "10px",
          paddingInlineStart: "10px",
          alignItems: "end",
          mb: "10px",
        }}
        onSubmit={handleSubmit(submitHandler)}
      >
        <TextField
          id="staffName"
          type="text"
          label="staffName"
          variant="standard"
          {...register("staffName", { required: "Required" })}
          error={!!errors?.staffName}
          helperText={errors?.staffName?.message}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          // onClick={onSubmit}
          sx={{
            width: "100px",
            height: "40px",
          }}
        >
          Search
        </Button>
        <Button
          type="button"
          variant="contained"
          color="info"
          // onClick={onSubmit}
          sx={{
            width: "100px",
            height: "40px",
          }}
          onClick={() => {
            reset();
            setSearchedData(null);
          }}
        >
          Reset
        </Button>
      </Box>
      <>
        {isFetching ? (
          <CustomSkeleton />
        ) : (
          <>
            {allStaffData?.length > 0 ? (
              <Grid
                container
                sx={{
                  margin: 0,
                }}
              >
                {allStaffData?.map((person) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={person?.id}
                    sx={{
                      cursor: "pointer",
                      padding: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        boxShadow: "0 0 2px rgba(0,0,0,.2)",
                        p: "10px",
                        borderRadius: "5px",
                        minHeight: "200px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: "20px",
                      }}
                      onClick={() => {
                        navigate(`${staffNavigatePath}${person?.id}`);
                      }}
                    >
                      <Avatar
                        alt={person?.firstName}
                        src={person?.firstName}
                        sx={{ width: 60, height: 60 }}
                      />
                      <Chip
                        label={person?.firstName + "  " + person?.lastName}
                        clickable
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <>
                <Box
                  sx={{
                    minHeight: "250px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h5">There is No {errorText}</Typography>
                </Box>
                {btnText && (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      marginTop: "10px",
                    }}
                    onClick={() => {
                      navigate(btnNavigatePath || "/");
                    }}
                  >
                    {" "}
                    {btnText}
                  </Button>
                )}
              </>
            )}
          </>
        )}
      </>
    </>
  );
};

export default AllReportsAndVotesShared;
