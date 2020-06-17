import React from "react";
import { NetworkData } from "../../types";

// Material UI
import Divider from "@material-ui/core/Divider";

// Props
interface Props {
  data: NetworkData;
}

// TODO: Break this up into components
export const Network: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <Divider />
      <div className="notification-main">
        <img className="header-img" src={data.imageURL} alt={data.handle}></img>
        <div className="notification-data" style={{ whiteSpace: "pre" }}>
          <span className="notification-handle" style={{ marginTop: "20px" }}>
            @{data.handle}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Network;
