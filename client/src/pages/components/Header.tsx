import React, { useContext } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";

// Context
import { ReducerContext } from "../../types";
import { UserContext } from "../../context/UserContext";

// Material Imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { ThemeProvider } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import BlurCircularRoundedIcon from "@material-ui/icons/BlurCircularRounded";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

// Logo
import RantLogo from "../../assets/images/RantLogoTransparent.png";

// Header Theme
import { headerTheme } from "../../assets/themes/Themes";

export const Header: React.FC = () => {
  // Importing Context (Global Store)
  const { state } = useContext<ReducerContext>(UserContext);

  const history = useHistory();

  return (
    <div className="header">
      <ThemeProvider theme={headerTheme}>
        <AppBar color="primary">
          <Toolbar>
            <div className="header-content">
              <Tooltip title="Home" placement="bottom">
                <img
                  src={RantLogo}
                  className="header-logo"
                  alt="Rant Logo"
                  onClick={() => {
                    history.push('/home');
                  }}
                ></img>
              </Tooltip>
              <div className="content-right">
                <div className="spacer">
                  <Tooltip title="Create Rant" placement="bottom">
                    <IconButton
                      onClick={() => {
                        history.push('/home/create');
                      }}
                    >
                      <AddCircleIcon color="action" style={{ fontSize: 40 }} />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className="spacer">
                  <Tooltip title="Rantverse" placement="bottom">
                    <IconButton>
                      <BlurCircularRoundedIcon
                        color="action"
                        style={{ fontSize: 40 }}
                      />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className="spacer">
                  <Tooltip title="Profile" placement="bottom">
                    <img
                      className="header-img"
                      src={state.credentials.imageURL}
                      onClick={() => {
                        history.push('/home/profile');
                      }}
                      alt={state.credentials.userName}
                    ></img>
                  </Tooltip>
                </div>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default Header;