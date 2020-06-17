import React from "react";
import { NetworkData } from "../../../types";

// Material UI
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { useHistory } from "react-router-dom";

interface Props {
  data: Array<NetworkData>;
}

// TODO: Break this up into components
export const ExploreMenu: React.FC<Props> = ({ data }) => {
  // History for Page Direction
  const history = useHistory();

  // Takes Client To User Page
  const toUserPage = (event: any, explore: NetworkData) => {
    event.stopPropagation();
    history.push(`/home/users/${explore.handle}`);
  };

  return (
    <div>
      {data.length > 0 && (
        <div className="explore-container">
          <div className="explore-row">
            {data.map((explore: NetworkData) => (
              <div className="explore-card" onClick = {(e: any) => toUserPage(e, explore)}>
                <img
                  className="explore-img"
                  alt={explore.handle}
                  src={explore.imageURL}
                ></img>

                <h3 className="user-handle-hover">@{explore.handle}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreMenu;
