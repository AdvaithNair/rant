import React, { useContext, useEffect } from "react";
import { RantData } from "../types";

// Context
import { ReducerContext } from "../types";
import { UserContext } from "../context/UserContext";
import { SET_LOADING, CLEAR_LOADING } from "../context/ReducerTypes";

// Components
import { Rant } from "./components/Rant";

// Material UI
import { CircularProgress } from "@material-ui/core";
import { getRantData } from "../context/actions/UserActions";

export const Feed: React.FC = () => {
  // Importing Context (Global Store)
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  // On Component Mount, Request All Rants
  useEffect(() => {
    // Gets all Rants if it's not in the local storage
    // TODO: Fix Dispatch to include loading
  }, []);

  return (
    <div style={{ display: "block" }}>
      <div className="search-bar"></div>
      {state.UI.loading && (
        <div className = 'loading-rants'>
          <CircularProgress style = {{marginLeft: '50%'}} color="primary" />
        </div>
      )}
      {state.rants.map((rant: RantData) => (
        <Rant key={rant.rantID} data={rant} />
      ))}
    </div>
  );
};

export default Feed;
