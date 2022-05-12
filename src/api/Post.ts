import axios, { AxiosResponse } from "axios";

interface PostsRequestConfig {
  params: { _page: number; _limit: number };
}

interface PostCommentsConfig {
  params: { postId: number };
}

export const getUserPosts = (
  userId: number,
  pageNumber: number,
  limit: number
): Promise<AxiosResponse<Post[], PostsRequestConfig>> =>
  axios.get<
    Post[],
    AxiosResponse<Post[], PostsRequestConfig>,
    PostsRequestConfig
  >(`/users/${userId}/posts`, {
    params: { _page: pageNumber, _limit: limit },
  });

export const getPostComments = (
  postId: number
): Promise<AxiosResponse<Comment[], PostCommentsConfig>> =>
  axios.get<
    Comment[],
    AxiosResponse<Comment[], PostCommentsConfig>,
    PostCommentsConfig
  >(`/comments`, {
    params: { postId: postId },
  });
