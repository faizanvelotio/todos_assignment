import { useCallback, useContext, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getPostComments } from "src/api/Post";
import { ActionType } from "src/types/ActionTypes";
import { UserContentContext } from "src/context/UserContentContext";
import CommentCard from "src/components/CommentCard";

interface PostProps {
  open: boolean;
  post: PostWithComment;
  index: number;
  handleClose: () => void;
}

const Post: React.FC<PostProps> = ({ post, index, open, handleClose }) => {
  const { dispatch } = useContext(UserContentContext);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [error, setError] = useState(false);

  const fetchPostComments = useCallback(
    async (postId: number, idx: number) => {
      try {
        const response: AxiosResponse<Comment[]> = await getPostComments(
          postId
        );
        dispatch({
          type: ActionType.SET_COMMENT_FOR_POST,
          payload: { postIndex: idx, comments: response.data },
        });
      } catch (e) {
        setError(true);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (post.comments === null) {
      fetchPostComments(post.post.id, index);
    }
  }, [post, index, fetchPostComments]);

  const renderPost = useCallback(
    () => (
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        scroll={"body"}
      >
        <DialogTitle>
          <Typography
            variant="postHeading"
            sx={{
              textTransform: "capitalize",
              textAlign: "justify",
              textJustify: "inter-word",
            }}
          >
            {post.post.title}
          </Typography>
        </DialogTitle>
        <DialogContent dividers={false}>
          <Typography variant="body1">{post.post.body}</Typography>
          <Box className="post-comment-section" component={"section"} mt={3}>
            <Box
              sx={{
                fontFamily: "'Open Sans Condensed'",
                fontWeight: "bolder",
                fontSize: "1.5rem",
                letterSpacing: "0.05rem",
                marginBottom: "1rem",
              }}
            >
              Comments
            </Box>
            {!error ? (
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
                spacing={2}
                divider={<Divider flexItem />}
              >
                {post.comments ? (
                  post.comments.map((comment: Comment) => (
                    <CommentCard comment={comment} key={comment.id} />
                  ))
                ) : (
                  <CircularProgress sx={{ alignSelf: "center" }} />
                )}
              </Stack>
            ) : (
              <Box
                sx={{
                  color: "error.light",
                  fontWeight: "bold",
                  width: "fit-content",
                  margin: "0 auto",
                }}
              >
                Sorry! Unable to fetch comments
              </Box>
            )}
          </Box>
        </DialogContent>
        {fullScreen && (
          <DialogActions>
            <Button onClick={handleClose}>
              <Typography color={"primary.main"}>Close</Typography>
            </Button>
          </DialogActions>
        )}
      </Dialog>
    ),
    [open, post, error, fullScreen, handleClose]
  );

  return renderPost();
};

export default Post;
