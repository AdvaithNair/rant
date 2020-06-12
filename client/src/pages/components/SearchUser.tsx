import React, { useContext } from "react";
import { SearchUserData } from "../../types";
import { useHistory } from "react-router-dom";

// Context
import { ReducerContext } from "../../types";
import { UserContext } from "../../context/Context";

// Material UI
import Divider from "@material-ui/core/Divider";

interface Props {
  data: SearchUserData;
}

export const SearchUser: React.FC<Props> = ({ data }) => {
  // Importing Context (Global Store)
  const { state } = useContext<ReducerContext>(UserContext);

  // History to Push Pages
  const history = useHistory();

  // Takes Client To User Page
  const toUserPage = (event: any) => {
    event.stopPropagation();
    if (data.handle === state.credentials.handle) history.push("/home/profile");
    else history.push(`/home/users/${data.handle}`);
  };

  return (
    <div className="search-user-element">
      <Divider />
      <div className="rant-credits">
        <div className="rant-credits-main">
          <div className="rant-credits-img">
            <img alt={data.handle} src={data.imageURL}></img>
          </div>
          <div className="rant-credits-info">
            <h2>{data.userName}</h2>
            <div onClick={toUserPage}>
              <h3 className="user-handle-hover">@{data.handle}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
