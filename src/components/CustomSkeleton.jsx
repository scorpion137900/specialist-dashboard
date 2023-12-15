import { Skeleton } from "@mui/material";
import { Box } from "@mui/system";

const CustomSkeleton = () => {
  return (
    <Box>
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
    </Box>
  );
};

export default CustomSkeleton;
