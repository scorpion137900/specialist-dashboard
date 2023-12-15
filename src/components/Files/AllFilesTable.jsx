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
import { DeleteOutline, Edit, OpenInBrowser } from "@mui/icons-material";

import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { HostUrl } from "../../utils/constants";
import { useSelector } from "react-redux";
import FileViewer from "./FileViewer";
import DeleteFile from "./DeleteFile";
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
        {theme?.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
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

export default function AllFilesTable({
  rows,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  totalCount,
}) {
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalCount) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const { user } = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedViewerFile, setSelectedViewerFile] = useState(null);
  const [selectedDeleted, setSelectedDeleted] = useState(null);
  return (
    <>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }} dir="ltr">
        <Table
          sx={{ minWidth: "1200px", width: "100%" }}
          aria-label="custom pagination table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ width: "10%" }}>
                Thumbnails
              </TableCell>
              <TableCell align="center" style={{ width: "20%" }}>
                Title
              </TableCell>
              <TableCell align="center" style={{ width: "30%" }}>
                Description
              </TableCell>
              <TableCell align="center" style={{ width: "40%" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows?.slice(
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
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ width: "20%" }}
                  align="center"
                >
                  {row?.title}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ width: "30%" }}
                  align="center"
                >
                  {row?.description?.slice(0, 30)}...
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
                      <Button
                        sx={{
                          display: "flex",
                          gap: "10px",
                        }}
                        size="small"
                        variant="contained"
                        endIcon={<OpenInBrowser />}
                        onClick={() => {
                          setSelectedViewerFile(row);
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
                          setSelectedDeleted(row);
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
                  { label: "All", value: totalCount },
                ]}
                colSpan={12}
                count={totalCount}
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
      <FileViewer
        open={openView}
        setOpen={setOpenView}
        selectedViewerFile={selectedViewerFile}
        setSelectedViewerFile={setSelectedViewerFile}
      />
      <DeleteFile
        open={openDelete}
        setOpen={setOpenDelete}
        deletedItem={selectedDeleted}
        setDeletedItem={setSelectedDeleted}
      />
    </>
  );
}
