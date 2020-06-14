import React, { useState, useEffect } from "react";
import { RantData } from "../types";

// Axios
import axios from "axios";

// Components
import TrendingRant from "./components/TrendingRant";

// Material UI
import CircularProgress from "@material-ui/core/CircularProgress";

export const Rantverse: React.FC = () => {
  // Local States
  const [rantData, setRantData] = useState<Array<RantData>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("/get/rantverse/trending")
      .then((res: any) => {
        console.log(res.data);
        setRantData(res.data);
        setLoading(false);
      })
      .catch((err: Error) => console.log(err));
  }, []);

  return (
    <div className="main-container">
      <h1>RANTVERSE</h1>
      {loading && (
          <div className="loading-rants">
          <CircularProgress style={{ marginLeft: "50%" }} color="primary" />
        </div>
      )}
      {!loading &&
        rantData.map((rant: RantData, index: number) => (
          <TrendingRant key={rant.rantID} index={index + 1} data={rant} />
        ))}
    </div>
  );
};

export default Rantverse;
