import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Context
import { UserProvider } from "./context/Context";

// Components
import AuthRoute from "./pages/components/AuthRoute";

// Pages
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

// Main Theme Import
import { mainTheme } from "./assets/themes/Themes";

// Material UI
import { ThemeProvider } from "@material-ui/core/styles";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <UserProvider>
        <div className="App">
          <Router>
            <Switch>
              <AuthRoute exact={true} path="/" component={Landing} />
              <AuthRoute exact={false} path="/signup" component={SignUp} />
              <AuthRoute exact={false} path="/login" component={LogIn} />
              <Route path="/home" component={Home} />
            </Switch>
          </Router>
        </div>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
