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
import CommentInput from "src/components/CommentInput";

interface PostProps {
  open: boolean;
  post: PostWithComment;
  index: number;
  handleClose: () => void;
}

const Post: React.FC<PostProps> = ({ post, index, open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [error, setError] = useState(false);
  const { state, dispatch } = useContext(UserContentContext);
  const { currentUser } = state;
  const { email } = currentUser;

  const fetchPostComments = useCallback(
    async (postId: number, idx: number) => {
      try {
        const response: AxiosResponse<PostComment[]> = await getPostComments(
          postId
        );
        dispatch({
          type: ActionType.SET_COMMENTS_FOR_POST,
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
                <CommentInput
                  postId={post.post.id}
                  postIdx={index}
                  email={email}
                />
                {post.comments !== null ? (
                  post.comments.length ? (
                    post.comments.map((comment: PostComment) => (
                      <CommentCard comment={comment} key={comment.id} />
                    ))
                  ) : (
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", alignSelf: "center" }}
                    >
                      NO COMMENTS YET
                    </Typography>
                  )
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
    [open, post, index, error, email, fullScreen, handleClose]
  );

  return renderPost();
};

export default Post;
