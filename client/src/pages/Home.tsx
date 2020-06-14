import React, { useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

// Context
import { ReducerContext } from "../types";
import { UserContext } from "../context/Context";
import { checkAuth, getRantData } from "../context/Actions";

// Components
import Header from "./components/Header";

// Pages
import Feed from "./Feed";
import Profile from "./Profile";
import CreateRant from "./CreateRant";
import RantPage from "./RantPage";
import UserPage from "./UserPage";
import Rantverse from './Rantverse';

export const Home: React.FC = () => {
  // Importing Context (Global Store)
  const { dispatch } = useContext<ReducerContext>(UserContext);

  // On Component Mount, Check User Auth State
  useEffect(() => {
    checkAuth(dispatch);
    getRantData(dispatch);
  }, []);

  return (
    <div style={{ display: "block" }}>
      <Header />
      <div className="main-content">
        <Switch>
          <Route path="/home/rantverse" component={Rantverse} />
          <Route path="/home/users/:handle" component={UserPage} />
          <Route path="/home/rant/:rantID" component={RantPage} />
          <Route path="/home/create" render={(data) => <CreateRant {...data} pageTitle = {'CREATE RANT'} isCreate = {true} />} />
          <Route path="/home/edit/:rantID" render={(data) => <CreateRant {...data} pageTitle = {'EDIT RANT'} isCreate = {false} />} />
          <Route path="/home/profile" component={Profile} />
          <Route path="/home" component={Feed} />
        </Switch>
      </div>
      <div className="footer">
        <p onClick = {() => window.open('https://advaithnair.com')}>
          A VIB<b>RANT</b> EXPERIENCE
        </p>
      </div>
    </div>
  );
};

export default Home;
