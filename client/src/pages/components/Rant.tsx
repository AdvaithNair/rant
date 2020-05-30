import React, { useState, useContext, useEffect } from "react";
import { RantData } from "../../types";

// Context
import { ReducerContext } from "../../types";
import { UserContext } from "../../context/UserContext";
import { toggleLikeRequest } from "../../context/actions/UserActions";

// Material UI
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import TextField from "@material-ui/core/TextField";
import InputBase from '@material-ui/core/InputBase';
import Button from "@material-ui/core/Button";
import Divider from '@material-ui/core/Divider';

// DayJS
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Props
interface Props {
  data: RantData;
}

export const Rant: React.FC<Props> = ({ data }) => {
  // Importing Context (Global Store)
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  // Local States
  // TODO: Be careful about userdata local session
  const [liked, setLiked] = useState<boolean>(
    JSON.parse(localStorage.userData || "{}").likes.find(
      (e: any) => e.rantID === data.rantID
    )
      ? true
      : false
  );

  // Liked Componenets
  const isLiked: JSX.Element = (
    <FavoriteIcon style={{ color: "#F012BE", fontSize: "30" }} />
  );
  const notLiked: JSX.Element = (
    <FavoriteBorderIcon style={{ color: "#F012BE", fontSize: "30" }} />
  );

  // On Component Mount, Renders Like
  useEffect(() => {
    /*const storageItem = JSON.parse(localStorage.userData || "{}")
    setLiked(
      JSON.parse(localStorage.userData || "{}").likes.find((e: any) => e.rantID === data.rantID) ? true : false
    );*/
  }, []);

  // Toggles Like
  const toggleLike = () => {
    toggleLikeRequest(dispatch, data.rantID, liked);
    setLiked(!liked);
    liked ? data.likeCount-- : data.likeCount++;
  };

  // Formats Date
  const formatDate = (date: string): string => {
    return dayjs(date).format("MMMM D, YYYY");
  };

  // Formats Time
  const formatTime = (date: string): string => {
    return dayjs(date).format("h:mm A");
  };

  // Formats Relative Time
  const formatRelative = (date: string): string => {
    dayjs.extend(relativeTime);
    return dayjs(date).fromNow();
  };

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
          <p>
            <u>{formatRelative(data.createdAt)}</u>
          </p>
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
        <div className="rant-info">
          <span style={{ marginRight: "0px" }} onClick={toggleLike}>
            {liked ? isLiked : notLiked}
          </span>
          <span>{data.likeCount}</span>
          <ChatIcon style={{ color: "#39CCCC", fontSize: "30" }} />
          <span>{data.commentCount}</span>
        </div>
        <div className="comment-section">
          <TextField
            placeholder="Comment..."
            fullWidth
          />
          <Divider orientation="vertical" />
          <Button style = {{width: '50px', color: '#39CCCC', marginLeft: '20px'}}>Add</Button>
        </div>
      </div>
    </div>
  );
};

export default Rant;
