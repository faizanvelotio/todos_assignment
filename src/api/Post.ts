import axios from "axios";

export const getUserPosts = (userId: number): Promise<Post[]> =>
    axios.get(`/users/${userId}/posts`);

export const getPostComments = (postId: number): Promise<Comment[]> =>
    axios.get(`/comments?postId=${postId}`);
