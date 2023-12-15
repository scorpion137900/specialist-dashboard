import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import DeleteSpecialitise from "./DeleteSpecialitise";
import UpdateSpecialitise from "./UpdateSpecialitise";
import { useSpecialistContext } from "../../Context/Specialist";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 120 },
  { field: "name", headerName: "name", width: 250 },
  {
    field: "Actions",
    headerName: "Actions",
    sortable: false,
    minWidth: 250,
    renderCell: (params) => {
      const { setUpdatedItem, setDeletedItem, setOpenUpdate, setOpenDelete } =
        useSpecialistContext();
      return (
        <Box
          sx={{
            display: "inline-flex",
            gap: "10px",
          }}
        >
          <Button
            color="success"
            variant="contained"
            onClick={() => {
              setUpdatedItem(params?.row);
              setOpenUpdate(true);
            }}
          >
            Edit
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              setDeletedItem(params?.row);
              setOpenDelete(true);
            }}
          >
            Delete
          </Button>
        </Box>
      );
    },
  },
];
export default function SpecialitiesTable({
  specialities,
  openAdd,
  setOpenAdd,
}) {
  const {
    openDelete,
    setOpenDelete,
    deletedItem,
    setDeletedItem,
    updatedItem,
    setUpdatedItem,
    openUpdate,
    setOpenUpdate,
  } = useSpecialistContext();
  console.log(specialities);
  return (
    <>
      <DataGrid
        rows={specialities}
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
      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {specialities?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" align="center" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: "inline-flex",
                      gap: "10px",
                    }}
                  >
                    <Button
                      color="success"
                      variant="contained"
                      onClick={() => {
                        setUpdatedItem(row);
                        setOpenUpdate(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => {
                        setDeletedItem(row);
                        setOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
      <Button
        color="primary"
        variant="contained"
        sx={{
          mt: "20px",
        }}
        onClick={() => setOpenAdd(true)}
      >
        Add Specialitise
      </Button>
      <DeleteSpecialitise
        open={openDelete}
        setOpen={setOpenDelete}
        deletedItem={deletedItem}
        setDeletedItem={setDeletedItem}
      />
      <UpdateSpecialitise
        open={openUpdate}
        setOpen={setOpenUpdate}
        updatedItem={updatedItem}
        setUpdatedItem={setUpdatedItem}
      />
    </>
  );
}
