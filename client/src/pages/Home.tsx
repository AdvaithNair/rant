import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Context
import { ReducerContext } from "../types";
import { UserContext } from "../context/UserContext";
import { logoutUser, getUserData } from "../context/actions/UserActions";
import { SET_LOADING, CLEAR_LOADING, SET_USER } from "../context/ReducerTypes";

// Components
import Header from "./components/Header";
import Rant from "./components/Rant";

// Pages
import Feed from "./Feed";
import Profile from "./Profile";

// JWT
import jwtDecode from "jwt-decode";

// Axios
import axios from "axios";

// Material UI
import { CircularProgress } from "@material-ui/core";

export const Home: React.FC = () => {
  // Importing Context (Global Store)
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  // On Component Mount, Request All Rants
  useEffect(() => {
    // Check if Authenticated and Update Context Accordingly
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
  }, [dispatch]);

  return (
    <div style={{ display: "block" }}>
      <Header />
      <div className="main-content">
        <Switch>
          <Route path="/home/profile" component={Profile} />
          <Route path="/home" component={Feed} />
        </Switch>
      </div>
      <div className="footer">
        <p>
          A VIB<b>RANT</b> EXPERIENCE
        </p>
      </div>
    </div>
  );
};

export default Home;

/*
     <Router>
          <Switch>
            <Route exact path="/home" component={Feed} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </Router>
*/
