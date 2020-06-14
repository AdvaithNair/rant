import React, { useState, useContext, useEffect } from "react";
import { RantData } from "../types";

// Context
import { ReducerContext } from "../types";
import { UserContext } from "../context/Context";

// Axios
import axios from "axios";

// Components
import TrendingRant from './components/TrendingRant'

export const Rantverse: React.FC = () => {
  // Importing Context (Global Store)
  const { state } = useContext<ReducerContext>(UserContext);

  // Local States
  const [rantData, setRantData] = useState<Array<RantData>>(state.rants);

  useEffect(() => {
    axios
      .get("/get/rantverse/trending")
      .then((res: any) => {
        console.log(res.data);
        setRantData(res.data);
      })
      .catch((err: Error) => console.log(err));
  }, []);

  return (
    <div className="main-container">
      <h1>RANTVERSE</h1>
      {rantData.map((rant: RantData, index: number) => (
          <TrendingRant key={rant.rantID} index = {index + 1} data={rant} />
        ))}
    </div>
  );
};

export default Rantverse;
