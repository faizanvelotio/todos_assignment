import { Paper, Typography } from "@mui/material";
import React from "react";

interface PostCardProps {
  post: PostWithComment;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Paper
      elevation={4}
      sx={{
        padding: "1.5rem 3%",
        position: "relative",
        cursor: "pointer",
        color: "#393D46",
      }}
    >
      <Typography
        variant="postHeading"
        component={"div"}
        sx={{
          textTransform: "capitalize",
          marginBottom: "0.7rem",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {post.post.title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {post.post.body}
      </Typography>
    </Paper>
  );
};

export default PostCard;
