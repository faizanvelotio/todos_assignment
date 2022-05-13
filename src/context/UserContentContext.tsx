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
  userTodos: {
    userId: number;
    todos: Todos[];
    page: number;
    complete: boolean;
  };
}

type Action =
  | { type: ActionType.SET_USERS; payload: User[] }
  | {
      type: ActionType.SET_POSTS;
      payload: { userId: number; posts: Post[]; pageNumber: number };
    }
  | {
      type: ActionType.SET_TODOS;
      payload: { userId: number; todos: Todos[]; pageNumber: number };
    }
  | {
      type: ActionType.SET_COMMENTS_FOR_POST;
      payload: { postIndex: number; comments: PostComment[] };
    }
  | { type: ActionType.SET_CURRENT_USER; payload: User }
  | {
      type: ActionType.TOGGLE_TODO;
      payload: { idx: number; completed: boolean };
    }
  | {
      type: ActionType.ADD_USER;
      payload: User;
    }
  | { type: ActionType.UPDATE_USER; payload: User }
  | { type: ActionType.ADD_POST; payload: Post }
  | {
      type: ActionType.ADD_POST_COMMENT;
      payload: { postIndex: number; comment: PostComment };
    };

interface UserContentProviderProps {
  children: React.ReactNode;
}

const initialState: AppState = {
  users: null,
  userPosts: { userId: -Infinity, posts: [], complete: false, page: 1 },
  userTodos: { userId: -Infinity, todos: [], complete: false, page: 1 },
  currentUser: { id: -Infinity, name: "", username: "", email: "" },
};

const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_POSTS:
      // If all the data has been loaded, then update
      // complete to true
      if (!action.payload.posts.length) {
        return {
          ...state,
          userPosts: {
            posts:
              action.payload.userId !== state.userPosts.userId
                ? []
                : state.userPosts.posts,
            userId: action.payload.userId,
            complete: true,
            page: action.payload.pageNumber,
          },
        };
      } else {
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
            posts:
              action.payload.userId !== state.userPosts.userId
                ? postsWithComments
                : [...state.userPosts.posts, ...postsWithComments],
            userId: action.payload.userId,
            page: action.payload.pageNumber,
            complete: false,
          },
        };
      }

    case ActionType.SET_TODOS:
      // If all the data has been loaded, then update
      // complete to true
      if (!action.payload.todos.length) {
        return {
          ...state,
          userTodos: {
            userId: action.payload.userId,
            page: action.payload.pageNumber,
            complete: true,
            todos:
              action.payload.userId !== state.userTodos.userId
                ? []
                : state.userTodos.todos,
          },
        };
      } else {
        return {
          ...state,
          userTodos: {
            userId: action.payload.userId,
            page: action.payload.pageNumber,
            complete: false,
            todos:
              action.payload.userId !== state.userTodos.userId
                ? action.payload.todos
                : [...state.userTodos.todos, ...action.payload.todos],
          },
        };
      }
    case ActionType.SET_COMMENTS_FOR_POST: {
      const newState = { ...state };
      if (newState.userPosts.posts !== null) {
        newState.userPosts.posts[action.payload.postIndex].comments =
          action.payload.comments;
      }
      return newState;
    }
    case ActionType.ADD_POST_COMMENT: {
      const newState = { ...state };
      if (newState.userPosts.posts !== null) {
        newState.userPosts.posts[action.payload.postIndex].comments?.push(
          action.payload.comment
        );
      }
      return newState;
    }
    case ActionType.TOGGLE_TODO:
      const newState = { ...state };
      newState.userTodos.todos = [...state.userTodos.todos];
      newState.userTodos.todos[action.payload.idx] = {
        ...state.userTodos.todos[action.payload.idx],
        completed: action.payload.completed,
      };
      return newState;
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
    case ActionType.ADD_USER:
      if (state.users === null) {
        return {
          ...state,
          users: [action.payload],
        };
      } else {
        return {
          ...state,
          users: [...state.users, action.payload],
        };
      }
    case ActionType.UPDATE_USER:
      const users = state.users;
      if (users !== null) {
        const idx: number = users.findIndex(
          (user: User) => user.id === action.payload.id
        );
        return {
          ...state,
          users: [
            ...users.slice(0, idx),
            action.payload,
            ...users.slice(idx + 1),
          ],
        };
      }
      return state;
    case ActionType.ADD_POST:
      if (state.userPosts.userId === action.payload.userId) {
        let postWithComment: PostWithComment = {
          post: action.payload,
          comments: null,
        };

        return {
          ...state,
          userPosts: {
            ...state.userPosts,
            posts: [...state.userPosts.posts, postWithComment],
          },
        };
      }
      return state;
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
