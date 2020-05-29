import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Context
import { UserProvider } from "./context/UserContext";

// Pages
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";

// Components
import { AuthRoute } from "./pages/components/AuthRoute";

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
              <Route exact path="/" component={Landing} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={LogIn} />
              <Route path="/home" component={Home} />
            </Switch>
          </Router>
        </div>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
