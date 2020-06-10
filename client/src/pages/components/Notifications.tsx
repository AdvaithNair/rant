import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Context
import { ReducerContext } from "../../types";
import { UserContext } from "../../context/Context";

// Material Imports
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import NotificationMenu from "./dialogs/NotificationMenu";

export const Notifications: React.FC = () => {
  // Importing Context (Global Store)
  const { state } = useContext<ReducerContext>(UserContext);

  // Local States
  const [menu, setMenu] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<any>(null);

  // History to Push Pages
  const history = useHistory();

  // On Click of Menu
  const handleClick = (event: any) => {
    event.stopPropagation();
    setMenu(true);
    setAnchor(event.currentTarget);
  };

  useEffect(() => {}, []);

  return (
    <div className="spacer">
      <Tooltip title="Notifications" placement="bottom">
        <div>
          <IconButton onClick={handleClick}>
            {state.notifications.length > 0 && (
              <Badge badgeContent={state.notifications.length} color="error">
                <NotificationsIcon
                  color="action"
                  style={{
                    fontSize: window.innerWidth > 375 ? "40px" : "30px"
                  }}
                />
              </Badge>
            )}
            {state.notifications.length === 0 && (
              <NotificationsIcon
                color="action"
                style={{ fontSize: window.innerWidth > 375 ? "40px" : "30px" }}
              />
            )}
          </IconButton>
        </div>
      </Tooltip>
      <NotificationMenu
        menu={menu}
        setMenu={setMenu}
        anchor={anchor}
        setAnchor={setAnchor}
        notifications={state.notifications}
      />
    </div>
  );
};

export default Notifications;
