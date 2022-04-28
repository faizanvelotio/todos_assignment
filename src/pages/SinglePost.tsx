import { UserContentContext } from "src/context/UserContentContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { getPostComments } from "src/api/Post";
import { ActionType } from "src/ActionTypes";
import { AxiosResponse } from "axios";
interface SinglePostProps {
  post: PostWithComment;
  index: number;
  setter: React.Dispatch<React.SetStateAction<ViewPost>>;
}

const SinglePost: React.FC<SinglePostProps> = ({ post, index, setter }) => {
  const { dispatch } = useContext(UserContentContext);
  const [isLoading, setIsLoading] = useState(true);

  const closeSinglePostDialog = useCallback(() => {
    setter((prevState) => ({ ...prevState, view: false }));
  }, [setter]);

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
        // Showing the error using toast
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (post.comments === null) {
      fetchPostComments(post.post.id, index);
    } else {
      setIsLoading(false);
    }
  }, [post, index, fetchPostComments]);

  const renderSinglePost = useCallback(() => {
    if (post.comments && post.comments.length === 0) {
      return <div>No comments yet</div>;
    } else {
      return (
        <div>
          <h3>Comments</h3>
          {post.comments &&
            post.comments.map((comment: Comment) => {
              return (
                <div
                  key={comment.id}
                  style={{
                    border: "1px dotted black",
                    textAlign: "center",
                  }}
                >
                  <div>{comment.name + "  (" + comment.email + ")"}</div>
                  <div>{comment.body}</div>
                </div>
              );
            })}
        </div>
      );
    }
  }, [post]);
  return (
    <div>
      <h2 style={{ textAlign: "center", fontWeight: "bold" }}>Single Post</h2>
      <div
        onClick={closeSinglePostDialog}
        style={{ color: "blue", textAlign: "right" }}
      >
        Close Dialog
      </div>
      <div>Title: {post.post.title}</div>
      <div>Body: {post.post.body}</div>
      {isLoading ? <div>Loading comments</div> : renderSinglePost()}
    </div>
  );
};

export default SinglePost;
