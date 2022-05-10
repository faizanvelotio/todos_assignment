import React, { createContext, useReducer } from "react";
import { ActionType } from "src/types/ActionTypes";

interface AppState {
  currentUser: User;
  users: User[] | null;
  userPosts: {
    userId: number;
    posts: PostWithComment[];
    page: number;
    complete: boolean;
  };
  userTodos: { userId: number; todos: Todos[] | null };
}

type Action =
  | { type: ActionType.SET_USERS; payload: User[] }
  | {
      type: ActionType.SET_POSTS;
      payload: { userId: number; posts: Post[]; pageNumber: number };
    }
  | {
      type: ActionType.SET_TODOS;
      payload: { userId: number; todos: Todos[] };
    }
  | {
      type: ActionType.SET_COMMENT_FOR_POST;
      payload: { postIndex: number; comments: Comment[] };
    }
  | { type: ActionType.SET_CURRENT_USER; payload: User };

interface UserContentProviderProps {
  children: React.ReactNode;
}

const initialState: AppState = {
  users: null,
  userPosts: { userId: -Infinity, posts: [], complete: false, page: 1 },
  userTodos: { userId: -Infinity, todos: null },
  currentUser: { id: -Infinity, name: "", username: "", email: "" },
};

const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_POSTS:
      // If all the data has been loaded, then update
      // complete to true
      if (!action.payload.posts.length) {
        const newState = { ...state };
        newState.userPosts.userId = action.payload.userId;
        newState.userPosts.complete = true;
        newState.userPosts.page = action.payload.pageNumber;
        if (action.payload.userId !== state.userPosts.userId) {
          newState.userPosts.posts = [];
        }
        return newState;
      } else {
        const newState = { ...state };
        let postsWithoutComments: Post[] = action.payload.posts;
        let postsWithComments: PostWithComment[] = [];
        postsWithoutComments.forEach((val: Post) => {
          postsWithComments.push({
            post: val,
            comments: null,
          });
        });

        if (action.payload.userId !== state.userPosts.userId) {
          newState.userPosts.posts = postsWithComments;
        } else {
          newState.userPosts.posts = [
            ...state.userPosts.posts,
            ...postsWithComments,
          ];
        }
        newState.userPosts.userId = action.payload.userId;
        newState.userPosts.page = action.payload.pageNumber;
        newState.userPosts.complete = false;
        return newState;
      }

    case ActionType.SET_TODOS:
      return {
        ...state,
        userTodos: action.payload,
      };
    case ActionType.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case ActionType.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case ActionType.SET_COMMENT_FOR_POST:
      const newState = { ...state };
      if (newState.userPosts.posts !== null) {
        newState.userPosts.posts[action.payload.postIndex].comments =
          action.payload.comments;
      }
      return newState;
    default:
      return state;
  }
};

const UserContentContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

function UserContentProvider({ children }: UserContentProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContentContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContentContext.Provider>
  );
}

export { UserContentContext, UserContentProvider };
