import { useCallback, useContext, useEffect, useMemo, useState } from "react";
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
import useFetchUser from "src/utils/useFetchUser";

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
  const userId: number = getLocationId();
  const userLoaded = useFetchUser(userId);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertInfo, setAlertInfo] = useState<AlertInfo>({
    status: "success",
    message: "",
  });
  const [viewablePost, setViewablePost] =
    useState<ViewPost>(initialViewablePost);
  const { state, dispatch } = useContext(UserContentContext);
  const { userPosts } = state;
  const morePosts: boolean = useMemo(
    () => !(userId === userPosts.userId && userPosts.complete),
    [userId, userPosts.userId, userPosts.complete]
  );

  // For intersection observer
  const [pageNumber, setPageNumber] = useState<number>(
    userId !== userPosts.userId ? 1 : userPosts.page
  );
  const [inViewRef, inView] = useInView({ threshold: 1 });

  const openPost = useCallback(
    (post: PostWithComment, idx: number) => {
      setViewablePost({
        post: post,
        index: idx,
      });
      if (userLoaded) {
        setOpen(true);
      } else {
        setAlertInfo({
          status: "error",
          message: "Sorry, post cannot be opened.",
        });
      }
    },
    [userLoaded]
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleAlertClose = useCallback(
    () => setAlertInfo({ status: "success", message: "" }),
    []
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
        setError(true);
      }
    },
    [dispatch]
  );

  // When the element is in view, update the page number and
  // fetch new elements
  useEffect(() => {
    if (inView && !userPosts.complete) {
      setPageNumber((prev) => prev + 1);
    }
  }, [inView, userPosts.complete]);

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
      setAlertInfo({ status: "success", message: location.state.message });
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const renderPosts = useCallback(
    () => (
      <Box
        sx={{
          py: 2,
          px: "2.5%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TabSwitch userId={userId} currentActive={"posts"} />
        <Typography variant="pageHeading" m="auto">
          Posts
        </Typography>
        <Stack
          mt={4}
          spacing={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {error ? (
            <ErrorPage />
          ) : (
            <>
              {userPosts.posts &&
                userPosts.posts.map(
                  (postWithComment: PostWithComment, idx: number) => (
                    <Box
                      ref={
                        userPosts.posts.length === idx + 1 ? inViewRef : null
                      }
                      key={postWithComment.post.id}
                      onClick={() => openPost(postWithComment, idx)}
                      maxWidth={"lg"}
                      width={1}
                    >
                      <PostCard post={postWithComment} />
                    </Box>
                  )
                )}
              {!userPosts.complete && (
                <Box
                  my={4}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
              {userPosts.complete && userPosts.posts.length === 0 && (
                <Box my={4} display={"flex"} justifyContent={"center"}>
                  <Typography variant="body1" fontWeight={"bold"}>
                    NO POSTS CREATED
                  </Typography>
                </Box>
              )}
            </>
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
    () => <AlertMessage {...alertInfo} handleClose={handleAlertClose} />,
    [alertInfo, handleAlertClose]
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
