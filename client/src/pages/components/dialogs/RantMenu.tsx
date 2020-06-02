import React, { useState, useContext } from "react";

// Context
import { ReducerContext, RantData } from "../../../types";
import { UserContext } from "../../../context/UserContext";
import { deleteRant } from "../../../context/actions/UserActions";

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
  rantData: RantData;
}

// TODO: Break this up into components
export const RantMenu: React.FC<Props> = ({
  menu,
  setMenu,
  anchor,
  setAnchor,
  rantData
}) => {
  // Importing Context (Global Store)
  const { dispatch } = useContext<ReducerContext>(UserContext);

  // Local States
  const [dialog, setDialog] = useState<boolean>(false);
  
  // History for Page Direction
  const history = useHistory();

  // On Close of Menu (or Click Away)
  const handleClose = () => {
    setMenu(false);
    setAnchor(null);
  };

  // Redirects to Edit Page
  const handleEdit = () => {
      // TODO: Update this URL to include rant ID
      //history.push(`/home/edit`);
  }

  // Opens Delete Dialog
  const handleDelete = () => {
    setDialog(true);
    setMenu(false);
  };

  // Closes Delete Dialog
  const handleDeleteClose = () => {
    setDialog(false);
  };

  // Deletes Object
  const handleDeleteSubmit = () => {
    deleteRant(rantData.rantID, dispatch);
    handleDeleteClose();
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
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </MenuList>
        </ClickAwayListener>
      </Popover>
      <Dialog open={dialog} onClose={handleDeleteClose}>
        <DialogTitle>Delete Rant</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this rant?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteSubmit} style={{ color: "red" }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RantMenu;
