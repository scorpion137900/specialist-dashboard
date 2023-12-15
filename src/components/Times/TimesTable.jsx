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
import ConfirmDialog from "./ConfirmDialog";
import UpdateTime from "./UpdateTime";
import { useSelector } from "react-redux";
import CheckActiveTimeStatus from "./CheckActiveTimeStatus";
import { useState } from "react";
import IsLoadingMessage from "../IsLoadingMessage";

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
    <Box sx={{ flexShrink: 0 }}>
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
const TimesTable = ({ rows }) => {
  const [open, setOpen] = React.useState(false);
  const [upadteDialogOpen, setUpadteDialogOpen] = React.useState(false);
  const [deletedTimeId, setDeletedTimeId] = React.useState(null);
  const [updateTime, setUpdatedTime] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleOpenDeleteConfirm = (timeId) => {
    setDeletedTimeId(timeId);
    setOpen(true);
  };
  const handleOpenUpdateDialog = (time) => {
    setUpdatedTime(time);
    setUpadteDialogOpen(true);
  };
  const { user } = useSelector((state) => state?.auth);
  const [isLoadingActive, setIsLoadingActive] = useState();
  return (
    <>
      <TableContainer component={Paper} dir="ltr" id="table">
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead
            sx={{
              "& .MuiTableCell-root.MuiTableCell-head ": {
                fontWeight: "bold",
                color: "text.main",
                fontSize: "1rem",
              },
            }}
          >
            <TableRow>
              <TableCell align="center">availableTime</TableCell>
              <TableCell align="center">availableTime</TableCell>
              {/* <TableCell align="center">availableTimeDay</TableCell>
              <TableCell align="center">availableTimeMonth</TableCell> */}
              <TableCell align="center">Actions</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, index) => (
              <TableRow key={row?.timeId}>
                <TableCell style={{ width: "30%" }} align="center">
                  {row?.availableTime}
                </TableCell>
                {/* <TableCell style={{ width: "20%" }} align="center">
                  {row?.availableTimeDay}
                </TableCell>
                <TableCell style={{ width: "20%" }} align="center">
                  {row?.availableTimeMonth}
                </TableCell> */}
                <TableCell style={{ width: "40%" }} align="center">
                  {(row?.staffId === user?.staffId || user?.isMaster) && (
                    <Box
                      sx={{
                        display: "inline-flex",
                        gap: "10px",
                      }}
                    >
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => handleOpenDeleteConfirm(row?.timeId)}
                      >
                        Delete
                      </Button>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => handleOpenUpdateDialog(row)}
                      >
                        Update
                      </Button>
                    </Box>
                  )}
                </TableCell>
                <TableCell
                  style={{ width: "30%", minWidth: "200px" }}
                  align="center"
                >
                  {(row?.staffId === user?.staffId || user?.isMaster) && (
                    <Box
                      sx={{
                        display: "inline-flex",
                        gap: "10px",
                      }}
                    >
                      <CheckActiveTimeStatus
                        id={row?.timeId}
                        checked={row?.isActive}
                        setIsLoadingActive={setIsLoadingActive}
                      />
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={12} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={12}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  // native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <ConfirmDialog
        open={open}
        setOpen={setOpen}
        deletedTimeId={deletedTimeId}
      />
      <UpdateTime
        open={upadteDialogOpen}
        setOpen={setUpadteDialogOpen}
        time={updateTime}
      />
      {isLoadingActive && (
        <IsLoadingMessage
          msg={"Plaese Wait While updating Time Status Active "}
          isLoading={isLoadingActive}
        />
      )}
    </>
  );
};

export default TimesTable;
