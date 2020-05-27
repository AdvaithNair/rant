import React, { useState, useContext } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { ReducerContext } from "../types";

// Context
import { UserContext, loginUser } from "../context/UserContext";

// Logo
import RantLogo from "../assets/images/RantLogoTransparent.png";

// Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";

interface LogInErrors {
  email: string;
  password: string;
  general: string;
}

interface Props extends RouteComponentProps<any> {}

export const LogIn: React.FC<Props> = ({ history }) => {
  // Setting State for Email, Password, Loading, and Errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LogInErrors>({
    email: "",
    password: "",
    general: ""
  });

  // Importing Context (Global Store)
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  // Handles Submission for Sign Up Form
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setLoading(true);
    const loginCredentials: { [k: string]: string } = {
      email: email,
      password: password
    };

    // Logs In User and Adds to Global Store
    loginUser(loginCredentials, history, setLoading, setErrors, dispatch);
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
              helperText={errors.email}
              error={errors.email ? true : false}
              onChange={e => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              helperText={errors.password}
              error={errors.password ? true : false}
              onChange={e => setPassword(e.target.value)}
              fullWidth
            />
            {errors.general && (
              <p className="login-error-text">{errors.general}</p>
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
                disabled={loading}
                fullWidth
              >
                SUBMIT
              </Button>
            </div>
            {loading && <LinearProgress color="secondary" />}
          </form>
        </div>
      </div>
    </div>
  );
};
