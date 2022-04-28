import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useLocationId from "src/utils/useLocationId";
import SinglePost from "src/pages/SinglePost";
import { UserContentContext } from "src/context/UserContentContext";
import { getUserPosts } from "src/api/Post";
import { ActionType } from "src/ActionTypes";
import { AxiosResponse } from "axios";

const initialViewablePost: ViewPost = {
  view: false,
  post: {
    post: {
      userid: 0,
      title: "",
      body: "",
      id: 0,
    },
    comments: [],
  },
  index: -1,
};

const Posts: React.FC = () => {
  const userId: number = useLocationId(); // Get the id parameter for URL
  const [isLoading, setIsLoading] = useState(true); // If the posts are loading or not
  const [viewablePost, setViewablePost] =
    useState<ViewPost>(initialViewablePost);

  const { state, dispatch } = useContext(UserContentContext);
  const { userPosts } = state;

  const handlePostClick = useCallback((post: PostWithComment, idx: number) => {
    setViewablePost({
      view: true,
      post: post,
      index: idx,
    });
  }, []);

  const fetchUserPosts = useCallback(
    async (userId: number) => {
      try {
        const response: AxiosResponse<Post[]> = await getUserPosts(userId);
        dispatch({
          type: ActionType.SET_POSTS,
          payload: { userId: userId, posts: response.data },
        });
      } catch (e) {
        // Showing the error using toast
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    // If the posts in the state is of different user, then update the state,
    // else render with the same data in the state
    if (userId !== userPosts.userId) {
      fetchUserPosts(userId);
    } else {
      setIsLoading(false);
    }
  }, [userId, userPosts, fetchUserPosts]);

  const renderPosts = useCallback(
    () => (
      <>
        <h1 style={{ textAlign: "center" }}>Posts</h1>
        {userPosts.posts &&
          userPosts.posts.map((postWithComment: PostWithComment, idx) => (
            <div
              key={postWithComment.post.id}
              onClick={() => handlePostClick(postWithComment, idx)}
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
              Body: {postWithComment.post.body}
            </div>
          ))}
      </>
    ),
    [userPosts, handlePostClick]
  );

  return (
    <div>
      <div style={{ marginTop: "20px" }}>
        <Link to={`/users/${userId}/todos`}>
          <button>Go to Todos</button>
        </Link>
        <Link to={`/users/${userId}/new_post?edit=false`}>
          <button>Create a post</button>
        </Link>
      </div>
      {viewablePost.view && (
        <SinglePost
          post={viewablePost.post}
          setter={setViewablePost}
          index={viewablePost.index}
        />
      )}
      {isLoading ? <div>Loading...</div> : renderPosts()}
    </div>
  );
};

export default Posts;
