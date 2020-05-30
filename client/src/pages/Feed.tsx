import React, { useState, useContext, useEffect } from "react";
import { RantData } from "../types";

// Context
import { ReducerContext } from "../types";
import { UserContext } from "../context/UserContext";
import { SET_LOADING, CLEAR_LOADING } from "../context/ReducerTypes";

// Components
import { Rant } from "./components/Rant";

// Material UI
import { CircularProgress } from "@material-ui/core";
import { getRantData, checkAuth } from "../context/actions/UserActions";

export const Feed: React.FC = () => {
  // Setting State for Rant Data
  const [rantData, setRantData] = useState([]);

  // Importing Context (Global Store)
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  // On Component Mount, Request All Rants
  useEffect(() => {
    // Gets all Rants if it's not in the local storage
    // TODO: Fix Dispatch to include loading
    // TODO: Run getRantData every time regardless, just keeping it right now for testing
    // On Component Mount, Check User Auth State
    //checkAuth(dispatch);
    dispatch({ type: SET_LOADING });
    if (!localStorage.getItem("rantData")) getRantData();
    setRantData(JSON.parse(localStorage.getItem("rantData") || "{}"));
    dispatch({ type: CLEAR_LOADING });
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
