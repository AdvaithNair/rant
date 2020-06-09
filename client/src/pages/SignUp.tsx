import React, { useState, useContext } from "react";
import { Link, RouteComponentProps, useHistory } from "react-router-dom";

// Context
import { ReducerContext } from "../types";
import { UserContext } from "../context/Context";
import { handleUser } from "../context/Actions";

// Logo
import RantLogo from "../assets/images/RantLogoTransparent.png";

// Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import TermsAndConditionsDialog from "./components/dialogs/TermsAndConditionsDialog";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// TODO: Integrate this into a single forms hook instead of seperate ones
interface SignUpForm {
  firstName: string;
  handle: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignUp: React.FC = () => {
  // Setting State for First Name, Last Name, Username, Email, Password, and Confirm Password (for Form Input)
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [openedTerms, setOpenedTerms] = useState<boolean>(false);
  const [agreed, setAgreed] = useState<boolean>(false);

  // Importing Context (Global Store)
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  // History to Push Pages
  const history = useHistory();

  // Handles Submission for Sign Up Form
  const handleSubmit = (event: any) => {
    event.preventDefault();

    if(!agreed) {
      return;
    }

    const signupCredentials: { [k: string]: string } = {
      firstName: firstName,
      lastName: lastName,
      handle: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    };

    // Signs Up User
    handleUser(signupCredentials, history, dispatch, "signup");
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
              helperText={state.UI.errors.firstName}
              error={state.UI.errors.firstName ? true : false}
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
              helperText={state.UI.errors.handle}
              error={state.UI.errors.handle ? true : false}
              onChange={e => setUsername(e.target.value)}
              fullWidth
            />
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
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              helperText={state.UI.errors.confirmPassword}
              error={state.UI.errors.confirmPassword ? true : false}
              onChange={e => setConfirmPassword(e.target.value)}
              fullWidth
            />
            <div className="terms">
              <div onClick={() => setOpenedTerms(true)}>
                <Typography>Terms and Conditions</Typography>
              </div>
              {!agreed && <Typography style={{ fontSize: "10px", color: "red" }}>
                Please Agree to Terms and Conditions
              </Typography>}
            </div>
            <TermsAndConditionsDialog openedTerms = {openedTerms} setOpenedTerms = {setOpenedTerms} setAgreed = {setAgreed}/>
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
            {state.UI.loading && <LinearProgress color="secondary" />}
            <div style={{ display: "flex", margin: "0 auto" }}>
              <div className="signup-back" onClick = {() => history.push('/')}>
                <ArrowBackIcon style={{ paddingTop: "10px" }} />
                <p style={{ marginLeft: "30px", marginTop: "-25px" }}>Go Back</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
