import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import CheckActiveUser from "./CheckActiveUser";
const columns = [
  { field: "id", headerName: "ID", minWidth: 120 },
  { field: "userName", headerName: "user Name", minWidth: 300 },
  {
    field: "email",
    headerName: "Email",
    // valueGetter: (params) => `${params?.row?.email || ""} `,
    sortable: false,
    // width: "20%",
    minWidth: 400,
  },
  { field: "role", headerName: "Role", sortable: false, minWidth: 250 },
  {
    field: "userActive",
    headerName: "User Active",
    sortable: false,
    minWidth: 250,
    renderCell: (params) => {
      return (
        <CheckActiveUser
          checked={params.value}
          id={params?.id}
          // Add your checkbox onChange logic here
        />
      );
    },
  },

  //   {
  //     field: "fullName",
  //     headerName: "Full name",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     valueGetter: (params) =>
  //       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  //   },
];

export default function UsersTable({ rows }) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 15, 20]}
        // checkboxSelection
        rowSelection={false}
      />
    </div>
  );
}
