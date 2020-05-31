import React, { useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

// Context
import { ReducerContext } from "../types";
import { UserContext } from "../context/UserContext";
import {
  logoutUser,
  updateUserData,
  checkAuth
} from "../context/actions/UserActions";

// Components
import Header from "./components/Header";

// Pages
import Feed from "./Feed";
import Profile from "./Profile";
import CreateRant from "./CreateRant";
import EditRant from "./EditRant";

// JWT
import jwtDecode from "jwt-decode";

// Axios
import axios from "axios";

export const Home: React.FC = () => {
  // Importing Context (Global Store)
  const { dispatch } = useContext<ReducerContext>(UserContext);

  // On Component Mount, Check User Auth State
  useEffect(() => {
    checkAuth(dispatch);
  }, []);

  return (
    <div style={{ display: "block" }}>
      <Header />
      <div className="main-content">
        <Switch>
          {/* USE FOR EDITRANT <Route path="/home/create" render={(data) => <CreateRant {...data} data = {{pageTitle: 'CREATE RANT', title: '', body: ''}}/>} />*/}
          <Route path="/home/create" component={CreateRant} />
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
