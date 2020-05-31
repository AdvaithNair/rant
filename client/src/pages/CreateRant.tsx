import React, { useState, useContext, useEffect } from "react";

// Context
import { ReducerContext } from "../types";
import { UserContext } from "../context/UserContext";
import { postRant } from "../context/actions/UserActions";

// Material UI
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";

export const CreateRant: React.FC = () => {
  // Setting State for Rant Data
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  // Importing Context (Global Store)
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  // On Component Mount, Request All Rants
  useEffect(() => {}, []);

  const handleSubmit = () => {
    const rantData: { [k: string]: any } = {
      title,
      body,
      anonymous
    };
    postRant(rantData, dispatch, state);
    setTitle('');
    setBody('');
    setAnonymous(false);
    window.location.href = "/home";
  };

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
      <div className="manipulate-submit-section">
        <div className="manipulate-anonymous">
          <p>Post Anonymously</p>
          <div className="manipulate-anonymous-switch">
            <Switch
              checked={anonymous}
              onChange={() => setAnonymous(!anonymous)}
              color="primary"
              name="checkedB"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
          {anonymous && (
            <p style={{ color: "red" }}>
              Warning: You Cannot Edit Anonymous Posts
            </p>
          )}
        </div>
      </div>
      <Button
        style={{ float: "right" }}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <div style={{ paddingBottom: "30px" }}></div>
    </div>
  );
};

export default CreateRant;
