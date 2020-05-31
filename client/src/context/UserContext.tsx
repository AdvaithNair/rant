import React, { createContext, useReducer, useMemo } from "react";
import { ReducerContext } from "../types";

// Reducer Types
import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_LOADING,
  CLEAR_LOADING,
  SET_RANTS,
  ADD_RANT,
  LIKE_RANT,
  UNLIKE_RANT
} from "./ReducerTypes";

// Context Creation
export const UserContext = createContext<ReducerContext>({
  state: {},
  dispatch: (argument: { [k: string]: any }) => {}
});

// Initial Error Object
const initialErrors = {
  firstName: "",
  handle: "",
  email: "",
  password: "",
  confirmPassword: "",
  general: ""
};

// Initial State Object
const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
  UI: {
    loading: false,
    errors: initialErrors
  },
  rants: []
};

// Reducer Function
function reducer(state: any, action: any) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        ...state,
        authenticated: true,
        credentials: action.payload.about,
        likes: action.payload.likes,
        notifications: action.payload.notifications
      };
    case SET_ERRORS:
      return {
        ...state,
        UI: {
          loading: state.UI.loading,
          errors: action.payload
        }
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        UI: {
          loading: false,
          errors: initialErrors
        }
      };
    case SET_LOADING:
      return {
        ...state,
        UI: {
          loading: true,
          errors: state.UI.errors
        }
      };
    case CLEAR_LOADING:
      return {
        ...state,
        UI: {
          loading: false,
          errors: state.UI.errors
        }
      };
    case SET_RANTS:
      console.log("GOT HERE");
      return {
        ...state,
        rants: action.payload
      };
    case ADD_RANT:
      return {
        ...state,
        rants: [
          ...state.rants,
          {
            title: action.payload.title,
            body: action.payload.body,
            handle: action.payload.handle,
            userName: action.payload.userName,
            createdAt: action.payload.createdAt,
            imageURL: action.payload.imageURL,
            likeCount: action.payload.likeCount,
            commentCount: action.payload.commentCount,
            rantID: action.payload.rantID
          }
        ]
      };
    case LIKE_RANT:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            handle: state.credentials.handle,
            rantID: action.payload.rantID,
            userName: action.payload.userName
          }
        ]
      };
    case UNLIKE_RANT:
      return {
        ...state,
        likes: state.likes.filter(
          (like: any) => like.rantID !== action.payload.rantID
        )
      };
    default:
      return state;
  }
}

// User Provider for Global Storage
export const UserProvider = (props: any) => {
  // Global User State
  const [state, dispatch] = useReducer(reducer, initialState);

  // Memo for Efficiency
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  // Provider Wrapping
  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
