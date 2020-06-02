import React, { useState, useContext, useEffect } from "react";
import { RantData } from "../../types";
import { useHistory } from "react-router-dom";

// Context
import { ReducerContext } from "../../types";
import { UserContext } from "../../context/UserContext";
import { toggleLikeRequest } from "../../context/actions/UserActions";

// Components
import RantContent from './RantContent'
import CommentSection from "./CommentSection";

// Material UI
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

// DayJS
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Props
interface Props {
  data: RantData;
}

// TODO: Break this up into components
export const Rant: React.FC<Props> = ({ data }) => {
  // Importing Context (Global Store)
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  // History for Page Traversal
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
  const [menu, setMenu] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<any>(null);

  // Liked Componenets
  const isLiked: JSX.Element = (
    <FavoriteIcon style={{ color: "#F012BE", fontSize: "30" }} />
  );
  const notLiked: JSX.Element = (
    <FavoriteBorderIcon style={{ color: "#F012BE", fontSize: "30" }} />
  );

  // On Component Mount, Renders Like
  useEffect(() => {
    
  }, []);

  // Takes to Individual Rant Page
  const expandRant = () => {
    history.push(`/home/rant/${data.rantID}`);
  };

  return (
    <div className="rant-body" onClick={expandRant}>
      <RantContent data = {data}/>
    </div>
  );
};

export default Rant;
