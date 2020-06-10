import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

// Context
import { ReducerContext } from "../../types";
import { UserContext } from "../../context/Context";

// Components
import Notifications from "./Notifications";

// Material Imports
import AddCircleIcon from "@material-ui/icons/AddCircle";
import BlurCircularRoundedIcon from "@material-ui/icons/BlurCircularRounded";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

export const MainHeader: React.FC = () => {
  // Importing Context (Global Store)
  const { state } = useContext<ReducerContext>(UserContext);

  const history = useHistory();

  return (
    <div className="content-right">
      <div className="spacer">
        <Tooltip title="Create Rant" placement="bottom">
          <IconButton
            onClick={() => {
              history.push("/home/create");
            }}
          >
            <AddCircleIcon color="action" style={{ fontSize: 40 }} />
          </IconButton>
        </Tooltip>
      </div>
      <div className="spacer">
        <Tooltip title="Rantverse" placement="bottom">
          <IconButton>
            <BlurCircularRoundedIcon color="action" style={{ fontSize: 40 }} />
          </IconButton>
        </Tooltip>
      </div>
      <Notifications />
      <div className="spacer">
        <Tooltip title="Profile" placement="bottom">
          <img
            className="header-img"
            src={
              JSON.parse(localStorage.userData || "{}").about.imageURL || //TODO: Be Careful about Local Storage
              state.credentials.imageURL
            }
            onClick={() => {
              history.push("/home/profile");
            }}
            alt={state.credentials.userName}
          ></img>
        </Tooltip>
      </div>
    </div>
  );
};

export default MainHeader;
