declare interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: Address;
  phone?: string;
  website?: string;
  company?: Company;
}

declare interface UserWithoutID extends Omit<User, "id"> {}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo?: {
    lat: string;
    lng: string;
  };
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

declare interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

declare interface PostWithoutID extends Omit<Post, "id"> {}

declare interface Todos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

declare interface PostComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

declare interface PostCommentWithoutID extends Omit<PostComment, "id"> {}

declare interface PostWithComment {
  post: Post;
  comments: PostComment[] | null;
}

declare interface ViewPost {
  post: PostWithComment; // The post which need to be displayed
  index: number; // Index value passed for updating the post array in O(1) time
}

declare interface AlertInfo {
  message: string;
  status: "success" | "error";
}

declare interface LocationPropsForMsg {
  message: string;
}
