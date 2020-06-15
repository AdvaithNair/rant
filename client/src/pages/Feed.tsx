import React, { useState, useContext, useEffect } from "react";
import { RantData, SearchUserData } from "../types";

// Context
import { ReducerContext } from "../types";
import { UserContext } from "../context/Context";

// Axios
import api from '../api';

// Components
import Rant from "./components/Rant";

// Material UI
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import SearchUser from "./components/SearchUser";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export const Feed: React.FC = () => {
  // Importing Context (Global Store)
  const { state } = useContext<ReducerContext>(UserContext);

  // Local States
  //const [rantData, setRantData] = useState<RantData>(state.rants);
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Array<SearchUserData>>([]);
  const [search, setSearch] = useState<boolean>(false);

  // Default First Rant Object
  const firstRant: RantData = {
    title: "No Rants Available",
    body: "Follow your friends to see their rants on your feed!",
    rantID: "12345",
    userName: "Rant",
    userID: "12345",
    handle: "rant",
    likeCount: 0,
    commentCount: 0,
    rantverseScore: 0,
    isPrivate: false,
    createdAt: "",
    imageURL: ""
  };

  // Handles Search
  // TODO: in the future, add autocomplete based on friends
  const handleSubmit = (event: any) => {
    // TODO: Create this endpoint
    if (query) {
      api
        .get(`/search/users/${query}`)
        .then((res: any) => {
          setResults(res.data.results);
          setSearch(true);
        })
        .catch((err: Error) => console.log(err));
    } else {
      setSearch(false);
    }
    //setQuery("");
  };

  const handleBack = (event: any) => {
    event.stopPropagation();
    setSearch(false);
    setQuery("");
  };

  // On Component Mount, Request All Rants
  useEffect(() => {
    //setRantData(state.rantData);
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
      {!search &&
        state.rants.map((rant: RantData) => (
          <Rant key={rant.rantID} data={rant} />
        ))}
      {search && (
        <div className="main-container">
          <h1>SEARCH RESULTS</h1>
        </div>
      )}
      {search && results.length === 0 ? (
        <p
          className="text-center"
          style={{ color: "red", paddingTop: "30px", fontWeight: 600 }}
        >
          No Results
        </p>
      ) : (
        results.map((result: SearchUserData) => (
          <SearchUser key={result.handle} data={result} />
        ))
      )}
      {search && (
        <div className="search-back">
          <div className="search-back-button" onClick={handleBack}>
            <ArrowBackIcon style={{ paddingTop: "10px" }} />
            <p style={{ marginLeft: "30px", marginTop: "-25px" }}>Go Back</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
