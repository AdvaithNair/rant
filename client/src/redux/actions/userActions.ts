import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../reduxTypes";

// Axios
import axios from "axios";

// Interface for Log In Errors
interface LogInErrors {
  email: string;
  password: string;
  general: string;
}

export const loginUser = (
  loginCredentials: { [k: string]: string },
  history: any,
  setLoading?: any,
  setErrors?: any
) => (dispatch: any) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/user/login", loginCredentials)
    .then((res: any) => {
      const firebaseAuthToken = `Bearer ${res.data.token}`;
      localStorage.setItem("firebaseAuthToken", firebaseAuthToken);
      axios.defaults.headers.common["Authorization"] = firebaseAuthToken;
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      // setLoading(false);
      history.push("/home");
    })
    .catch((err: any) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
      /*const errors: LogInErrors = {
        email: "",
        password: "",
        general: "",
        ...err.response.data.errors,
        ...err.response.data
      };
      setErrors(errors);
      setLoading(false);*/
    });
};

export const getUserData = () => (dispatch: any) => {
  axios
    .get("/user")
    .then((res: any) => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch((err: any) => console.log(err));
};
