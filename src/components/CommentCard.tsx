import { Box, Typography } from "@mui/material";
import React from "react";

interface CommentCardProps {
  comment: PostComment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <Box sx={{ color: "fontGray" }}>
      <Typography variant="commentTitle">{comment.name}</Typography>
      <Typography
        my={0.15}
        variant="caption"
        component="div"
        color="fontLightGray"
      >
        {comment.email}
      </Typography>
      <Typography variant="commentBody" component="div">
        {comment.body}
      </Typography>
    </Box>
  );
};

export default CommentCard;
