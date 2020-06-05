import React, { useContext } from "react";

// Context
import { ReducerContext } from "../../types";
import { UserContext } from "../../context/Context";

// Time Formatting
import { formatDate, formatDays } from "../../time";

// Material UI
import IconButton from "@material-ui/core/IconButton";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Props {
  setImage: any;
  isAuth: boolean;
  data: { [k: string]: any };
}

export const UserContent: React.FC<Props> = ({ setImage, isAuth, data }) => {
  // Importing Context (Global Store)
  const { state } = useContext<ReducerContext>(UserContext);

  // Formats Wesbite Entry
  const formatWebsite = (input: string) => {
    const trimmed = input.trim();
    if (trimmed.substring(0, 4) === "http") return trimmed.substring(7);
    if (trimmed.substring(0, 5) === "https") return trimmed.substring(8);
  };

  return (
    <div className="profile-card-content">
      {isAuth && (
        <Tooltip title="Update Profile Picture" placement="bottom">
          <div
            className="profile-card-image-container"
            onClick={() => setImage(true)}
          >
            <img
              className="profile-card-image"
              src={data.imageURL}
              alt={data.userName}
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
      )}
      {!isAuth && (
        <div className="profile-card-image-container">
          <img
            className="profile-card-image-display"
            src={data.imageURL}
            alt={data.userName}
          ></img>
          {state.UI.loading && (
            <div className="loading-profile">
              <CircularProgress style={{ top: "50%" }} color="primary" />
            </div>
          )}
        </div>
      )}

      <h1 style={{ paddingTop: "10px" }}>{data.userName}</h1>
      <h2 className="profile-handle">@{data.handle}</h2>

      {data.bio && <h3>Bio</h3>}
      {data.bio && <p>{data.bio}</p>}
      {data.website && <h3>Website</h3>}
      {data.website && (
        <p>
          <a href={data.website} style={{ color: "#39CCCC" }}>
            {formatWebsite(data.website)}
          </a>
        </p>
      )}
      <h3>Joined</h3>
      <p style={{ marginBottom: "-10px" }}>{formatDate(data.createdAt)}</p>
      <p style={{ marginBottom: "40px" }}>
        Ranting for {formatDays(data.createdAt)} Days
      </p>
    </div>
  );
};

export default UserContent;
