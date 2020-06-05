import React, { useState, useContext, useEffect } from "react";
import { NotificationData } from "../../types";
import { useHistory } from "react-router-dom";

// Context
import { ReducerContext } from "../../types";
import { UserContext } from "../../context/Context";
import { toggleLikeRequest } from "../../context/Actions";

// Components
import RantMenu from "./dialogs/RantMenu";

// Material UI
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import Divider from "@material-ui/core/Divider";

// Time Formatting
import { formatDate, formatTime, formatRelative } from "../../time";

// Props
interface Props {
  data: NotificationData;
}

// TODO: Break this up into components
export const Notification: React.FC<Props> = ({ data }) => {
  // Importing Context (Global Store)
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  // History to Push Pages
  const history = useHistory();

  return (
    <div className="notification-main">
      <img className="header-img" src={data.imageURL} alt={data.sender}></img>
      <div className="notification-data" style={{ whiteSpace: 'pre' }}>
        <span
          className="notification-handle"
          onClick={() => history.push(`/home/users/${data.sender}`)}
        >
          @{data.sender}{" "}
        </span>
        <span>
          {data.type === "like" ? "liked " : "commented on "}your post{" - "}
        </span>
        <span style={{ color: "#F012BE" }}>
          {formatRelative(data.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default Notification;
