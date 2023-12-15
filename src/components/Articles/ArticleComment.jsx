import React, { useState } from "react";
import { Avatar, Typography, Paper, Box, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import { notifyError, notifySucess } from "../../utils/helper";

const ArticleComment = ({
  username = "user",
  timestamp,
  content,
  userAvatar,
  id,
  refetch,
  articleId,
}) => {
  const humanDate = new Date(timestamp).toLocaleString();
  const [isLoading, setIsLoading] = useState(false);
  const deleteComment = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`${API_URL}/Comments/delete-comment?commentId=${id}`);
      notifySucess("deleted Successfully");
      refetch(articleId);
    } catch (error) {
      console.log(error);
      notifyError(error?.data?.message || "Can't Deleted");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Paper
      variant="outlined"
      sx={{
        padding: "12px",
        display: "flex",
        alignItems: "flex-start",
        mb: "10px",
        position: "relative",
      }}
    >
      <Avatar alt={username} src={userAvatar} />
      <Box sx={{ marginInlineStart: "12px", flexGrow: "1" }}>
        <Button
          variant="contained"
          color="error"
          size="small"
          disabled={isLoading}
          sx={{
            position: "absolute",
            right: "10px",
            top: "10px",
            width: "30px",
            minWidth: "30px",
            height: "30px",
          }}
          onClick={deleteComment}
        >
          <Delete />
        </Button>
        <Typography variant="subtitle2" gutterBottom>
          {username}
        </Typography>
        <Typography variant="body1">{content}</Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ textAlign: "end" }}
        >
          {humanDate}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ArticleComment;
