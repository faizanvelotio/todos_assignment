import { ViewPost, PostWithComment, Comment } from "../interfaces";
import { UserContentContext } from "../context/UserContentContext";
import { useContext, useEffect } from "react";
import axios from "axios";

function SinglePost({
    post,
    index,
    setter,
}: {
    post: PostWithComment;
    index: number;
    setter: React.Dispatch<React.SetStateAction<ViewPost>>;
}) {
    const closeSinglePostDialog = () => {
        setter((prevState) => ({ ...prevState, view: false }));
    };
    const { dispatch } = useContext(UserContentContext);

    useEffect(() => {
        if (post.comments === null) {
            axios.get(`/comments?postId=${post.post.id}`).then((response) => {
                // console.log("from single post axios", response.data);
                dispatch({
                    type: "SET_COMMENT_FOR_POST",
                    payload: { postIndex: index, comments: response.data },
                });
            });
        }
    }, [dispatch, post, index]);

    // console.log(post, index);

    return (
        <div>
            <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
                Single Post
            </h2>
            <div
                onClick={closeSinglePostDialog}
                style={{ color: "blue", textAlign: "right" }}
            >
                Close Dialog
            </div>
            <div>Title: {post.post.title}</div>
            <div>Body: {post.post.body}</div>
            {post.comments ? (
                <div>
                    <h3>Comments</h3>

                    {post.comments.length !== 0 ? (
                        post.comments.map((comment: Comment) => {
                            return (
                                <div
                                    key={comment.id}
                                    style={{
                                        border: "1px dotted black",
                                        textAlign: "center",
                                    }}
                                >
                                    <div>
                                        {comment.name +
                                            "  (" +
                                            comment.email +
                                            ")"}
                                    </div>
                                    <div>{comment.body}</div>
                                </div>
                            );
                        })
                    ) : (
                        <div>No comments</div>
                    )}
                </div>
            ) : (
                <div>Loading comments</div>
            )}
        </div>
    );
}

export default SinglePost;
