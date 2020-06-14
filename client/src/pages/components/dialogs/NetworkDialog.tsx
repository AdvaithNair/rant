import React from "react";
import { useHistory } from "react-router-dom";

// Context
import { NetworkData } from "../../../types";

// Componenents
import Network from "../Network";

// Material UI
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

interface Props {
  title: string;
  data: Array<NetworkData>;
  dialog: boolean;
  setDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

// TODO: Break this up into components
export const NetworkDialog: React.FC<Props> = ({
  title,
  data,
  dialog,
  setDialog
}) => {
  // History for Page Direction
  const history = useHistory();

  // Closes Dialog
  const handleClose = (event: any) => {
    event.stopPropagation();
    setDialog(false);
  };

  return (
    <div>
      <Dialog open={dialog} onClose={handleClose}>
        <DialogTitle style = {{textAlign: 'center'}}>{title}</DialogTitle>
        <DialogContent>
          <MenuList>
            {data.length > 0 &&
              data.map((network: NetworkData) => (
                <MenuItem
                  key={network.handle}
                  onClick={(event: any) => {
                    history.push(`/home/users/${network.handle}`);
                    handleClose(event);
                  }}
                >
                  <Network data={network} />
                </MenuItem>
              ))}
            {data.length === 0 && (
              <MenuItem>
                <small style={{ color: "red" }}>No {title}</small>
              </MenuItem>
            )}
          </MenuList>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NetworkDialog;
