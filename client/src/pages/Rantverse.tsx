import React, { useState, useEffect, useContext } from "react";
import { RantData, NetworkData } from "../types";

// Context
import { ReducerContext } from "../types";
import { UserContext } from "../context/Context";

// Axios
import api from "../api";

// Components
import TrendingRant from "./components/TrendingRant";
import ExploreMenu from './components/dialogs/ExploreMenu';

// Material UI
import CircularProgress from "@material-ui/core/CircularProgress";

export const Rantverse: React.FC = () => {
  // Importing Context (Global Store)
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  // Local States
  const [rantData, setRantData] = useState<Array<RantData>>([]);
  const [exploreData, setExploreData] = useState<Array<NetworkData>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api
      .get("/get/rantverse/trending")
      .then((res: any) => {
        setRantData(res.data);
        setLoading(false);
      })
      .catch((err: Error) => console.log(err));

    if (state.authenticated) {
      api
        .post("/get/rantverse/explore", {following: state.credentials.following})
        .then((res: any) => {
          setExploreData(res.data);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [state.authenticated]);

  return (
    <div className="main-container">
      <h1 className="main-header">RANTVERSE</h1>
      <h1>TRENDING</h1>
      {loading && (
        <div className="loading-rants">
          <CircularProgress style={{ marginLeft: "50%" }} color="primary" />
        </div>
      )}
      {!loading &&
        rantData.map((rant: RantData, index: number) => (
          <TrendingRant key={rant.rantID} index={index + 1} data={rant} />
        ))}
      <h1>EXPLORE</h1>
      {loading && (
        <div className="loading-rants">
          <CircularProgress style={{ marginLeft: "50%" }} color="primary" />
        </div>
      )}
      {!loading && exploreData &&
        <ExploreMenu data={exploreData}/>
        }
       {!loading && !exploreData && <p className = 'text-center' style = {{fontWeight: 600}}>No Additional Extended Network</p>} 
    </div>
  );
};

export default Rantverse;
