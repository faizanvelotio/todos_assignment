import React, { createContext, useReducer } from "react";
import { ActionType } from "src/ActionTypes";

interface AppState {
  users: User[] | null;
  userPosts: { userId: number; posts: PostWithComment[] | null };
  userTodos: { userId: number; todos: Todos[] | null };
}

type Action =
  | { type: ActionType.SET_USERS; payload: User[] }
  | {
      type: ActionType.SET_POSTS;
      payload: { userId: number; posts: Post[] };
    }
  | {
      type: ActionType.SET_TODOS;
      payload: { userId: number; todos: Todos[] };
    }
  | {
      type: ActionType.SET_COMMENT_FOR_POST;
      payload: { postIndex: number; comments: Comment[] };
    }
  | { type: ActionType.SET_CURRENT_USER_ID; payload: number };

interface UserContentProviderProps {
  children: React.ReactNode;
}

const initialState: AppState = {
  users: null,
  userPosts: { userId: -Infinity, posts: null },
  userTodos: { userId: -Infinity, todos: null },
};

const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_POSTS:
      let postsWithoutComments: Post[] = action.payload.posts;
      let postsWithComments: PostWithComment[] = [];
      postsWithoutComments.forEach((val: Post) => {
        postsWithComments.push({
          post: val,
          comments: null,
        });
      });
      return {
        ...state,
        userPosts: {
          userId: action.payload.userId,
          posts: postsWithComments,
        },
      };
    case ActionType.SET_TODOS:
      return {
        ...state,
        userTodos: action.payload,
      };
    case ActionType.SET_USERS:
      console.log("roarie", action.payload);
      return {
        ...state,
        users: action.payload,
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
