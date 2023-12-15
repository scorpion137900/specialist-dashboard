import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import BouquetCard from "../components/Bouquets/BouquetCard";
import CustomSkeleton from "../components/CustomSkeleton";
import { useGetAllBouquetsQuery } from "../store/features/bouquet/bouquet";
import { notifyError } from "../utils/helper";

const Bouquets = () => {
  const { data: bouquets, isFetching, isError } = useGetAllBouquetsQuery();
  console.log(bouquets?.result);
  useEffect(() => {
    if (isError) notifyError("Failed to get all Bouqeuts");
  }, [isError]);
  return (
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
          <>
            <Box
              sx={{
                width: "100%",
                // display: "grid",
                // gridTemplateColumns:
                //   "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
                display: "flex",

                flexWrap: "wrap",
                gap: 2,
                justifyContent: "center",
              }}
            >
              {bouquets?.result?.map((item, index) => (
                <BouquetCard key={item?.bouquetTypeId} item={item} />
              ))}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Bouquets;
