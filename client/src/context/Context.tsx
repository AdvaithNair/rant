import React, { createContext, useReducer, useMemo } from "react";
import { ReducerContext, GlobalState, NetworkData } from "../types";

// Reducer Types
import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  UPDATE_USER,
  UPDATE_USER_IMAGE,
  UPDATE_USER_EMAIL,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_LOADING,
  CLEAR_LOADING,
  SET_RANTS,
  ADD_RANT,
  UPDATE_RANT,
  DELETE_RANT,
  LIKE_RANT,
  UNLIKE_RANT,
  ADD_COMMENT,
  DELETE_COMMENT,
  MARK_NOTIFICATIONS_READ,
  FOLLOW_USER,
  UNFOLLOW_USER,
  FRIEND_USER,
  UNFRIEND_USER
} from "./ReducerTypes";
import { NetworkInterfaceBase } from "os";

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
const initialState: GlobalState = {
  authenticated: false,
  credentials: {
    imageURL: "",
    userName: "",
    handle: "",
    email: "",
    userID: "",
    createdAt: "",
    bio: "",
    website: "",
    followerCount: 0,
    followingCount: 0,
    friendCount: 0,
    followers: [],
    following: [],
    friends: []
  },
  likes: [],
  notifications: [],
  UI: {
    loading: false,
    errors: initialErrors
  },
  rants: []
};

// Context Creation
export const UserContext = createContext<ReducerContext>({
  state: initialState,
  dispatch: (argument: { [k: string]: any }) => {}
});

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
    case UPDATE_USER_EMAIL:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          email: action.payload
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
            userID: action.payload.userID,
            isPrivate: action.payload.isPrivate,
            createdAt: action.payload.createdAt,
            imageURL: action.payload.imageURL,
            likeCount: action.payload.likeCount,
            commentCount: action.payload.commentCount,
            rantID: action.payload.rantID
          },
          ...state.rants
        ]
      };
    case UPDATE_RANT:
      const updatedRant = state.rants.findIndex(
        (rant: { [k: string]: any }) => rant.rantID === action.payload.rantID
      );
      state.rants[updatedRant] = {
        ...state.rants[updatedRant],
        title: action.payload.title,
        body: action.payload.body
      };
      return {
        ...state
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
      state.rants[commentIndex].commentCount
        ? state.rants[commentIndex].commentCount++
        : (state.rants[commentIndex].commentCount = 1);
      return {
        ...state
      };
    case DELETE_COMMENT:
      const commentDeleteIndex = state.rants.findIndex(
        (rant: { [k: string]: any }) => rant.rantID === action.payload
      );
      state.rants[commentDeleteIndex].commentCount--;
      return {
        ...state
      };
    case MARK_NOTIFICATIONS_READ:
      return {
        ...state,
        notifications: []
      };
    case FOLLOW_USER:
      state.credentials.following.push(action.payload);
      state.credentials.followingCount++;
      return {
        ...state
      };
    case UNFOLLOW_USER:
      state.credentials.followingCount--;
      console.log(
        state.credentials.following.filter(
          (e: NetworkData) => e.handle !== action.payload.handle
        )
      );
      return {
        ...state,
        credentials: {
          ...state.credentials,
          following: state.credentials.following.filter(
            (e: NetworkData) => e.handle !== action.payload.handle
          )
        }
      };
    case FRIEND_USER:
      state.credentials.friends.push(action.payload);
      state.credentials.friendCount++;
      return {
        ...state
      };
    case UNFRIEND_USER:
      state.credentials.friendCount--;
      return {
        ...state,
        credentials: {
          ...state.credentials,
          friends: state.credentials.friends.filter(
            (e: NetworkData) => e !== action.payload
          )
        }
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
