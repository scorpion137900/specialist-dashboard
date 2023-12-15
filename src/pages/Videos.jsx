import { Box, Button, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchedTable from "../components/Videos/SearchedTable";
import CustomSkeleton from "../components/CustomSkeleton";
import VideoSearch from "../components/Videos/VideoSearch";
import VideosTable from "../components/Videos/VideosTable";
import YouTubeUploadButton from "../components/Videos/YouTubeUploadButton";
import {
  useGetAllVideosQuery,
  useLazySearchVideosQuery,
} from "../store/features/videos/videos";
import DeleteDialog from "../components/Videos/DeleteDialog";
import { useVideosContext } from "../Context/Videos";

const Videos = () => {
  // const fetchUrl = `https://www.googleapis.com/youtube/v3/search?key=${
  //   import.meta.env.VITE_API_KEY
  // }&channelId=${
  //   import.meta.env.VITE_CHANNEL_ID
  // }&part=snippet,id&order=date&maxResults=50`;
  // const [videos, setVideos] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       setIsLoading(true);
  //       const { data } = await axios.get(fetchUrl);
  //       const videosArr = data?.items?.map((vid) => ({
  //         ...vid,
  //         videoLink: `https://www.youtube.com/embed/${vid?.id?.videoId}`,
  //       }));
  //       setVideos(videosArr);
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   getData();
  // }, []);
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data, isFetching, isError } = useGetAllVideosQuery({
    page: page,
    pageSize: rowsPerPage,
  });
  const videos = data?.result?.videos;
  const videosTotalCount = data?.result?.videosTotalCount;

  const [open, setOpen] = useState(false);
  const [deletedVideo, setDeletedVideo] = useState(null);
  const { openDelete, setOpenDelete, deletedItem, setDeletedItem } =
    useVideosContext();
  const [trigger, { data: searchedVideos, isFetching: isFetchingSearch }] =
    useLazySearchVideosQuery();
  const [isSearchShow, setIsSearchShow] = useState(false);
  // const isSearchShow = searchedVideos?.result ? true : false;

  useEffect(() => {
    const isSearch = searchedVideos?.result?.length >= 0 ? true : false;
    setIsSearchShow(isSearch);
  }, []);

  return (
    <>
      <Box
        sx={{
          paddingTop: "100px",
          paddingBottom: "100px",
        }}
      >
        <Box
          sx={{
            boxShadow: "var(--shadow-1)",
            background: "var(--light-color)",
            p: "20px",
          }}
        >
          <VideoSearch trigger={trigger} setIsSearchShow={setIsSearchShow} />
          {isFetching || isFetchingSearch ? (
            <CustomSkeleton />
          ) : isSearchShow ? (
            <>
              {searchedVideos?.result.length > 0 ? (
                <SearchedTable videos={searchedVideos?.result} />
              ) : (
                <Typography variant="p">
                  There is No Videos with this Title
                </Typography>
              )}
            </>
          ) : videos?.length > 0 ? (
            <VideosTable
              videos={videos}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              videosTotalCount={videosTotalCount}
              setOpen={setOpenDelete}
              setDeletedVideo={setDeletedItem}
            />
          ) : (
            <>
              <p>There is no videos</p>
              {/* <YouTubeUploadButton /> */}
              <Button onClick={() => navigate("/videos/upload")}>
                Go To Add Video
              </Button>
            </>
          )}
        </Box>
      </Box>
      <DeleteDialog
        open={openDelete}
        setOpen={setOpenDelete}
        setDeletedVideo={setDeletedItem}
        deletedVideo={deletedItem}
      />
    </>
  );
};

export default Videos;
