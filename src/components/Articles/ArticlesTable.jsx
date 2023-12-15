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
import { TableHead } from "@mui/material";
import { useState } from "react";
import DeleteArticleConfirm from "./DeleteArticleConfirm";
import ActionsButton from "./ActionsButton";
import { useSelector } from "react-redux";

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
const ArticlesTable = ({
  rows,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  articlesTotalCount,
}) => {
  const { user } = useSelector((state) => state?.auth);
  // const [page, setPage] = React.useState(1);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deletedTitle, setDeletedTitle] = useState(null);
  console.log(rows);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // console.log(page,rowsPerPage)
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - articlesTotalCount) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const [open, setOpen] = useState(false);
  // const [article, setArticle] = useState();
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
              <TableCell align="center">title</TableCell>
              <TableCell align="center">Staff Name</TableCell>
              <TableCell align="center">specialist</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log(
              rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            )}
            {(rowsPerPage > 0 && rows).map((row, index) => {
              console.log(row);
              return (
                <TableRow key={row?.id}>
                  <TableCell style={{ width: "25%" }} align="center">
                    {row?.title}
                  </TableCell>
                  <TableCell style={{ width: "25%" }} align="center">
                    {row?.staffName}
                  </TableCell>
                  <TableCell style={{ width: "25%" }} align="center">
                    {row?.specialtiesName}
                  </TableCell>
                  <TableCell style={{ width: "25%" }} align="center">
                    {(row?.staffId === user?.staffId || user?.isMaster) && (
                      <ActionsButton
                        row={row}
                        setOpenDelete={setOpenDelete}
                        setDeletedTitle={setDeletedTitle}
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={12} />
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
                  { label: "All", value: articlesTotalCount },
                ]}
                colSpan={12}
                count={articlesTotalCount}
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
      <DeleteArticleConfirm
        deletedTitle={deletedTitle}
        setDeletedTitle={setDeletedTitle}
        open={openDelete}
        setOpen={setOpenDelete}
      />
    </>
  );
};

export default ArticlesTable;
