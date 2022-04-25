import React, { createContext, useReducer } from "react";
import { User, PostWithComment, Todos, Comment } from "../interfaces";

interface AppState {
    currentUser: User | null;
    user_posts: { userId: number; posts: Array<PostWithComment> | null };
    user_todos: { userId: number; todos: Array<Todos> | null };
}

type Action =
    | { type: "SET_USER"; payload: User }
    | {
          type: "SET_POSTS";
          payload: { userId: number; posts: Array<PostWithComment> };
      }
    | {
          type: "SET_TODOS";
          payload: { userId: number; todos: Array<Todos> };
      }
    | {
          type: "SET_COMMENT_FOR_POST";
          payload: { postIndex: number; comments: Array<Comment> };
      }
    | { type: "SET_CURRENT_USER_ID"; payload: number };

interface UserContentProviderProps {
    children: React.ReactNode;
}

const initialState: AppState = {
    currentUser: null,
    user_posts: { userId: -Infinity, posts: null },
    user_todos: { userId: -Infinity, todos: null },
};

const reducer = (state: AppState, action: Action) => {
    switch (action.type) {
        case "SET_POSTS":
            return {
                ...state,
                user_posts: action.payload,
            };
        case "SET_TODOS":
            return {
                ...state,
                user_todos: action.payload,
            };
        case "SET_USER":
            return {
                ...state,
                currentUser: action.payload,
            };
        case "SET_COMMENT_FOR_POST":
            const newState = { ...state };
            if (newState.user_posts.posts !== null) {
                // console.log(state.user_posts.posts[action.payload.postIndex])
                newState.user_posts.posts[action.payload.postIndex].comments =
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
