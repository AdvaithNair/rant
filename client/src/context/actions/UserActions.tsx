// Reducer Types
import {
  //SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_LOADING,
  CLEAR_LOADING
} from "../ReducerTypes";

// Axios
import axios from "axios";

// Adds Authorization Axios Header for Further Requests
const setAuthorizationHeader = (token: string) => {
  const firebaseAuthToken = `Bearer ${token}`;
  localStorage.setItem("firebaseAuthToken", firebaseAuthToken);
  axios.defaults.headers.common["Authorization"] = firebaseAuthToken;
};

// Logs In or Signs Up User
export const handleUser = (
  credentials: { [k: string]: string },
  history: any,
  dispatch: (argument: { [k: string]: string }) => void,
  endpoint: string
) => {
  // Checks for Errors
  if (checkCredentials(credentials, dispatch)) return;

  // Makes Login Request
  axios
    .post(`/user/${endpoint}`, credentials)
    .then((res: any) => {
      // Sets Auth Token in Header
      setAuthorizationHeader(res.data.token);

      // Creates User Info
      getUserData(dispatch);

      // Additional UI Fixes
      dispatch({ type: CLEAR_ERRORS });
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
      dispatch({ type: SET_ERRORS, payload: errors });
      dispatch({ type: CLEAR_LOADING });
    });
};

// Gets User Data
export const getUserData = (
  dispatch: (argument: { [k: string]: string }) => void
) => {
  axios
    .get("/user")
    .then((res: any) => {
      // Stores User Info in Global State through Reducer
      console.log(res.data.userData);
      dispatch({
        type: SET_USER,
        payload: res.data.userData
      });
    })
    .catch((err: any) => console.log(err));
};

// Logs Out User
export const logoutUser = () => (dispatch: any) => {
  localStorage.removeItem("firebaseAuthToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

// Checks if Entry is Valid
const isValid = (
  property: string,
  inputString: string,
  errors: { [k: string]: string }
) => {
  // To Check Email
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Checks if Empty
  if (inputString === "") {
    errors[property] = "Must Not Be Empty";
    return false;
  }

  // Checks if Email is Valid
  else if (property === "email" && !inputString.match(regEx)) {
    errors.email = "Must Be A Valid Email Address";
    return false;
  } else return true;
};

// Ensures Request is Valid
const checkCredentials = (
  credentials: { [k: string]: string },
  dispatch: (argument: { [k: string]: any }) => void
) => {
  // Sets Loading
  dispatch({ type: SET_LOADING });

  // Determines Termination
  let toTerminate: boolean = false;

  // Errors Object
  const errors = {
    firstName: "",
    handle: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: ""
  };

  // Iterate through Credentials
  const entries = Object.entries(credentials);
  for (const [credentialType, credentialInput] of entries) {
    if (!isValid(credentialType, credentialInput, errors)) toTerminate = true;
  }

  if (credentials.password !== credentials.confirmPassword)
    errors.confirmPassword = "Passwords Must Match";

  dispatch({ type: SET_ERRORS, payload: errors });
  if (toTerminate) dispatch({ type: CLEAR_LOADING });
  return toTerminate;
};
