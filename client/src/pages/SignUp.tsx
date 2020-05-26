import React, { useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";

// Axios
import axios from "axios";

// Logo
import RantLogo from "../assets/images/RantLogoTransparent.png";

// Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";

interface SignUpErrors {
  firstName: string;
  handle: string;
  email: string;
  password: string;
  confirmPassword: string;
  general: string;
}

interface Props extends RouteComponentProps<any> {}

export const SignUp: React.FC<Props> = ({ history }) => {
  // Setting State for First Name, Last Name, Username, Email, Password, Confirm Password, Loading, and Errors
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<SignUpErrors>({
    firstName: "",
    handle: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: ""
  });

  // Handles Submission for Sign Up Form
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setLoading(true);
    const signupCredentials: { [k: string]: string } = {
      firstName: firstName,
      lastName: lastName,
      handle: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    };
    axios
      .post("/user/signup", signupCredentials)
      .then((res: any) => {
        localStorage.setItem("firebaseAuthToken", `Bearer ${res.data.token}`);
        setLoading(false);
        history.push("/home");
      })
      .catch((err: any) => {
        const errors: SignUpErrors = {
          firstName: "",
          handle: "",
          email: "",
          password: "",
          confirmPassword: "",
          general: "",
          ...err.response.data.errors,
          ...err.response.data
        };
        setErrors(errors);
        setLoading(false);
      });
  };

  return (
    <div style={{ display: "block" }}>
      <div className="background-image"></div>
      <div className="signup-content">
        <div className="signup-form-content">
          <img src={RantLogo} className="signup-logo" alt="Rant Logo"></img>
          <h2 className="text-center">SIGN UP</h2>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              id="firstName"
              name="firstName"
              type="text"
              label="First Name"
              helperText={errors.firstName}
              error={errors.firstName ? true : false}
              onChange={e => setFirstName(e.target.value)}
              fullWidth
            />
            <TextField
              id="lastName"
              name="lastName"
              type="text"
              label="Last Name"
              onChange={e => setLastName(e.target.value)}
              fullWidth
            />
            <TextField
              id="username"
              name="username"
              type="text"
              label="Username"
              helperText={errors.handle}
              error={errors.handle ? true : false}
              onChange={e => setUsername(e.target.value)}
              fullWidth
            />
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
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              onChange={e => setConfirmPassword(e.target.value)}
              fullWidth
            />
            <p className="sign-up-text">
              Already have an account? Log in <Link to="/signup">here</Link>.
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