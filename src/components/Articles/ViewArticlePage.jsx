import * as React from "react";
import Button from "@mui/material/Button";

import {
  Avatar,
  Chip,
  IconButton,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetArticleQuery } from "../../store/features/articles/articlesApi";
import CustomSkeleton from "../CustomSkeleton";
import { notifyError } from "../../utils/helper";
import {
  ChatBubbleOutlineOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import ArticleComment from "./ArticleComment";
import { HostUrl } from "../../utils/constants";

export default function ViewArticlePage() {
  const { state } = useLocation();
  const articleData = state?.article;
  // console.log(article);
  const { id } = useParams();
  const { data, isFetching, isError, refetch } = useGetArticleQuery(id);
  const article = data?.result;
  const dateTime = new Date(articleData?.articleCreationDate);
  const humanReadableDate = dateTime.toLocaleString();
  const navigate = useNavigate();
  const [showMore, setShowMore] = React.useState(false);
  const commentsShowed = showMore
    ? article?.comments
    : article?.comments?.slice(-2);
  if (isFetching)
    return (
      <Box
        sx={{
          pb: "100px ",
          pt: "100px",
        }}
      >
        {" "}
        <CustomSkeleton />{" "}
      </Box>
    );
  if (isError) notifyError("This Article not found");
  if (!isFetching && !data && !articleData) navigate("/articles");
  return (
    <Box
      sx={{
        pb: "100px ",
        pt: "100px",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          padding: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Avatar />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                fontSize: "16px",
              }}
            >
              <Typography variant="h6">{articleData?.staffName}</Typography>

              <Typography variant="p">
                {articleData?.specialtiesName}
              </Typography>
              <Typography variant="p">{humanReadableDate}</Typography>
            </Box>
          </Box>

          <Chip
            label={`${articleData?.canView ? "Can View" : "Can't Viewed"}`}
            color={`${articleData?.canView ? "success" : "error"}`}
          />
        </Box>
        <Box
          component={"img"}
          src={`${HostUrl}${articleData?.articleImage}`}
          alt=""
          sx={{
            width: "100%",
            maxHeight: "500px",
            objectFit: "contain",
          }}
        />
        <Box>
          <Typography variant="h4" my="10px">
            {articleData?.title}
          </Typography>
          <Box
            sx={{
              wordBreak: " break-word",
              "& img": {
                width: "100%",
              },
            }}
            dangerouslySetInnerHTML={{ __html: article?.articleContent }}
          ></Box>
        </Box>
        {/* Like and Comment Buttons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "12px",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ marginRight: "16px" }}
            >
              {article?.likesCount}
            </Typography>
            <IconButton color="primary" aria-label="Like">
              <ThumbUpAltOutlined />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" color="textSecondary">
              {article?.comments?.length}
            </Typography>
            <IconButton color="primary" aria-label="Comment">
              <ChatBubbleOutlineOutlined />
            </IconButton>
          </Box>
        </Box>
        {commentsShowed?.map((comment) => (
          <ArticleComment
            content={comment?.content}
            key={comment?.id}
            timestamp={comment?.commentCreationDate}
            id={comment?.id}
            refetch={refetch}
            articleId={id}
          />
        ))}
        {article?.comments.length > 2 && (
          <Typography
            variant="p"
            sx={{
              cursor: "pointer",
            }}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "show Less" : "show More"}
          </Typography>
        )}
        {article?.comments.length === 0 && (
          <Typography variant="p">
            There is No Comments For This Article
          </Typography>
        )}
      </Paper>
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
}
