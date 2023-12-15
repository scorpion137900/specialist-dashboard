import { Avatar, Button, Chip, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { notifyError } from "../../utils/helper";
import CustomSkeleton from "../CustomSkeleton";

const VideoDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [video, setVideo] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getVideoDetails = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          ` https://www.googleapis.com/youtube/v3/videos?key=${
            import.meta.env.VITE_API_KEY
          }&part=snippet&id=${id}`
        );
        console.log(data);
        setVideo(data);
      } catch (err) {
        notifyError("some thing wrong happend");
        navigate("/videos");
      } finally {
        setIsLoading(false);
      }
    };
    getVideoDetails();
  }, [id]);
  const dateTime = new Date(video?.items?.[0]?.snippet?.publishedAt);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "UTC",
  };
  const humanReadableDate = dateTime.toLocaleString("en-US", options);
  return (
    <Box
      sx={{
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
    >
      {isLoading ? (
        <CustomSkeleton />
      ) : (
        <Paper
          sx={{
            padding: "10px",
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            width={"100%"}
            height="600px"
            style={{
              margin: "20px auto",
              borderRadius: "10px",
              display: !iframeLoaded ? "none" : "",
            }}
            onLoad={() => setIframeLoaded(true)}
          ></iframe>
          {iframeLoaded ? null : <CustomSkeleton />}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              <Avatar />
              {video?.items?.[0]?.snippet?.channelTitle}
            </Typography>
            <Typography variant="p">{humanReadableDate}</Typography>
          </Box>
          <Typography variant="h6" sx={{ margin: "10px 0" }}>
            {video?.items?.[0]?.snippet?.title}
          </Typography>
          <Typography variant="p">
            {video?.items?.[0]?.snippet?.description}
          </Typography>
          <Box
            sx={{
              margin: "20px 0",
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {video?.items?.[0]?.snippet?.tags?.map((tag, index) => (
              <Chip key={index} label={tag} />
            ))}
          </Box>
        </Paper>
      )}
      <Button
        onClick={() => navigate(-1)}
        color="error"
        variant="contained"
        sx={{
          my: "10px",
        }}
      >
        Back
      </Button>
    </Box>
  );
};

export default VideoDetails;
