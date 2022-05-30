import { AxiosResponse } from "axios";
import axios from "src/api/axiosConfig";

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

export const createPost = (
  post: PostWithoutID
): Promise<AxiosResponse<Post, PostWithoutID>> =>
  axios.post<Post, AxiosResponse<Post, PostWithoutID>, PostWithoutID>(
    "/posts",
    post
  );

export const getPostComments = (
  postId: number
): Promise<AxiosResponse<PostComment[], PostCommentsConfig>> =>
  axios.get<
    PostComment[],
    AxiosResponse<PostComment[], PostCommentsConfig>,
    PostCommentsConfig
  >("/comments", {
    params: { postId: postId },
  });

export const createCommentForPost = (
  comment: PostCommentWithoutID
): Promise<AxiosResponse<PostComment, PostCommentWithoutID>> =>
  axios.post<
    PostComment,
    AxiosResponse<PostComment, PostCommentWithoutID>,
    PostCommentWithoutID
  >("/comments", comment);
