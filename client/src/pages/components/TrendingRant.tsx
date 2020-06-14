import React, { useState, useContext, useEffect } from "react";
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

// Time Formatting
import { formatDate, formatTime, formatRelative } from "../../time";

// Props
interface Props {
  index: number;
  data: RantData;
}

// TODO: Break this up into components
export const TrendingRant: React.FC<Props> = ({ index, data }) => {
  // Importing Context (Global Store)
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  // History to Push Pages
  const history = useHistory();

  // Local Color State
  const [color, setColor] = useState<string>("");

  // Determines Trending Rant's Color Based On Index
  useEffect(() => {
    switch (index) {
      case 1:
        setColor("#F012BE");
        break;
      case 2:
        setColor("#DC27C0");
        break;
      case 3:
        setColor("#C73BC1");
        break;
      case 4:
        setColor("#B350C3");
        break;
      case 5:
        setColor("#9F65C4");
        break;
      case 6:
        setColor("#8A79C6");
        break;
      case 7:
        setColor("#768EC7");
        break;
      case 8:
        setColor("#62A3C9");
        break;
      case 9:
        setColor("#4DB7CA");
        break;
      case 10:
        setColor("#39CCCC");
        break;
      default:
        setColor("grey");
        break;
    }
  }, []);

  // Takes Client To Rant Page
  const toRantPage = (event: any) => {
    event.stopPropagation();
    history.push(`/home/rant/${data.rantID}`);
  };

  // Takes Client To User Page
  const toUserPage = (event: any) => {
    event.stopPropagation();
    if (data.handle === state.credentials.handle) history.push("/home/profile");
    else history.push(`/home/users/${data.handle}`);
  };

  return (
    <div
      className="trending-card"
      style={{ backgroundColor: color }}
      onClick={toRantPage}
    >
      <div className="trending-rank">
        <h1 style={{ color: "white" }}>{index}</h1>
      </div>
      <div className="trending-rant">
        <div className="trending-rant-title">
          <h1>{data.title}</h1>
          <h2>Score: {data.rantverseScore}</h2>
        </div>
        <div className="rant-credits">
          <div className="rant-credits-main">
            <div className="rant-credits-img">
              <img alt={data.handle} src={data.imageURL}></img>
            </div>
            <div className="rant-credits-info">
              <h2>{data.userName}</h2>
              <div onClick={toUserPage}>
                <h3 className="trending-handle-hover">@{data.handle}</h3>
              </div>
              <p>
                <u>{formatRelative(data.createdAt)}</u>
              </p>
            </div>
          </div>
        </div>
        <div className="trending-rant-info">
          <span style={{ marginRight: "0px", marginLeft: "20px" }}>
            <FavoriteIcon style={{ color: "white", fontSize: "30" }} />
          </span>
          <span>{data.likeCount}</span>
          <ChatIcon style={{ color: "white", fontSize: "30" }} />
          <span>{data.commentCount}</span>
        </div>
      </div>
    </div>
  );
};

export default TrendingRant;
