import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { HostUrl } from "../../utils/constants";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { useVideosContext } from "../../Context/Videos";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
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
  { field: "title", headerName: "Title", width: 250 },
  {
    field: "Actions",
    headerName: "Actions",
    width: 300,
    sortable: false,
    renderCell: (params) => {
      const { user } = useSelector((state) => state?.auth);
      const navigate = useNavigate();
      const { setOpenDelete, setDeletedItem } = useVideosContext();
      return (
        <>
          {(params?.row?.staffId === user?.staffId || user?.isMaster) && (
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                width: "100%",
                justifyContent: "flex-start",
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
                size="small"
                variant="contained"
                endIcon={<DeleteOutline />}
                color="error"
                onClick={() => {
                  setOpenDelete(true);
                  setDeletedItem(params?.row);
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
                  navigate("/videos/edit", {
                    state: params?.row,
                  });
                }}
              >
                Update
              </Button>
            </Box>
          )}
        </>
      );
    },
  },
];
export default function SearchedTable({ videos }) {
  return (
    <>
      <DataGrid
        rows={videos}
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
      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Thumbnails</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {videos?.map((row) => (
              <TableRow
                key={row?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {console.log(`${HostUrl}${row?.thumbnail}`)}
                  {imageLoaded ? (
                    <img
                      src={`${HostUrl}${row?.thumbnail}`}
                      alt=""
                      style={{ width: "100px", borderRadius: "5px" }}
                      onError={() => setImageLoaded(false)}
                    />
                  ) : (
                    <img
                      src={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIh7-4CPys-7x6ZNxO5pw7B9zU2ib69oQ4GWAi5cH0Cw&s"
                      }
                      alt=""
                      style={{ width: "100px", borderRadius: "5px" }}
                    />
                  )}
                </TableCell>
                <TableCell align="center">{row?.title}</TableCell>

                <TableCell align="center">
                  {(row?.staffId === user?.staffId || user?.isMaster) && (
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
                        size="small"
                        variant="contained"
                        endIcon={<DeleteOutline />}
                        color="error"
                        onClick={() => {
                          setOpen(true);
                          setDeletedVideo(row);
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
                          navigate("/videos/edit", {
                            state: row,
                          });
                        }}
                      >
                        Update
                      </Button>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </>
  );
}
