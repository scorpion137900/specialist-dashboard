import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import DeleteArticleConfirm from "./DeleteArticleConfirm";
import { useNavigate } from "react-router-dom";
import ActionsButton from "./ActionsButton";
import { useSelector } from "react-redux";
export default function SearchedTable({ articles, staffId }) {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deletedTitle, setDeletedTitle] = React.useState(null);
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <TableContainer component={Paper} dir="ltr">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">title</TableCell>
              <TableCell align="center">Staff Name </TableCell>
              <TableCell align="center">specialist</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles?.map((article) => (
              <TableRow key={article?.id}>
                <TableCell style={{ width: "25%" }} align="center">
                  {article?.title}
                </TableCell>
                <TableCell style={{ width: "25%" }} align="center">
                  {article?.staffName}
                </TableCell>
                <TableCell style={{ width: "25%" }} align="center">
                  {article?.specialtiesName}
                </TableCell>
                <TableCell style={{ width: "25%" }} align="center">
                  {console.log(article?.staffId, user?.staffId, article, user)}
                  {/* {(article?.staffId === user?.staffId || user?.isMaster) && ( */}
                  <ActionsButton
                    setDeletedTitle={setDeletedTitle}
                    setOpenDelete={setOpenDelete}
                    row={article}
                  />
                  {/* )} */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
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
}
