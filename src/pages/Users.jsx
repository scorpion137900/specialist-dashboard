import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import CustomSkeleton from "../components/CustomSkeleton";
import IsLoadingMessage from "../components/IsLoadingMessage";
import UsersTable from "../components/Users/UsersTable";
import { useIsLoadingActiveContext } from "../Context/isLoadingActivity";
import { useGetAllUsersQuery } from "../store/features/users/users";

const Users = () => {
  const { data, isFetching, isError } = useGetAllUsersQuery();
  const { isLoadingActivity } = useIsLoadingActiveContext();
  //   console.log(data?.result);

  return (
    <>
      <Box
        sx={{
          paddingTop: "100px",
          paddingBottom: "100px",
        }}
      >
        <Box
          sx={{
            boxShadow: "var(--shadow-1)",
            background: "var(--light-color)",
            p: "20px",
          }}
        >
          {isFetching ? (
            <CustomSkeleton />
          ) : (
            <UsersTable rows={data?.result || []} />
          )}
        </Box>
      </Box>
      {isLoadingActivity && (
        <IsLoadingMessage
          msg={"Plaese Wait While updating User Active "}
          isLoading={isLoadingActivity}
        />
      )}
    </>
  );
};

export default Users;
