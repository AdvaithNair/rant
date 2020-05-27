import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Context
import { UserContext, UserProvider } from "./context/UserContext";

// JWT
import jwtDecode from "jwt-decode";

// Pages
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import { SignUp } from "./pages/SignUp";
import { LogIn } from "./pages/LogIn";

// Components
import { AuthRoute } from "./pages/components/AuthRoute";

// Main Theme Import
import { mainTheme } from "./assets/themes/Themes";

// Material UI
import { ThemeProvider } from "@material-ui/core/styles";

let authenticated: Boolean;
const token = localStorage.firebaseAuthToken;
if (token) {
  const decodedToken: { [k: string]: any } = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    //window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

const App = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <UserProvider>
        <div className="App">
          <Router>
            <Switch>
              <AuthRoute
                exact
                path="/"
                component={Landing}
                authenticated={authenticated}
              />
              <AuthRoute
                exact
                path="/signup"
                component={SignUp}
                authenticated={authenticated}
              />
              <AuthRoute
                exact
                path="/login"
                component={LogIn}
                authenticated={authenticated}
              />
              <Route exact path="/home" component={Home} />
            </Switch>
          </Router>
        </div>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
