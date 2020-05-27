import React, { createContext, useReducer, useMemo } from "react";
import { ReducerContext } from "../types";

// Reducer Types
import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER
} from "./ReducerTypes";

// Axios
import axios from "axios";

// Context Creation
export const UserContext = createContext<ReducerContext>({
  state: null,
  dispatch: null
});

// Initial State
const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notification: []
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
        authenticated: true,
        ...action.payload
      };
    default:
      return state;
  }
}

// Logs In User
// TODO: Make setLoading and setErrors in a UI Context
export const loginUser = (
  loginCredentials: any,
  history: any,
  setLoading: any,
  setErrors: any,
  dispatch: any
) => {
  // Makes Login Request
  axios
    .post("/user/login", loginCredentials)
    .then((res: any) => {
      // Sets Auth Token
      const firebaseAuthToken = `Bearer ${res.data.token}`;
      localStorage.setItem("firebaseAuthToken", firebaseAuthToken);
      axios.defaults.headers.common["Authorization"] = firebaseAuthToken;

      // Creates User Info
      axios
        .get("/user")
        .then((res: any) => {
          // Stores User Info in Global State through Reducer
          dispatch({
            type: SET_USER,
            payload: res.data
          });
        })
        .catch((err: any) => console.log(err));

      // Additional UI Fixes
      setLoading(false);
      history.push("/home");
    })
    .catch((err: any) => {
      // Error Handling
      const errors = {
        email: "",
        password: "",
        general: "",
        ...err.response.data.errors,
        ...err.response.data
      };
      setErrors(errors);
      setLoading(false);
    });
};

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
