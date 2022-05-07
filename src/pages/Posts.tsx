import { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { AxiosResponse } from "axios";
import { useInView } from "react-intersection-observer";
import { Box, CircularProgress, Grid, IconButton } from "@mui/material";

import getLocationId from "src/utils/getLocationId";
import SinglePost from "src/pages/SinglePost";
import { UserContentContext } from "src/context/UserContentContext";
import { getUserPosts } from "src/api/Post";
import { ActionType } from "src/types/ActionTypes";
import TabButton from "src/components/TabButton";

const initialViewablePost: ViewPost = {
  view: false,
  post: {
    post: {
      userId: 0,
      title: "",
      body: "",
      id: 0,
    },
    comments: [],
  },
  index: -1,
};

const Posts: React.FC = () => {
  const userId: number = getLocationId(); // Get the id parameter for URL
  const history = useHistory();
  const { state, dispatch } = useContext(UserContentContext);
  const { userPosts } = state;

  const [viewablePost, setViewablePost] =
    useState<ViewPost>(initialViewablePost);

  // For intersection observer
  const [pageNumber, setPageNumber] = useState<number>(
    userId !== userPosts.userId ? 1 : userPosts.page
  );
  const { ref, inView } = useInView({ threshold: 1 });

  const handlePostClick = useCallback((post: PostWithComment, idx: number) => {
    setViewablePost({
      view: true,
      post: post,
      index: idx,
    });
  }, []);

  const createPost = useCallback(
    () => history.push(`/users/${userId}/new_post?edit=false`),
    [history, userId]
  );

  const fetchUserPosts = useCallback(
    async (userId: number, pageNumber: number) => {
      try {
        const response: AxiosResponse<Post[]> = await getUserPosts(
          userId,
          pageNumber,
          3
        );
        dispatch({
          type: ActionType.SET_POSTS,
          payload: {
            userId: userId,
            posts: response.data,
            pageNumber: pageNumber + 1,
          },
        });
      } catch (e) {
        // Showing the error using toast
      }
    },
    [dispatch]
  );

  useEffect(() => {
    // When the element is in view, update the page number and
    // fetch new elements
    if (inView && !userPosts.complete) {
      setPageNumber((prev) => prev + 1);
    }
  }, [inView, userPosts]);

  useEffect(() => {
    // Fetch the userposts if a new user is there or still some update
    // page number is to be loaded
    if (!(userId === userPosts.userId && userPosts.complete)) {
      fetchUserPosts(userId, pageNumber);
    }
  }, [userId, userPosts, fetchUserPosts, pageNumber]);

  const renderPosts = useCallback(
    () => (
      <>
        <h1 style={{ textAlign: "center" }}>Posts</h1>
        {userPosts.posts &&
          userPosts.posts.map((postWithComment: PostWithComment, idx) => (
            <div
              key={postWithComment.post.id}
              onClick={() => handlePostClick(postWithComment, idx)}
              ref={userPosts.posts.length === idx + 1 ? ref : null}
              style={{
                minHeight: "30px",
                margin: "20px",
                padding: "30px",
                cursor: "pointer",
                border: "1px solid black",
              }}
            >
              Title: {postWithComment.post.title}
              <br />
              <br />
              <div>
                {postWithComment.post.userId + " " + postWithComment.post.id}
              </div>
              Body: {postWithComment.post.body}
            </div>
          ))}
        {!userPosts.complete && (
          <Box sx={{ margin: "1rem auto" }}>
            <CircularProgress />
          </Box>
        )}
      </>
    ),
    [userPosts, ref, handlePostClick]
  );

  return (
    <Box
      sx={{
        padding: "1rem 2.5%",
        display: "flex",
        color: "#393D46",
        flexDirection: "column",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={4} md={3} lg={2}>
          <TabButton active={true} text="Posts" />
        </Grid>
        <Grid item xs={4} md={3} lg={2}>
          <TabButton
            active={false}
            text="Todos"
            url={`/users/${userId}/todos`}
          />
        </Grid>
        <IconButton
          sx={{
            marginLeft: "auto",
          }}
          onClick={createPost}
        >
          <AddIcon sx={{ fontSize: 50, color: "primary.main" }} />
        </IconButton>
      </Grid>

      {viewablePost.view && (
        <SinglePost
          post={viewablePost.post}
          setter={setViewablePost}
          index={viewablePost.index}
        />
      )}
      {renderPosts()}
    </Box>
  );
};

export default Posts;
