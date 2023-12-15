import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Button, TableHead } from "@mui/material";
import { DeleteOutline, Edit } from "@mui/icons-material";

import { useState } from "react";
import UpdateDialog from "./UpdateDialog";
import { useNavigate } from "react-router-dom";
import { HostUrl } from "../../utils/constants";
import { useSelector } from "react-redux";
// import YouTubeUploadButton from "./YouTubeUploadButton";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function videosTable({
  videos,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  videosTotalCount,

  setOpen,

  setDeletedVideo,
}) {
  const [imageLoaded, setImageLoaded] = useState(true);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - videosTotalCount) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.auth);
  return (
    <>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }} dir="ltr">
        <Table
          sx={{ minWidth: "1000px", width: "100%" }}
          aria-label="custom pagination table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ width: "10%" }}>
                Thumbnails
              </TableCell>
              <TableCell align="center" style={{ width: "50%" }}>
                Title
              </TableCell>
              <TableCell align="center" style={{ width: "40%" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? videos?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : videos
            ).map((row) => (
              <TableRow key={row?.id}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ width: "10%" }}
                  align="center"
                >
                  <img
                    src={`${HostUrl}${row?.thumbnail}`}
                    alt=""
                    style={{ width: "100px", borderRadius: "5px" }}
                  />
                  {console.log(`${HostUrl}${row?.thumbnail}`)}
                  {/* {console.log(`${HostUrl}${row?.thumbnail}`)}
                  {imageLoaded ? (
                    <img
                      src={`${HostUrl}${row?.thumbnail}`}
                      alt=""
                      style={{ width: "100px", borderRadius: "5px" }}
                      // onError={() => setImageLoaded(false)}
                      // onLoad={() => setImageLoaded(true)}
                    />
                  ) : (
                    <img
                      src={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIh7-4CPys-7x6ZNxO5pw7B9zU2ib69oQ4GWAi5cH0Cw&s"
                      }
                      alt=""
                      style={{ width: "100px", borderRadius: "5px" }}
                    />
                  )} */}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ width: "50%" }}
                  align="center"
                >
                  {row?.title}
                </TableCell>
                <TableCell align="center" width={"40%"}>
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
                      {/* <Button
                      sx={{
                        display: "flex",
                        gap: "10px",
                      }}
                      size="small"
                      variant="contained"
                      endIcon={<LaunchIcon />}
                      onClick={() => {
                        console.log(row?.id);
                        navigate(navigate(`${row?.id}`));
                      }}
                    >
                      View Details
                    </Button> */}
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

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[
                  5,
                  10,
                  25,
                  { label: "All", value: videosTotalCount },
                ]}
                colSpan={12}
                count={videosTotalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {/* <YouTubeUploadButton /> */}

      <UpdateDialog open={openUpdateDialog} setOpen={setOpenUpdateDialog} />
    </>
  );
}
