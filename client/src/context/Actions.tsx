// Reducer Types
import {
  //SET_AUTHENTICATED,
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
  UPDATE_RANT,
  DELETE_RANT,
  LIKE_RANT,
  UNLIKE_RANT,
  MARK_NOTIFICATIONS_READ,
  FOLLOW_USER,
  UNFOLLOW_USER,
  FRIEND_USER,
  UNFRIEND_USER
} from "./ReducerTypes";

// Axios
import axios from "axios";
import API from '../API';

// JWT
import jwtDecode from "jwt-decode";
import { NetworkData } from "../types";

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

  console.log("here");

  // Makes Login Request
  axios
    .post(`/user/${endpoint}`, credentials)
    .then((res: any) => {
      console.log(res.data);
      // Sets Auth Token in Header
      setAuthorizationHeader(res.data.token);

      // Creates User Info
      updateUserData(dispatch, history);

      // Additional UI Fixes
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err: any) => {
      console.log(err);
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
  dispatch: (argument: { [k: string]: string }) => void,
  history?: any
) => {
  if (localStorage.userData) {
    dispatch({
      type: SET_USER,
      payload: JSON.parse(localStorage.userData || "{}")
    });
  } else {
    updateUserData(dispatch, history);
  }
};

// Updates User Data
export const updateUserData = (
  dispatch: (argument: { [k: string]: string }) => void,
  history?: any
) => {
  API
    .get("/user")
    .then((res: any) => {
      console.log(res.data);
      // Sets to LocalStorage
      localStorage.setItem("userData", JSON.stringify(res.data.userData));
      localStorage.setItem("likeData", JSON.stringify(res.data.userData.likes));
      // Stores User Info in Global State through Reducer
      dispatch({
        type: SET_USER,
        payload: res.data.userData
      });

      // Clears Loading
      dispatch({ type: CLEAR_LOADING });

      // Push to Home
      if (history) history.push("/home");
    })
    .catch((err: any) => console.log(err));
};

// Uploads Image
export const uploadImage = (
  dispatch: (argument: { [k: string]: string }) => void,
  formData: any
) => {
  dispatch({ type: SET_LOADING });
  API
    .post("/user/image", formData)
    .then((res: any) => {
      dispatch({ type: UPDATE_USER_IMAGE, payload: res.data.imageURL });
      updateUserData(dispatch);
      //getRantData(dispatch); //TODO: Check on this
      dispatch({ type: CLEAR_LOADING });
      // TODO: Fix This Part, try to overload cache
      window.location.reload(false);
    })
    .catch((err: any) => console.log(err));
};

// Logs Out User
export const logoutUser = (dispatch: any) => {
  localStorage.removeItem("firebaseAuthToken");
  localStorage.removeItem("userData");
  localStorage.removeItem("likeData");
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
  if (property !== 'lastName' && inputString.trim() === "") {
    errors[property] = "Must Not Be Empty";
    return false;
  }

  // Checks Username
  else if (
    property === "handle" &&
    (inputString.includes("<") ||
      inputString.includes(">") ||
      inputString.includes(":") ||
      inputString.includes('"') ||
      inputString.includes("/") ||
      inputString.includes("\\") ||
      inputString.includes("|") ||
      inputString.includes("?") ||
      inputString.includes("*") ||
      inputString.includes(" "))
  ) {
    errors.handle = "Invalid Username";
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

  if (credentials.password !== credentials.confirmPassword) {
    errors.confirmPassword = "Passwords Must Match";
    //toTerminate = true;
  }

  /*if (credentials.handle) {
    if (
      credentials.handle.includes("<") ||
      credentials.handle.includes(">") ||
      credentials.handle.includes(":") ||
      credentials.handle.includes('"') ||
      credentials.handle.includes("/") ||
      credentials.handle.includes("\\") ||
      credentials.handle.includes("|") ||
      credentials.handle.includes("?") ||
      credentials.handle.includes("*") ||
      credentials.handle.includes(" ")
    )
      errors.handle = "Invalid Username";
  }*/

  dispatch({ type: SET_ERRORS, payload: errors });
  if (toTerminate) dispatch({ type: CLEAR_LOADING });
  console.log("to Terminate: " + toTerminate);
  return toTerminate;
};

// Sends Database Request to Toggle Like
export const toggleLikeRequest = (
  state: any,
  dispatch: (argument: { [k: string]: any }) => void,
  rantID: string,
  isLiked: boolean
) => {
  API
    .get(`/rant/like/${rantID}`)
    .then((res: any) => {
      console.log(res.data);
      if (isLiked) dispatch({ type: UNLIKE_RANT, payload: res.data.rantData });
      else dispatch({ type: LIKE_RANT, payload: res.data.rantData });
      setTimeout(
        () => localStorage.setItem("likeData", JSON.stringify(state.likes)),
        2000
      );
      // updateUserData(dispatch);
      // TODO: Comment this out?
      //getRantData(dispatch);
    })
    .catch((err: any) => console.log(err));
};

// Retreives Rant Data from Database
export const getRantData = (
  dispatch: (argument: { [k: string]: any }) => void
) => {
  dispatch({ type: SET_LOADING });
  API
    .get("/get/all_rants")
    .then((res: any) => {
      console.log(res.data);
      dispatch({ type: SET_RANTS, payload: res.data });
      dispatch({ type: CLEAR_LOADING });
    })
    .catch((err: Error) => console.log(err));
};

// Retreives Rant Feed Data from Database
export const getFeed = (dispatch: (argument: { [k: string]: any }) => void) => {
  dispatch({ type: SET_LOADING });
  API
    .get("/get/feed")
    .then((res: any) => {
      console.log(res.data);
      dispatch({ type: SET_RANTS, payload: res.data.rants });
      dispatch({ type: CLEAR_LOADING });
    })
    .catch((err: Error) => console.log(err));
};

// Check if Authenticated and Update Context Accordingly
export const checkAuth = (
  dispatch: (argument: { [k: string]: string }) => void
) => {
  const token = localStorage.firebaseAuthToken;
  if (token) {
    const decodedToken: { [k: string]: any } = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      window.location.href = "/";
      logoutUser(dispatch);
    } else {
      axios.defaults.headers.common["Authorization"] = token;
      getUserData(dispatch);
    }
  }
};

// Creates Rant
export const postRant = (
  rantObject: { [k: string]: any },
  dispatch: (argument: { [k: string]: any }) => void
) => {
  dispatch({ type: SET_LOADING });
  API
    .post("/create/rant", rantObject)
    .then((res: any) => {
      console.log(res.data);
      dispatch({ type: ADD_RANT, payload: res.data.newRant });
      dispatch({ type: CLEAR_LOADING });
    })
    .catch((err: Error) => console.log(err));
};

// Updates Rant
export const updateRant = (
  rantObject: { [k: string]: any },
  rantID: string,
  dispatch: (argument: { [k: string]: any }) => void
) => {
  dispatch({ type: SET_LOADING });
  API
    .put(`/update/rant/${rantID}`, rantObject)
    .then((res: any) => {
      console.log(res.data.updatedRant);
      dispatch({ type: UPDATE_RANT, payload: res.data.updatedRant });
      dispatch({ type: CLEAR_LOADING });
    })
    .catch((err: Error) => console.log(err));
};

// Deletes Rant
export const deleteRant = (
  rantID: string,
  dispatch: (argument: { [k: string]: any }) => void
) => {
  dispatch({ type: SET_LOADING });
  API
    .delete(`/delete/rant/${rantID}`)
    .then(() => {
      // Replace this with state change
      // getRantData(dispatch);
      dispatch({ type: DELETE_RANT, payload: rantID });
      dispatch({ type: CLEAR_LOADING });
    })
    .catch((err: Error) => console.log(err));
};

// Edits User Details
export const editUserDetails = (
  dispatch: (argument: { [k: string]: any }) => void,
  userData: { [k: string]: string }
) => {
  dispatch({ type: SET_LOADING });
  API
    .post("/user/update", userData)
    .then(() => {
      dispatch({ type: UPDATE_USER, payload: userData });
      updateUserData(dispatch);
      dispatch({ type: CLEAR_LOADING });
    })
    .catch((err: any) => {
      // Error Handling
      console.log(err);
    });
};

export const getRantInfo = (
  dispatch: (argument: { [k: string]: any }) => void,
  rantID: string
) => {
  dispatch({ type: SET_LOADING });
  API
    .get(`/rant/${rantID}`)
    .then((res: any) => {
      console.log(res.data);
      //dispatch({ type: GET_COMMENTS, payload: res.data });
      dispatch({ type: CLEAR_LOADING });
    })
    .catch((err: any) => {
      // Error Handling
      console.log(err);
    });
};

// Deletes All Notifications
export const readNotifications = (
  dispatch: (argument: { [k: string]: any }) => void,
  notificationIDs: Array<{ [k: string]: any }>
) => {
  API
    .post("/notifications", notificationIDs)
    .then((res: any) => {
      dispatch({ type: MARK_NOTIFICATIONS_READ });
    })
    .catch((err: any) => console.log(err));
};

// Adds User to Following Array
export const followUser = (
  dispatch: (argument: { [k: string]: any }) => void,
  userData: NetworkData
) => {
  API
    .post("/user/follow", userData)
    .then((res: any) => {
      dispatch({ type: FOLLOW_USER, payload: userData });
    })
    .catch((err: Error) => console.log(err));
};

// Removes User from Following Array
export const unfollowUser = (
  dispatch: (argument: { [k: string]: any }) => void,
  userData: NetworkData
) => {
  API
    .post("/user/unfollow", userData)
    .then((res: any) => {
      dispatch({ type: UNFOLLOW_USER, payload: userData });
    })
    .catch((err: Error) => console.log(err));
};

// Adds User to Friend Array
export const addFriend = (
  dispatch: (argument: { [k: string]: any }) => void,
  userData: NetworkData
) => {
  API
    .post("/user/friend/add", userData)
    .then((res: any) => {
      dispatch({ type: FRIEND_USER, payload: userData });
    })
    .catch((err: Error) => console.log(err));
};

// Removes User to Friend Array
export const removeFriend = (
  dispatch: (argument: { [k: string]: any }) => void,
  userData: NetworkData
) => {
  API
    .post("/user/friend/remove", userData)
    .then((res: any) => {
      dispatch({ type: UNFRIEND_USER, payload: userData });
    })
    .catch((err: Error) => console.log(err));
};
