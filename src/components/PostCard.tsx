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
        px: "3%",
        py: 3,
        position: "relative",
        cursor: "pointer",
      }}
    >
      <Typography
        variant="postHeading"
        component={"div"}
        mb={1.4}
        sx={{
          textTransform: "capitalize",
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
