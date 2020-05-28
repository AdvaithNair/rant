import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ReducerContext } from "./types";

// Context
import { UserProvider, UserContext } from "./context/UserContext";
import { logoutUser, getUserData } from "./context/actions/UserActions";
//import { SET_AUTHENTICATED } from "./context/ReducerTypes";

// JWT
import jwtDecode from "jwt-decode";

// Pages
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

// Components
import { AuthRoute } from "./pages/components/AuthRoute";

// Main Theme Import
import { mainTheme } from "./assets/themes/Themes";

// Material UI
import { ThemeProvider } from "@material-ui/core/styles";
import axios from "axios";

const App: React.FC = () => {
  // Importing Context (Global Store)
  const { dispatch } = useContext<ReducerContext>(UserContext);

  // On Component Mount, Request All Rants
  useEffect(() => {
    const token = localStorage.firebaseAuthToken;
    if (token) {
      const decodedToken: { [k: string]: any } = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        //window.location.href = "/login";
        logoutUser();
      } else {
        // TODO: Figure out why getUserData doesn't work on mount
        axios.defaults.headers.common["Authorization"] = token;
        getUserData(dispatch);
      }
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={mainTheme}>
      <UserProvider>
        <div className="App">
          <Router>
            <Switch>
              <AuthRoute exact path="/" component={Landing} />
              <AuthRoute exact path="/signup" component={SignUp} />
              <AuthRoute exact path="/login" component={LogIn} />
              <Route exact path="/home" component={Home} />
            </Switch>
          </Router>
        </div>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
