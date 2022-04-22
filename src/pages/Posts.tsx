import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import useLocationId from "../utils/useLocationId";
// import useApiHook from "../utils/useApiHook";
import { Post, PostWithComment } from "../interfaces";
import { UserContentContext } from "../context/UserContentContext";

function Posts() {
    const userId: number = useLocationId(); // Get the id parameter for URL
    const [isLoading, setIsLoading] = useState(true);

    const { state, dispatch } = useContext(UserContentContext);
    const { user_posts } = state;

    useEffect(() => {
        // If the posts in the state is of different user, then update the state,
        // else update render with the same state
        console.log("from posts useeffect");
        if (userId !== user_posts.userId) {
            axios
                .get(`/users/${userId}/posts`)
                .then((response) => {
                    // Create an array where each object has a post and an empty comment array
                    let posts_without_comments = response.data;
                    let posts_with_comments: Array<PostWithComment> = [];
                    posts_without_comments.forEach((val: Post) => {
                        posts_with_comments.push({
                            post: val,
                            comments: [],
                        });
                    });
                    dispatch({
                        type: "SET_POSTS",
                        payload: { userId: userId, posts: posts_with_comments },
                    });
                    setIsLoading(false);
                })
                .catch((err) => {});
        } else {
            setIsLoading(false);
        }
    }, [userId, user_posts, dispatch]);

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
            {/* {error && <div>{error.message}</div>} */}
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <h1 style={{ textAlign: "center" }}>Posts</h1>
                    {user_posts.posts &&
                        user_posts.posts.map((val: PostWithComment) => (
                            <div
                                key={val.post.id}
                                style={{
                                    minHeight: "30px",
                                    margin: "20px",
                                    padding: "30px",
                                    //   cursor: "pointer",
                                    border: "1px solid black",
                                }}
                            >
                                Title: {val.post.title}
                                <br />
                                <br />
                                Body: {val.post.body}
                            </div>
                        ))}
                </>
            )}
        </div>
    );
}

export default Posts;
