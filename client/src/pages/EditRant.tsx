import React, { useState, useContext, useEffect } from "react";
import { ManipulateRantData } from "../types";

// Context
import { ReducerContext } from "../types";
import { UserContext } from "../context/UserContext";
import { SET_LOADING, CLEAR_LOADING } from "../context/ReducerTypes";

// Components
import { Rant } from "./components/Rant";

// Material UI
import { CircularProgress } from "@material-ui/core";
import { getRantData, checkAuth } from "../context/actions/UserActions";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";

interface Props {
  data: ManipulateRantData;
}

export const EditRant: React.FC<Props> = ({ data }) => {
  // Setting State for Rant Data
  const [title, setTitle] = useState(data.title);
  const [body, setBody] = useState(data.body);
  const [anonymous, setAnonymous] = useState(false);

  // Importing Context (Global Store)
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  // On Component Mount, Request All Rants
  useEffect(() => {}, []);

  return (
    <div className="main-home-content">
      <h1>CREATE RANT</h1>
      <TextField
        label="Title"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        style={{ marginTop: "20px" }}
        label="Body"
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="Body"
        multiline
        fullWidth
      />
      <Button style={{ float: "right" }} variant="contained" color="primary">
        Submit
      </Button>
      <div style={{ paddingBottom: "30px" }}></div>
    </div>
  );
};

export default EditRant;
