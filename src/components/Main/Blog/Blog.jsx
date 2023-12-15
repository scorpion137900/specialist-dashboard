import { Button, Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "./BlogCard";

const Blog = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: "20px",
        }}
      >
        <Typography
          component={"h5"}
          variant={"h5"}
          sx={{
            fontWeight: "700",
          }}
        >
          المدونة
        </Typography>
        <Button onClick={() => navigate("/blogs")} variant="contained">
          جميع المقالات
        </Button>
      </Box>
      <div
        style={{
          backgroundColor: "var(--border-color)",
          height: "1px",
          marginBottom: "40px",
        }}
      />
      <Grid container spacing={2}>
        <BlogCard />
      </Grid>
    </Container>
  );
};

export default Blog;
