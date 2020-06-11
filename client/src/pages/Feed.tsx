import React, { useState, useContext, useEffect } from "react";
import { RantData } from "../types";

// Context
import { ReducerContext } from "../types";
import { UserContext } from "../context/Context";

// Components
import { Rant } from "./components/Rant";

// Material UI
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";

export const Feed: React.FC = () => {
  // Importing Context (Global Store)
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  // Local States
  const [rantData, setRantData] = useState<RantData>(state.rants);
  const [query, setQuery] = useState<string>("");

  // Handles Search
  const handleSubmit = (event: any) => {
    // TODO: Create this endpoint
    console.log("submitted " + query);
    setQuery("");
  };

  // On Component Mount, Request All Rants
  useEffect(() => {
    setRantData(state.rantData);
  }, []);

  return (
    <div style={{ display: "block" }}>
      <div className="search-bar">
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Divider orientation="vertical" />
        <InputBase
          placeholder="Search Rantverse"
          value={query}
          onChange={(e: any) => setQuery(e.target.value)}
          onKeyPress={e => {
            if (e.key === "Enter") {
              handleSubmit(e);
            }
          }}
          fullWidth
        />
        <div style={{ paddingRight: "20px" }}></div>
      </div>

      {state.UI.loading && (
        <div className="loading-rants">
          <CircularProgress style={{ marginLeft: "50%" }} color="primary" />
        </div>
      )}
      {state.rants.map((rant: RantData) => (
        <Rant key={rant.rantID} data={rant} />
      ))}
    </div>
  );
};

export default Feed;
