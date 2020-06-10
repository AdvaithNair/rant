import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

// Context
import { ReducerContext } from "../../types";
import { UserContext } from "../../context/Context";

// Components
import MainHeader from "./MainHeader";
import MobileHeader from "./MobileHeader";

// Material Imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { ThemeProvider } from "@material-ui/core/styles";
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
              <MainHeader />
              <MobileHeader />
            </div>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default Header;