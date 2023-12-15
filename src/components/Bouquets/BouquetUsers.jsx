import React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { useGetBouquetUsersQuery } from "../../store/features/bouquet/bouquet";
import { Box, Skeleton, Typography } from "@mui/material";

const BouquetUsers = ({ id }) => {
  const { data: users, isFetching, isError } = useGetBouquetUsersQuery(id);
  console.log(users);
  if (users?.result == null)
    return <Typography variant="span">{users?.message}</Typography>;
  if (isFetching) return <Skeleton variant="circular" width={40} height={40} />;
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <AvatarGroup total={users?.result?.length} max={4}>
        {users?.result?.map((item) => (
          <Avatar
            {...stringAvatar(`${item?.name}`)}
            src="/static/images/avatar/1.jpg"
            alt={item?.name}
            key={`${item?.patientId} - ${item?.userId} `}
          />
        ))}
      </AvatarGroup>
    </Box>
  );
};

export default BouquetUsers;
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 30,
      height: 30,
    },
  };
}
