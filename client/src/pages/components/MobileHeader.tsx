import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

// Context
import { ReducerContext } from "../../types";
import { UserContext } from "../../context/Context";

// Components
import Notifications from "./Notifications";

// Material Imports
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MobileMenu from "./dialogs/MobileMenu";

export const MobileHeader: React.FC = () => {
  // Importing Context (Global Store)
  const { state } = useContext<ReducerContext>(UserContext);

  const history = useHistory();

  // Local States
  const [menu, setMenu] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<any>(null);

  // On Click of Menu
  const handleClick = (event: any) => {
    event.stopPropagation();
    setMenu(true);
    setAnchor(event.currentTarget);
  };

  return (
    <div className="mobile-menu">
      <Notifications />
      <IconButton onClick={handleClick}>
        <MenuIcon style={{ fontSize: window.innerWidth > 375 ? "40px" : "30px" }} />
      </IconButton>
      <MobileMenu
        menu={menu}
        setMenu={setMenu}
        anchor={anchor}
        setAnchor={setAnchor}
      />
    </div>
  );
};

export default MobileHeader;
