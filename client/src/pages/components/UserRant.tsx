import React, { useState, useContext } from "react";
import { RantData } from "../../types";
import { useHistory } from "react-router-dom";

// Context
import { ReducerContext } from "../../types";
import { UserContext } from "../../context/Context";
import { toggleLikeRequest } from "../../context/Actions";

// Material UI
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

// Time Formatting
import { formatRelative } from "../../time";

// Props
interface Props {
  data: RantData;
}

// TODO: Break this up into components
export const UserRant: React.FC<Props> = ({ data }) => {
  // Importing Context (Global Store)
  const { dispatch } = useContext<ReducerContext>(UserContext);

  // History to Push Pages
  const history = useHistory();

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

  // Toggles Like
  const toggleLike = (event: any) => {
    event.stopPropagation();
    toggleLikeRequest(dispatch, data.rantID, liked);
    setLiked(!liked);
    liked ? data.likeCount-- : data.likeCount++;
  };

  return (
    <div
      className="rant-body"
      onClick={() => history.push(`/home/rant/${data.rantID}`)}
      style={{ width: "100%" }}
    >
      <div className="rant-title" style = {{backgroundColor: '#956FC5'}}>
        <div className="rant-title-text">
          <h1>{data.title}</h1>
        </div>
      </div>
      <div className="rant-content-body">
        <div className="rant-content">
          {data.body.split("\\\\n").map((item: string, i: any) => (
            <p key={i}>{item}</p>
          ))}
          <div className="rant-info" style={{marginBottom: '-20px'}}>
            <span style={{ marginRight: "0px" }} onClick={toggleLike}>
              {liked ? isLiked : notLiked}
            </span>
            <span>{data.likeCount}</span>
            <ChatIcon style={{ color: "#39CCCC", fontSize: "30" }} />
            <span>{data.commentCount}</span>
            <div className="user-rant-date">
              <p style = {{fontWeight: 600}}>
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
