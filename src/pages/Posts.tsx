import { useCallback, useContext, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { useInView } from "react-intersection-observer";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";

import getLocationId from "src/utils/getLocationId";
import Post from "src/components/Post";
import { UserContentContext } from "src/context/UserContentContext";
import { getUserPosts } from "src/api/Post";
import { ActionType } from "src/types/ActionTypes";
import TabSwitch from "src/components/TabSwitch";
import ErrorPage from "src/pages/ErrorPage";
import PostCard from "src/components/PostCard";
import { useLocation } from "react-router-dom";
import AlertMessage from "src/components/AlertMessage";
// import useFetchUser from "src/utils/useFetchUser";

const initialViewablePost: ViewPost = {
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
  const location = useLocation<LocationPropsForMsg>();
  const userId: number = getLocationId(); // Get the id parameter for URL
  // const userLoaded = useFetchUser(userId); // For future use when using to post comments
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(""); // For showing the success message
  const [viewablePost, setViewablePost] =
    useState<ViewPost>(initialViewablePost); // For displaying the selected post modal
  const { state, dispatch } = useContext(UserContentContext);
  const { userPosts } = state;
  const morePosts: boolean = !(
    userId === userPosts.userId && userPosts.complete
  ); // For checking if more posts should be loaded or not
  // For intersection observer
  const [pageNumber, setPageNumber] = useState<number>(
    userId !== userPosts.userId ? 1 : userPosts.page
  );
  const [inViewRef, inView] = useInView({ threshold: 1 });

  const openPost = useCallback((post: PostWithComment, idx: number) => {
    setViewablePost({
      post: post,
      index: idx,
    });
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

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
        setError(true);
      }
    },
    [dispatch]
  );

  const handleAlertClose = useCallback(() => setMessage(""), []);

  // When the element is in view, update the page number and
  // fetch new elements
  useEffect(() => {
    if (inView && !userPosts.complete) {
      setPageNumber((prev) => prev + 1);
    }
  }, [inView, userPosts]);

  // Fetch the userposts if a new user is there or still some update
  // page number is to be loaded
  useEffect(() => {
    if (morePosts) {
      fetchUserPosts(userId, pageNumber);
    }
  }, [userId, morePosts, fetchUserPosts, pageNumber]);

  // For displaying the success message only one time
  useEffect(() => {
    if (location.state) {
      setMessage(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const renderPosts = useCallback(
    () => (
      <Box
        sx={{
          padding: "1rem 2.5%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TabSwitch userId={userId} currentActive={"posts"} />

        <Typography
          variant="pageHeading"
          sx={{ marginLeft: "auto", marginRight: "auto" }}
        >
          Posts
        </Typography>
        <Stack
          sx={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
          spacing={5}
        >
          {error ? (
            <ErrorPage />
          ) : (
            userPosts.posts &&
            userPosts.posts.map(
              (postWithComment: PostWithComment, idx: number) => (
                <Box
                  ref={userPosts.posts.length === idx + 1 ? inViewRef : null}
                  key={postWithComment.post.id}
                  onClick={() => openPost(postWithComment, idx)}
                  sx={{ maxWidth: "1200px", width: "100%" }}
                >
                  <PostCard post={postWithComment} />
                </Box>
              )
            )
          )}
          {!userPosts.complete && (
            <Box
              sx={{
                display: "flex",
                margin: "2rem 0",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {userPosts.complete && userPosts.posts.length === 0 && (
            <Box
              sx={{
                display: "flex",
                margin: "2rem 0",
                justifyContent: "center",
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                NO POSTS CREATED
              </Typography>
            </Box>
          )}
        </Stack>
      </Box>
    ),
    [userPosts, inViewRef, openPost, error, userId]
  );

  const renderSinglePost = useCallback(
    () => (
      <Post
        open={open}
        handleClose={handleClose}
        post={viewablePost.post}
        index={viewablePost.index}
      />
    ),
    [open, handleClose, viewablePost]
  );

  const renderAlert = useCallback(
    () => (
      <AlertMessage
        message={message}
        status={"success"}
        handleClose={handleAlertClose}
      />
    ),
    [message, handleAlertClose]
  );

  return (
    <>
      {renderPosts()}
      {renderSinglePost()}
      {renderAlert()}
    </>
  );
};

export default Posts;
