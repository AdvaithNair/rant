import React from "react";
import { NotificationData } from "../../types";
import { useHistory } from "react-router-dom";

// Time Formatting
import { formatRelative } from "../../time";

// Props
interface Props {
  data: NotificationData;
}

// TODO: Break this up into components
export const Notification: React.FC<Props> = ({ data }) => {
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
          {data.type === "like" ? "liked " : "commented on "}your rant{" - "}
        </span>
        <span style={{ color: "#F012BE" }}>
          {formatRelative(data.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default Notification;
