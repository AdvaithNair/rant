import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

// Context
import { ReducerContext } from "../types";
import { UserContext } from "../context/Context";
import {
  logoutUser
} from "../context/Actions";

// Components
import UserContent from './components/UserContent';

// Dialogs
import EditProfile from "./components/dialogs/EditProfile";
import UploadImage from "./components/dialogs/UploadImage";

// Material UI
import Button from "@material-ui/core/Button";

// type ImageUploadData = { [k: string]: any | string | Blob };

export const Profile: React.FC = () => {
  // Importing Context (Global Store)
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  // Local States for Dialog Triggers
  const [edit, setEdit] = useState<boolean>(false);
  const [image, setImage] = useState<boolean>(false);

  // History to Push Page
  const history = useHistory();

  // Formats Wesbite Entry
  const formatWebsite = (input: string) => {
    const trimmed = input.trim();
    if (trimmed.substring(0, 4) === "http") return trimmed.substring(7);
    if (trimmed.substring(0, 5) === "https") return trimmed.substring(8);
  };

  // Logs Out User
  const handleLogout = () => {
    logoutUser(dispatch);
    history.push("/");
  };

  return (
    <div className="main-home-content">
      <h1>PROFILE</h1>
      <div className="profile-card">
          <UserContent setImage = {setImage} isAuth = {true} data={state.credentials}/>
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
          <UploadImage image={image} setImage={setImage}/>
        </div>
        <div style={{ clear: "both" }}></div>
      </div>
  );
};

export default Profile;
