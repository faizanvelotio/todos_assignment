import axios, { AxiosResponse } from "axios";

interface PostsRequestConfig {
  params: { _page: number; _limit: number };
}

export const getUserPosts = (
  userId: number,
  pageNumber: number,
  limit: number
): Promise<AxiosResponse<Post[], PostsRequestConfig>> =>
  axios.get<Post[], AxiosResponse<Post[]>, PostsRequestConfig>(
    `/users/${userId}/posts`,
    {
      params: { _page: pageNumber, _limit: limit },
    }
  );

export const getPostComments = (
  postId: number
): Promise<AxiosResponse<Comment[]>> =>
  axios.get<Comment[]>(`/comments?postId=${postId}`);
