import React, { useState, useContext } from "react";

// Context
import { ReducerContext, NotificationData } from "../../../types";
import { UserContext } from "../../../context/Context";

// Components
import Notification from "../Notification";

// Material UI
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { useHistory } from "react-router-dom";

interface Props {
  menu: boolean;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
  anchor: any;
  setAnchor: React.Dispatch<React.SetStateAction<any>>;
  notifications: Array<NotificationData>;
}

// TODO: Break this up into components
export const NotificationMenu: React.FC<Props> = ({
  menu,
  setMenu,
  anchor,
  setAnchor,
  notifications
}) => {
  // Importing Context (Global Store)
  const { dispatch } = useContext<ReducerContext>(UserContext);

  // Local States
  const [dialog, setDialog] = useState<boolean>(false);

  // History for Page Direction
  const history = useHistory();

  // On Close of Menu (or Click Away)
  const handleClose = (event: any) => {
    event.stopPropagation();
    setMenu(false);
    setAnchor(null);
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
            <MenuItem>Notifications</MenuItem>
            {notifications.length > 0 &&
              notifications.map((notification: NotificationData) => (
                <MenuItem
                  key={notification.createdAt}
                  onClick={(event: any) => {
                    history.push(`/home/rant/${notification.rantID}`);
                    handleClose(event);
                  }}
                >
                  <Notification data={notification} />
                </MenuItem>
              ))}
            {notifications.length === 0 && (
              <MenuItem><small style = {{color: 'red'}}>No New Activity</small></MenuItem>
            )}
          </MenuList>
        </ClickAwayListener>
      </Popover>
    </div>
  );
};

export default NotificationMenu;
