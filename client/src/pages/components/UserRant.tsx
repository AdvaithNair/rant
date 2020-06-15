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
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import LockIcon from "@material-ui/icons/Lock";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// Time Formatting
import { formatRelative } from "../../time";

// Props
interface Props {
  data: RantData;
}

// TODO: Break this up into components
export const UserRant: React.FC<Props> = ({ data }) => {
  // Importing Context (Global Store)
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  // History to Push Pages
  const history = useHistory();

  // Local States
  // TODO: Be careful about userdata local session
  const [liked, setLiked] = useState<boolean>(
    JSON.parse(localStorage.likeData || "{[]}").find(
      (e: any) => e.rantID === data.rantID
    )
      ? true
      : false
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

  return (
    <div
      className="rant-body"
      onClick={() => history.push(`/home/rant/${data.rantID}`)}
      style={{ width: "100%" }}
    >
      <div className="rant-title" style={{ backgroundColor: "#956FC5" }}>
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
        {data.handle === 'anonymous' && (
          <AccountCircleIcon
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
        <div className="rant-content">
          {data.body.split("\\\\n").map((item: string, i: any) => (
            <p key={i}>{item}</p>
          ))}
          <div className="rant-info" style={{ marginBottom: "-20px" }}>
            <span style={{ marginRight: "0px" }} onClick={toggleLike}>
              {liked ? isLiked : notLiked}
            </span>
            <span>{data.likeCount}</span>
            <ChatIcon style={{ color: "#39CCCC", fontSize: "30" }} />
            <span>{data.commentCount}</span>
            <div className="user-rant-date">
              <p style={{ fontWeight: 600 }}>
                <u>{formatRelative(data.createdAt)}</u>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRant;
