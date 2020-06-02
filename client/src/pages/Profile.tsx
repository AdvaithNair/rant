import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

// Context
import { ReducerContext } from "../types";
import { UserContext } from "../context/UserContext";
import {
  logoutUser
} from "../context/actions/UserActions";

// Dialogs
import EditProfile from "./components/dialogs/EditProfile";
import UploadImage from "./components/dialogs/UploadImage";

// DayJS
import dayjs from "dayjs";

// Material UI
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";

type ImageUploadData = { [k: string]: any | string | Blob };

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

  // Formats Created At Entry
  const formatJoined = (input: string) => {
    return dayjs(input).format("MMMM D, YYYY");
  };

  // Formats Total Days on Rant
  const formatDays = (input: string) => {
    return dayjs().diff(input, "day");
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
        <div className="profile-card-content">
          <Tooltip title="Update Profile Picture" placement="bottom">
            <div
              className="profile-card-image-container"
              onClick={() => setImage(true)}
            >
              <img
                className="profile-card-image"
                src={state.credentials.imageURL}
                alt={state.credentials.userName}
              ></img>
              {state.UI.loading && (
                <div className="loading-profile">
                  <CircularProgress style={{ top: "50%" }} color="primary" />
                </div>
              )}
              <div className="profile-card-image-overlay">
                <IconButton
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                  }}
                >
                  <PhotoCameraIcon fontSize="large" />
                </IconButton>
              </div>
            </div>
          </Tooltip>

          <h1 style={{ paddingTop: "10px" }}>{state.credentials.userName}</h1>
          <h2 className="profile-handle">@{state.credentials.handle}</h2>

          {state.credentials.bio && <h3>Bio</h3>}
          {state.credentials.bio && <p>{state.credentials.bio}</p>}
          {state.credentials.website && <h3>Website</h3>}
          {state.credentials.website && (
            <p>
              <a href={state.credentials.website} style={{ color: "#39CCCC" }}>
                {formatWebsite(state.credentials.website)}
              </a>
            </p>
          )}
          <h3>Joined</h3>
          <p style={{ marginBottom: "-10px" }}>
            {formatJoined(state.credentials.createdAt)}
          </p>
          <p style={{ marginBottom: "40px" }}>
            Ranting for {formatDays(state.credentials.createdAt)} Days
          </p>
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
    </div>
  );
};

export default Profile;
