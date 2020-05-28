import React, { useState, useContext } from "react";
import { Link, RouteComponentProps } from "react-router-dom";

// Context
import { ReducerContext } from "../types";
import { UserContext } from "../context/UserContext";
import { handleUser } from "../context/actions/UserActions";

// Logo
import RantLogo from "../assets/images/RantLogoTransparent.png";

// Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";

interface Props extends RouteComponentProps<any> {}

export const LogIn: React.FC<Props> = ({ history }) => {
  // Setting State for Email and Password (for Form Input)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Importing Context (Global Store)
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  // Handles Submission for Sign Up Form
  const handleSubmit = (event: any) => {
    event.preventDefault();

    const loginCredentials: { [k: string]: string } = {
      email: email,
      password: password
    };

    // Logs In User and Adds to Global Store
    handleUser(loginCredentials, history, dispatch, "login");
  };

  return (
    <div style={{ display: "block" }}>
      <div className="background-image"></div>
      <div className="signup-content">
        <div className="signup-form-content">
          <img src={RantLogo} className="signup-logo" alt="Rant Logo"></img>
          <h2 className="text-center">LOG IN</h2>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              helperText={state.UI.errors.email}
              error={state.UI.errors.email ? true : false}
              onChange={e => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              helperText={state.UI.errors.password}
              error={state.UI.errors.password ? true : false}
              onChange={e => setPassword(e.target.value)}
              fullWidth
            />
            {state.UI.errors.general && (
              <p className="login-error-text">{state.UI.errors.general}</p>
            )}
            <p className="sign-up-text">
              Don't have an account? Sign up <Link to="/signup">here</Link>.
            </p>
            <div className="signup-button-wrapper">
              <Button
                style={{
                  fontSize: "15px",
                  color: "white",
                  fontFamily: "Montserrat",
                  fontWeight: 550
                }}
                type="submit"
                color="primary"
                disabled={state.UI.loading}
                fullWidth
              >
                SUBMIT
              </Button>
            </div>
            {state.UI.loading && <LinearProgress color="secondary" />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;