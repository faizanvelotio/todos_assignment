import { Box, Typography } from "@mui/material";
import React, { useCallback } from "react";

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const renderCommentCard = useCallback(
    () => (
      <Box sx={{ color: "#393D46" }}>
        <Box
          sx={{
            fontFamily: "'Open Sans Condensed', sans-serif",
            fontSize: "1.2rem",
            lineHeight: "1.5rem",
          }}
        >
          {comment.name}
        </Box>
        <Typography
          variant="caption"
          component="div"
          sx={{ color: "#A8A8A8", margin: "0.15rem 0" }}
        >
          {comment.email}
        </Typography>
        <Box
          sx={{
            fontSize: "0.8rem",
            lineHeight: "1.1rem",
          }}
        >
          {comment.body}
        </Box>
      </Box>
    ),
    [comment]
  );

  return renderCommentCard();
};

export default CommentCard;
