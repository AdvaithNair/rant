import React from "react";
import { useHistory } from "react-router-dom";

// Material UI
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

interface Props {
  menu: boolean;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
  anchor: any;
  setAnchor: React.Dispatch<React.SetStateAction<any>>;
}

// TODO: Break this up into components
export const MobileMenu: React.FC<Props> = ({
  menu,
  setMenu,
  anchor,
  setAnchor
}) => {
  // History for Page Direction
  const history = useHistory();

  // On Close of Menu (or Click Away)
  const handleClose = (event: any) => {
    event.stopPropagation();
    setMenu(false);
    setAnchor(null);
  };

  // Sends to Create Page
  const handleCreate = (event: any) => {
    history.push("/home/create")
    handleClose(event);
  }

  // Sends to Rantverse Page
  const handleRantverse = (event: any) => {
    history.push("/home/rantverse")
    handleClose(event);
  }

  // Sends to Profile Page
  const handleProfile = (event: any) => {
    history.push("/home/profile")
    handleClose(event);
  }

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
            <MenuItem onClick={handleCreate}>
              Create Rant
            </MenuItem>
            <MenuItem onClick = {handleRantverse}>Rantverse</MenuItem>
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
          </MenuList>
        </ClickAwayListener>
      </Popover>
    </div>
  );
};

export default MobileMenu;
