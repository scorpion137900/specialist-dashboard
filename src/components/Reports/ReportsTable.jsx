import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import {
  Delete,
  Edit,
  EditOff,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useReportsContext } from "../../Context/Reports";
import { useGetAllPatientsQuery } from "../../store/features/Patient/Patient";

const columns = [
  { field: "id", headerName: "ID", width: 150 },
  {
    field: "date",
    headerName: "Date",
    width: 300,
    renderCell: (params) =>
      new Date(params?.value).toISOString().replace("T", " ").split(".")[0],
  },
  {
    field: "patientId",
    headerName: "patientId",
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
    field: "actions",
    headerName: "Actions",
    // description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 300,
    renderCell: (params) => {
      const {
        setOpenDelete,
        setDeletedItem,
        setUpdatedItem,
        setOpenView,
        openView,
        updatedItem,
        editView,
        setEditView,
      } = useReportsContext();

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
                if (updatedItem && params?.row?.id === editView) {
                  setUpdatedItem(null);
                  setEditView(false);
                } else {
                  setUpdatedItem(params?.row);
                  setEditView(params?.row?.id);
                }
                setOpenView(false);
              }}
            >
              {params?.row?.id === editView ? <EditOff /> : <Edit />}
            </Button>
            <Button
              color="info"
              variant="contained"
              sx={{ minWidth: "30px", padding: "5px" }}
              onClick={() => {
                if (updatedItem && params?.row?.id === openView) {
                  setUpdatedItem(null);
                  setOpenView(false);
                } else {
                  setUpdatedItem(params?.row);
                  setOpenView(params?.row?.id);
                }
                setEditView(false);
              }}
            >
              {params?.row?.id === openView ? (
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

export default function ReportsTable({ rows }) {
  const { updatedItem, setUpdatedItem, openUpdate, setOpenUpdate } =
    useReportsContext();

  //   console.log(rows);
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
