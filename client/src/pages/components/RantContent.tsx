import React, { useState, useContext } from "react";
import { RantData } from "../../types";
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
import LockIcon from "@material-ui/icons/Lock";

// Time Formatting
import { formatDate, formatTime, formatRelative } from "../../time";

// Props
interface Props {
  data: RantData;
}

// TODO: Break this up into components
export const RantContent: React.FC<Props> = ({ data }) => {
  // Importing Context (Global Store)
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  // History to Push Pages
  const history = useHistory();

  // Local States
  // TODO: Be careful about userdata local session
  const [liked, setLiked] = useState<boolean>(
    (state.likes.find((e: any) => e.rantID === data.rantID) ? true : false) ||
      (JSON.parse(localStorage.likeData || "{[]}").find(
        (e: any) => e.rantID === data.rantID
      )
        ? true
        : false) ||
      false
  );
  const [menu, setMenu] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<any>(null);

  // Liked Componenets
  const isLiked: JSX.Element = (
    <FavoriteIcon style={{ color: "#F012BE", fontSize: "30" }} />
  );
  const notLiked: JSX.Element = (
    <FavoriteBorderIcon style={{ color: "#F012BE", fontSize: "30" }} />
  );

  // Toggles Like
  const toggleLike = (event: any) => {
    event.stopPropagation();
    toggleLikeRequest(state, dispatch, data.rantID, liked);
    setLiked(!liked);
    liked ? data.likeCount-- : data.likeCount++;
  };

  // On Click of Menu
  const handleClick = (event: any) => {
    event.stopPropagation();
    setMenu(true);
    setAnchor(event.currentTarget);
  };

  // Takes Client To User Page
  const toUserPage = (event: any) => {
    event.stopPropagation();
    if (data.handle === state.credentials.handle) history.push("/home/profile");
    else history.push(`/home/users/${data.handle}`);
  };

  return (
    <div style={{ maxWidth: "1200px" }}>
      <div className="rant-title">
        {data.isPrivate && (
          <LockIcon
            style={{
              color: "white",
              fontSize: "40px",
              marginLeft: "10px",
              marginTop: "10px",
              marginRight: "-10px"
            }}
          />
        )}
        <div className="rant-title-text">
          <h1>{data.title}</h1>
        </div>
        <div className="more-icon">
          {state.credentials.userID === data.userID && (
            <IconButton onClick={handleClick}>
              <MoreVertIcon style={{ color: "white" }} />
            </IconButton>
          )}
          <RantMenu
            menu={menu}
            setMenu={setMenu}
            anchor={anchor}
            setAnchor={setAnchor}
            rantData={data}
          />
        </div>
      </div>
      <div className="rant-content-body">
        <div className="rant-credits">
          <div className="rant-credits-main">
            <div className="rant-credits-img" onClick={toUserPage}>
              <img alt={data.handle} src={data.imageURL}></img>
            </div>
            <div className="rant-credits-info">
              <div onClick={toUserPage}>
                <h2>{data.userName}</h2>
                <h3 className="user-handle-hover">@{data.handle}</h3>
              </div>
              <p>
                <u>{formatRelative(data.createdAt)}</u>
              </p>
            </div>
          </div>
          <div className="rant-credits-date">
            <h3>Created</h3>
            <p>{formatDate(data.createdAt)}</p>
            <p>{formatTime(data.createdAt)}</p>
            <p></p>
          </div>
        </div>
        <div className="rant-content">
          {data.body.split("\\\\n").map((item: string, i: any) => (
            <p key={i}>{item}</p>
          ))}
          <div className="rant-info">
            <span style={{ marginRight: "0px" }} onClick={toggleLike}>
              {liked ? isLiked : notLiked}
            </span>
            <span>{data.likeCount}</span>
            <ChatIcon style={{ color: "#39CCCC", fontSize: "30" }} />
            <span>{data.commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RantContent;
