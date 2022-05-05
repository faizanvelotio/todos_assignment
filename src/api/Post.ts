import axios, { AxiosResponse } from "axios";

export const getUserPosts = (userId: number): Promise<AxiosResponse<Post[]>> =>
  axios.get<Post[]>(`/users/${userId}/posts`);

export const getPostComments = (
  postId: number
): Promise<AxiosResponse<Comment[]>> =>
  axios.get<Comment[]>(`/comments?postId=${postId}`);
