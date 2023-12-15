import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useFilesContext } from "../../Context/Files";
import { Box, Button } from "@mui/material";
import { DeleteOutline, Edit, OpenInBrowser } from "@mui/icons-material";
import { HostUrl } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    field: "thumbnail",
    headerName: "Thumbnails",
    width: 300,
    sortable: false,
    renderCell: (params) => {
      return (
        <img
          src={`${HostUrl}${params?.row?.thumbnail}`}
          alt=""
          style={{
            width: "100px",
            borderRadius: "5px",
            objectFit: "contain",
            maxHeight: "130",
          }}
        />
      );
    },
  },
  { field: "title", headerName: "Title", width: 300 },
  { field: "description", headerName: "Description", width: 400 },
  {
    field: "Actions",
    headerName: "Actions",
    sortable: false,
    minWidth: 350,
    renderCell: (params) => {
      const {
        setOpenView,
        setOpenDelete,
        setSelectedDeleted,
        setSelectedViewerFile,
      } = useFilesContext();
      const navigate = useNavigate();
      const { user } = useSelector((state) => state?.auth);
      return (
        <Box
          sx={{
            display: "inline-flex",
            gap: "10px",
          }}
        >
          {(params?.row?.staffId === user?.staffId || user?.isMaster) && (
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                width: "100%",
                justifyContent: "center",

                "& button": {
                  display: "flex",
                  width: "fit-content",
                  gap: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "5px 10px",
                  "& span": {
                    marginRight: 0,
                  },
                },
              }}
            >
              <Button
                sx={{
                  display: "flex",
                  gap: "10px",
                }}
                size="small"
                variant="contained"
                endIcon={<OpenInBrowser />}
                onClick={() => {
                  setSelectedViewerFile(params?.row);
                  setOpenView(true);
                }}
              >
                View
              </Button>
              <Button
                size="small"
                variant="contained"
                endIcon={<DeleteOutline />}
                color="error"
                onClick={() => {
                  setOpenDelete(true);
                  setSelectedDeleted(params?.row);
                }}
              >
                Delete
              </Button>
              <Button
                size="small"
                variant="contained"
                endIcon={<Edit />}
                color="secondary"
                onClick={() => {
                  // handleOpenUpdateDialog();
                  navigate("/files/edit-file", {
                    state: params?.row,
                  });
                }}
              >
                Update
              </Button>
            </Box>
          )}
        </Box>
      );
    },
  },
];

//

export default function SearchedTable({ rows }) {
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
        getRowHeight={({ id, densityFactor, ...test }) => {
          console.log(id, densityFactor, test);
          return 150 * densityFactor;
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection={false}
        rowSelection={false}
      />
    </div>
  );
}
