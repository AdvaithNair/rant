import React, { useState, useContext, useEffect } from "react";
import { RantData } from "../types";

// Context
import { ReducerContext } from "../types";
import { UserContext } from "../context/UserContext";
import { SET_LOADING, CLEAR_LOADING } from "../context/ReducerTypes";

// Components
import { Rant } from "./components/Rant";

// Axios
import axios from "axios";

// Material UI
import { CircularProgress } from "@material-ui/core";

export const Feed: React.FC = () => {
  // Setting State for Rant Data
  const [rantData, setRantData] = useState([]);

  // Importing Context (Global Store)
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  // On Component Mount, Request All Rants
  useEffect(() => {
    // Gets all Rants
    // TODO: Fix Dispatch to include loading
    if (localStorage.rantData) {
      dispatch({ type: SET_LOADING });
      const localRantData = JSON.parse(
        localStorage.getItem("rantData") || "{}"
      );
      setRantData(localRantData);
      dispatch({ type: CLEAR_LOADING });
    } else {
      dispatch({ type: SET_LOADING });
      //console.log(state.UI.loading);
      axios
        .get("/get/all_rants")
        .then(res => {
          setRantData(res.data);
          localStorage.setItem("rantData", JSON.stringify(res.data));
        })
        .catch((err: Error) => console.log(err));
      dispatch({ type: CLEAR_LOADING });
    }
  }, [dispatch]);

  return (
    <div style={{ display: "block" }}>
      <div className="search-bar"></div>
      {state.UI.loading && (
        <div style={{ marginTop: "300px" }}>
          <CircularProgress color="primary" />
        </div>
      )}
      {rantData.map((rant: RantData) => (
        <Rant key={rant.rantID} data={rant} />
      ))}
    </div>
  );
};

export default Feed;
