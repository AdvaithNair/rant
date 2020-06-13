import React, { useState, useContext } from "react";

// Context
import { ReducerContext } from "../../../types";
import { UserContext } from "../../../context/Context";
import { UPDATE_USER_EMAIL } from "../../../context/ReducerTypes";

// Axios
import axios from "axios";

// Material UI
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

interface Props {
  menu: boolean;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
  anchor: any;
  setAnchor: React.Dispatch<React.SetStateAction<any>>;
}

// TODO: Break this up into components
export const UserSettingsMenu: React.FC<Props> = ({
  menu,
  setMenu,
  anchor,
  setAnchor
}) => {
  // Importing Context (Global Store)
  const { dispatch } = useContext<ReducerContext>(UserContext);

  // Local States
  const [emailDialog, setEmailDialog] = useState<boolean>(false);
  const [passwordDialog, setPasswordDialog] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [openEmail, setOpenEmail] = useState<boolean>(false);
  const [openPassword, setOpenPassword] = useState<boolean>(false);
  const [openEmailError, setOpenEmailError] = useState<boolean>(false);
  const [openPasswordError, setOpenPasswordError] = useState<boolean>(false);

  // On Close of Menu (or Click Away)
  const handleClose = (event: any) => {
    event.stopPropagation();
    setMenu(false);
    setAnchor(null);
  };

  // Opens Email Dialog
  const handleEmail = (event: any) => {
    event.stopPropagation();
    setEmailDialog(true);
    setMenu(false);
  };

  // Closes Email Dialog
  const handleEmailClose = (event: any) => {
    event.stopPropagation();
    setEmailDialog(false);
  };

  // Closes Email Snackbar
  const handleEmailSnackClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenEmail(false);
    setOpenEmailError(false);
  };

  // Submits Email Change
  const handleEmailSubmit = (event: any) => {
    event.stopPropagation();
    // Email Change Code
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(regEx)) {
      setEmailError("Must Be A Valid Email Address");
      return;
    }
    axios
      .put("/user/update/email", { email })
      .then(() => {
        dispatch({ type: UPDATE_USER_EMAIL, payload: email });
        setOpenEmail(true);
      })
      .catch((err: Error) => {
        console.log(err);
        setOpenEmailError(true);
        return;
      });
    setEmail("");
    handleEmailClose(event);
  };

  // Opens Password Dialog
  const handlePassword = (event: any) => {
    event.stopPropagation();
    setPasswordDialog(true);
    setMenu(false);
  };

  // Closes Password Dialog
  const handlePasswordClose = (event: any) => {
    event.stopPropagation();
    setPasswordDialog(false);
  };

  // Closes Password Snackbar
  const handlePasswordSnackClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenPassword(false);
    setOpenPasswordError(false);
  };

  // Submits Password Change
  const handlePasswordSubmit = (event: any) => {
    event.stopPropagation();
    setPasswordError("");
    setConfirmPasswordError("");
    if (password.length < 6) {
      setPasswordError("Weak Password");
      if (password !== confirmPassword)
        setConfirmPasswordError("Passwords Must Match");

      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords Must Match");
      return;
    }
    axios
      .put("/user/update/password", { password })
      .then(() => {})
      .catch((err: Error) => {
        console.log(err);
        setOpenPasswordError(true);
        return;
      });
    setPassword("");
    setConfirmPassword("");
    setOpenPassword(true);
    handlePasswordClose(event);
  };

  return (
    <div>
      <Popover
        open={menu}
        anchorEl={anchor}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <MenuList autoFocusItem={menu}>
            <MenuItem onClick={handleEmail}>Update Email</MenuItem>
            <MenuItem onClick={handlePassword}>Update Password</MenuItem>
          </MenuList>
        </ClickAwayListener>
      </Popover>
      <Dialog open={emailDialog} onClose={handleEmailClose}>
        <DialogTitle>Update Email</DialogTitle>
        <DialogContent>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            helperText={emailError}
            error={emailError ? true : false}
            onChange={e => setEmail(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEmailClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEmailSubmit} style={{ color: "#F012BE" }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={passwordDialog} onClose={handlePasswordClose}>
        <DialogTitle>Update Password</DialogTitle>
        <DialogContent>
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            helperText={passwordError}
            error={passwordError ? true : false}
            onChange={e => setPassword(e.target.value)}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            helperText={confirmPasswordError}
            error={confirmPasswordError ? true : false}
            onChange={e => setConfirmPassword(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePasswordClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePasswordSubmit} style={{ color: "#F012BE" }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openEmail}
        autoHideDuration={6000}
        onClose={handleEmailSnackClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleEmailSnackClose}
          severity="success"
        >
          Successfully Updated Email
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={openEmailError}
        autoHideDuration={6000}
        onClose={handleEmailSnackClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleEmailSnackClose}
          severity="error"
        >
          Error Updating Email
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={openPassword}
        autoHideDuration={6000}
        onClose={handlePasswordSnackClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handlePasswordSnackClose}
          severity="success"
        >
          Successfully Updated Password
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={openPasswordError}
        autoHideDuration={6000}
        onClose={handlePasswordClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handlePasswordClose}
          severity="error"
        >
          Error Updating Password
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default UserSettingsMenu;
