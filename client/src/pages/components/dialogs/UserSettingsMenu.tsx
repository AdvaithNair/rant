import React, { useState, useContext } from "react";

// Context
import { ReducerContext, RantData } from "../../../types";
import { UserContext } from "../../../context/Context";
import { deleteRant } from "../../../context/Actions";

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
import { useHistory } from "react-router-dom";

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

  // History for Page Direction
  const history = useHistory();

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

  // Submits Email Change
  const handleEmailSubmit = (event: any) => {
    event.stopPropagation();
    // Email Change Code
    console.log('changed email');
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

  // Submits Password Change
  const handlePasswordSubmit = (event: any) => {
    event.stopPropagation();
    // Password Change Code
    console.log('changed password');
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
          Fix Change Email UI Here Later TODO
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
          Fix Change Password UI Here Later TODO
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
    </div>
  );
};

export default UserSettingsMenu;
