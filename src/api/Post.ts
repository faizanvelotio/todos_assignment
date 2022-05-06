import axios, { AxiosResponse } from "axios";

export const getUserPosts = (
  userId: number,
  pageNumber: number,
  limit: number
): Promise<AxiosResponse<Post[]>> =>
  axios.get<Post[]>(`/users/${userId}/posts`, {
    params: { _page: pageNumber, _limit: limit },
  });

export const getPostComments = (
  postId: number
): Promise<AxiosResponse<Comment[]>> =>
  axios.get<Comment[]>(`/comments?postId=${postId}`);
