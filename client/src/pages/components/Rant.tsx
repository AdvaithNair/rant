import React from "react";
import { RantData } from "../../types";

// Material UI
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";

// DayJS
import dayjs from "dayjs";

// Props
interface Props {
  data: RantData;
}

// Formats Date
const formatDate = (date: string): string => {
  return dayjs(date).format("MMMM D, YYYY");
};

// Formats Time
const formatTime = (date: string): string => {
  return dayjs(date).format("h:mm A");
};

export const Rant: React.FC<Props> = ({ data }) => {
  return (
    <div className="rant-body">
      <div className="rant-title">
        <div className="rant-title-text">
          <h1>{data.title}</h1>
        </div>
        <div className="more-icon">
          <IconButton>
            <MoreVertIcon style={{ color: "white" }} />
          </IconButton>
        </div>
      </div>
      <div className="rant-credits">
        <div className="rant-credits-img">
          <img alt={data.handle} src={data.imageURL}></img>
        </div>
        <div className="rant-credits-info">
          <h2>{data.userName}</h2>
          <h3>@{data.handle}</h3>
        </div>
        <div className="rant-credits-date">
          <h3>Created</h3>
          <p>{formatDate(data.createdAt)}</p>
          <p>{formatTime(data.createdAt)}</p>
          <p></p>
        </div>
      </div>
      <div className="rant-content">
        <p>{data.body}</p>
      </div>
      <div className="comment-section"></div>
    </div>
  );
};

export default Rant;