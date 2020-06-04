import React, { useState, useContext, useEffect } from "react";
import { RantData } from "../../types";
import { useHistory } from "react-router-dom";

// Context
import { ReducerContext } from "../../types";
import { UserContext } from "../../context/Context";

// Components
import RantContent from './RantContent'

// Material UI
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

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

  // Takes to Individual Rant Page
  const expandRant = (event: any) => {
    event.stopPropagation();
    history.push(`/home/rant/${data.rantID}`);
  };

  return (
    <div className="rant-body" onClick={expandRant}>
      <RantContent data = {data}/>
    </div>
  );
};

export default Rant;
