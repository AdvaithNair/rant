import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

// Context
import { ReducerContext, RantData } from "../types";
import { UserContext } from "../context/Context";
import { logoutUser } from "../context/Actions";

// Components
import UserContent from "./components/UserContent";
import UserRant from "./components/UserRant";

// Dialogs
import EditProfile from "./components/dialogs/EditProfile";
import UploadImage from "./components/dialogs/UploadImage";

// Material UI
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import Tooltip from "@material-ui/core/Tooltip";
import UserSettingsMenu from "./components/dialogs/UserSettingsMenu";

// type ImageUploadData = { [k: string]: any | string | Blob };

export const Profile: React.FC = () => {
  // Importing Context (Global Store)
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  // Local States for Dialog Triggers
  const [edit, setEdit] = useState<boolean>(false);
  const [image, setImage] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<any>(null);

  // History to Push Page
  const history = useHistory();

  // On Click of Menu
  const handleClick = (event: any) => {
    event.stopPropagation();
    setMenu(true);
    setAnchor(event.currentTarget);
  };

  // Logs Out User
  const handleLogout = () => {
    logoutUser(dispatch);
    history.push("/");
  };

  return (
    <div className="main-home-content">
      <h1 className="main-header">PROFILE</h1>
      <div className="profile-card">
        <div className="profile-settings">
          <Tooltip title="Settings" placement="bottom">
            <IconButton onClick={handleClick}>
              <SettingsIcon style={{ fontSize: "40px" }} />
            </IconButton>
          </Tooltip>
          <UserSettingsMenu
            menu={menu}
            setMenu={setMenu}
            anchor={anchor}
            setAnchor={setAnchor}
          />
        </div>
        <UserContent
          setImage={setImage}
          isAuth={true}
          data={state.credentials}
        />
        <div className="edit-profile-button">
          <Button
            style={{
              fontSize: "15px",
              color: "white",
              fontFamily: "Montserrat",
              fontWeight: 550
            }}
            onClick={() => setEdit(true)}
            fullWidth
          >
            Edit Profile
          </Button>
        </div>
        <div className="logout-button">
          <Button
            style={{
              fontSize: "15px",
              color: "white",
              fontFamily: "Montserrat",
              fontWeight: 550
            }}
            onClick={handleLogout}
            fullWidth
          >
            Log Out
          </Button>
        </div>
        <EditProfile edit={edit} setEdit={setEdit} />
        <UploadImage image={image} setImage={setImage} />
      </div>
      <div style={{ clear: "both" }}></div>
      <h1 className="main-header">RANTS</h1>
      {state.rants.filter(
        (rant: RantData) => rant.userID === state.credentials.userID
      ) &&
        state.rants
          .filter((rant: RantData) => rant.userID === state.credentials.userID)
          .map((rant: RantData) => <UserRant key={rant.rantID} data={rant} />)}
      {state.rants.filter(
        (rant: RantData) => rant.userID === state.credentials.userID
      ).length === 0 && <h4 className="text-center">No Rants</h4>}
      <div style={{ marginBottom: "20px" }}></div>
    </div>
  );
};

export default Profile;
