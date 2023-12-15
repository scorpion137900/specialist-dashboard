import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import DeleteVideoType from "./DeleteVideoType";
import { useVideoTypeContext } from "../../Context/VideoTypes";
import UpdateType from "./UpdateType";

const columns = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "type", headerName: "Type", width: 300 },

  {
    field: "actions",
    headerName: "Actions",
    // description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 300,
    renderCell: (params) => {
      const { setOpenDelete, setDeletedItem, setOpenUpdate, setUpdatedItem } =
        useVideoTypeContext();

      return (
        <>
          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <Button
              color="error"
              variant="contained"
              sx={{ minWidth: "30px", padding: "5px" }}
              onClick={() => {
                setOpenDelete(true);
                setDeletedItem(params?.row);
              }}
            >
              <Delete />
            </Button>
            <Button
              color="primary"
              variant="contained"
              sx={{ minWidth: "30px", padding: "5px" }}
              onClick={() => {
                setOpenUpdate(true);
                setUpdatedItem(params?.row);
              }}
            >
              <Edit />
            </Button>
          </Box>
        </>

        // Add your checkbox onChange logic here
      );
    },
    // valueGetter: (params) =>
    //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

export default function VideoTypesTable({ rows, openAdd, setOpenAdd }) {
  const {
    openDelete,
    setOpenDelete,
    deletedItem,
    setDeletedItem,
    updatedItem,
    setUpdatedItem,
    openUpdate,
    setOpenUpdate,
  } = useVideoTypeContext();

  console.log(rows);
  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection={false}
          rowSelection={false}
        />
      </div>
      <Button
        color="success"
        variant="contained"
        sx={{ my: "20px" }}
        onClick={() => setOpenAdd(true)}
      >
        Add Type
      </Button>
      <DeleteVideoType
        open={openDelete}
        setOpen={setOpenDelete}
        deletedItem={deletedItem}
        setDeletedItem={setDeletedItem}
      />
      <UpdateType
        open={openUpdate}
        setOpen={setOpenUpdate}
        updatedItem={updatedItem}
        setUpdatedItem={setUpdatedItem}
      />
    </>
  );
}
