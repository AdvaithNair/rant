// Reducer Types
import {
  //SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_LOADING,
  CLEAR_LOADING,
  LIKE_RANT,
  UNLIKE_RANT
} from "../ReducerTypes";

// Axios
import axios from "axios";

// JWT
import jwtDecode from "jwt-decode";

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
// TODO: Possibly change this due to security concerns?
export const getUserData = (
  dispatch: (argument: { [k: string]: string }) => void
) => {
  if (localStorage.userData) {
    dispatch({
      type: SET_USER,
      payload: JSON.parse(localStorage.userData || "{}")
    });
  } else {
    updateUserData(dispatch);
  }
};

// Updates User Data
export const updateUserData = (
  dispatch: (argument: { [k: string]: string }) => void
) => {
  axios
    .get("/user")
    .then((res: any) => {
      // Stores User Info in Global State through Reducer
      dispatch({
        type: SET_USER,
        payload: res.data.userData
      });
      localStorage.setItem("userData", JSON.stringify(res.data.userData));
    })
    .catch((err: any) => console.log(err));
};

// Uploads Image
export const uploadImage = (
  dispatch: (argument: { [k: string]: string }) => void,
  formData: any
) => {
  axios
    .post("/user/image", formData)
    .then(() => {
      updateUserData(dispatch);
      axios
        .get("/get/all_rants")
        .then(res => {
          localStorage.setItem("rantData", JSON.stringify(res.data));
        })
        .catch((err: Error) => console.log(err));
    })
    .catch((err: any) => console.log(err));
};

// Logs Out User
export const logoutUser = (dispatch: any) => {
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

// Sends Database Request to Toggle Like
export const toggleLikeRequest = (
  dispatch: (argument: { [k: string]: any }) => void,
  rantID: string,
  isLiked: boolean
) => {
  axios
    .get(`/rant/like/${rantID}`)
    .then((res: any) => {
      if (isLiked) dispatch({ type: UNLIKE_RANT, payload: res.data });
      else dispatch({ type: LIKE_RANT, payload: res.data });
      //updateUserData(dispatch);
      getRantData();
    })
    .catch((err: any) => console.log(err));
};

// Retreives Rant Data from Database
export const getRantData = () => {
  axios
    .get("/get/all_rants")
    .then((res: any) => {
      localStorage.setItem("rantData", JSON.stringify(res.data));
    })
    .catch((err: Error) => console.log(err));
};

// Check if Authenticated and Update Context Accordingly
export const checkAuth = (dispatch: any) => {
  const token = localStorage.firebaseAuthToken;
  if (token) {
    const decodedToken: { [k: string]: any } = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      window.location.href = "/";
      logoutUser(dispatch);
    } else {
      axios.defaults.headers.common["Authorization"] = token;
      updateUserData(dispatch);
    }
  }
};
