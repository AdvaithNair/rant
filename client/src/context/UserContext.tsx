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
  CLEAR_LOADING
} from "./ReducerTypes";

// Context Creation
export const UserContext = createContext<ReducerContext>({
  state: {},
  dispatch: (argument: {[k: string]: any}) => {}
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
  }
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
