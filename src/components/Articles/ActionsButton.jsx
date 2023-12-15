import { Box, Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ActionsButton = ({ row, setOpenDelete, setDeletedTitle }) => {
  const { user } = useSelector((state) => state.auth);
  console.log(row?.staffId === user?.staffId || user?.isMaster);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "inline-flex",
        gap: "10px",
      }}
    >
      <Button
        color="info"
        variant="contained"
        onClick={() =>
          navigate(`/articles/${row?.id}`, {
            state: {
              article: row,
            },
          })
        }
      >
        View
      </Button>
      {/* {row?.staffId === user?.staffId || user?.isMaster ? ( */}
      <>
        <Button
          color="success"
          variant="contained"
          onClick={() =>
            navigate(`/articles/update-article/${row?.id}`, {
              state: {
                article: row,
              },
            })
          }
        >
          Edit
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={() => {
            setOpenDelete(true);
            setDeletedTitle(row);
          }}
        >
          Delete
        </Button>
      </>
      {/* ) : null} */}
    </Box>
  );
};

export default ActionsButton;
