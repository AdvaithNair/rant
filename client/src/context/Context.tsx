import React, { createContext, useReducer, useMemo } from "react";
import { ReducerContext } from "../types";

// Reducer Types
import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  UPDATE_USER,
  UPDATE_USER_IMAGE,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_LOADING,
  CLEAR_LOADING,
  SET_RANTS,
  ADD_RANT,
  DELETE_RANT,
  LIKE_RANT,
  UNLIKE_RANT,
  ADD_COMMENT,
  DELETE_COMMENT
} from "./ReducerTypes";

// Context Creation
export const UserContext = createContext<ReducerContext>({
  state: {},
  dispatch: (argument: { [k: string]: any }) => {}
});

// Initial Error Object
const initialErrors: { [k: string]: string } = {
  firstName: "",
  handle: "",
  email: "",
  password: "",
  confirmPassword: "",
  general: ""
};

// Initial State Object
const initialState: { [k: string]: any } = {
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
    case UPDATE_USER:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          bio: action.payload.bio,
          website: action.payload.website
        }
      };
    case UPDATE_USER_IMAGE:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          imageURL: action.payload
        }
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
      return {
        ...state,
        rants: action.payload
      };
    case ADD_RANT:
      return {
        ...state,
        rants: [
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
          },
          ...state.rants
        ]
      };
    case DELETE_RANT:
      const index = state.rants.findIndex(
        (rant: { [k: string]: any }) => rant.rantID === action.payload
      );
      state.rants.splice(index, 1);
      return {
        ...state
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
    case ADD_COMMENT:
      const commentIndex = state.rants.findIndex(
        (rant: { [k: string]: any }) => rant.rantID === action.payload
      );
      state.rants[commentIndex].commentCount++;
      return {
        ...state
      }
    case DELETE_COMMENT:
      const commentDeleteIndex = state.rants.findIndex(
        (rant: { [k: string]: any }) => rant.rantID === action.payload
      );
      state.rants[commentDeleteIndex].commentCount--;
      return {
        ...state
      }
    default:
      return state;
  }
}

// User Provider for Global Storage
export const UserProvider = (props: any) => {
  // Global User State
  const [state, dispatch] = useReducer(reducer, initialState);

  // Memo for Efficiency
  /*const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);*/
  const contextValue = { state, dispatch };

  // Provider Wrapping
  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
