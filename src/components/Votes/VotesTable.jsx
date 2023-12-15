import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { Delete, Visibility, VisibilityOff } from "@mui/icons-material";
import { useGetAllPatientsQuery } from "../../store/features/Patient/Patient";
import { useGetAllStaffUsersQuery } from "../../store/features/staffUser/staffUser";
import { useVotesContext } from "../../Context/Votes";

const columns = [
  { field: "id", headerName: "ID", width: 150 },
  {
    field: "voteDateTime",
    headerName: "Vote Date Time",
    width: 300,
    renderCell: (params) =>
      new Date(params?.value).toISOString().replace("T", " ").split(".")[0],
  },
  {
    field: "patientId",
    headerName: "patient Name",
    width: 300,
    renderCell: (params) => {
      const { data: patients } = useGetAllPatientsQuery();

      const patient = patients?.result?.find(
        (patient) => patient?.id === params?.value
      );

      return patient?.name;
    },
  },
  {
    field: "staffId",
    headerName: "staff Name",
    width: 300,
    renderCell: (params) => {
      const { data: staffs } = useGetAllStaffUsersQuery();

      const STAFF = staffs?.result?.find(
        (staff) => staff?.id === params?.value
      );
      return STAFF?.firstName + " " + STAFF?.lastName;
    },
  },

  {
    field: "actions",
    headerName: "Actions",
    // description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 300,
    renderCell: (params) => {
      const { setOpenDelete, setDeletedItem, setOpenView, openView } =
        useVotesContext();

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
              color="info"
              variant="contained"
              sx={{ minWidth: "30px", padding: "5px" }}
              onClick={() => {
                if (params?.row?.id === openView?.id) {
                  setOpenView(false);
                } else {
                  setOpenView(params?.row);
                }
              }}
            >
              {params?.row?.id === openView?.id ? (
                <VisibilityOff />
              ) : (
                <Visibility />
              )}
            </Button>
          </Box>
        </>
      );
    },
  },
];

export default function VotesTable({ rows }) {
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
    </>
  );
}
