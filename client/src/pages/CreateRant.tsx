import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Context
import { ReducerContext } from "../types";
import { UserContext } from "../context/UserContext";
import { postRant } from "../context/actions/UserActions";

// Material UI
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import { CircularProgress } from "@material-ui/core";

interface Props {
  pageTitle: string;
  isCreate: boolean;
}

export const CreateRant: React.FC<Props> = ({ pageTitle, isCreate }) => {
  // Setting State for Rant Data
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [titleError, setTitleError] = useState<string>("");
  const [bodyError, setBodyError] = useState<string>("");
  const [anonymous, setAnonymous] = useState<boolean>(false);

  // Errors Object
  const errors: { [k: string]: string } = {
    title: "",
    body: ""
  };

  const emptyMessage = "Must Not Be Empty";

  // Importing Context (Global Store)
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  // History for Page Movement
  const history = useHistory();

  // On Component Mount, Request All Rants
  useEffect(() => {
    //console.log(errors)
  }, []);

  const handleSubmit = () => {
    const rantData: { [k: string]: any } = {
      title,
      body,
      anonymous
    };
    // Possible Reduce This Function Down
    if (!title || !body) {
      if (title === "") setTitleError(emptyMessage);
      else setTitleError("");
      if (body === "") setBodyError(emptyMessage);
      else setBodyError("");
      return;
    } else {
      setTitleError("");
      setBodyError("");
    }
    postRant(rantData, dispatch, state);
    setTitle("");
    setBody("");
    setAnonymous(false);
    history.push("/home");
  };

  return (
    <div className="main-home-content">
      <h1>{pageTitle}</h1>
      <TextField
        label="Title"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        helperText={titleError}
        error={titleError ? true : false}
        fullWidth
      />
      <TextField
        style={{ marginTop: "20px" }}
        label="Body"
        placeholder="Body"
        value={body}
        onChange={e => setBody(e.target.value)}
        helperText={bodyError}
        error={bodyError ? true : false}
        multiline
        fullWidth
      />
      {isCreate && (
        <div className="manipulate-submit-section">
          <div className="manipulate-anonymous">
            <p className="text-center">Post Anonymously</p>
            <div className="manipulate-anonymous-switch">
              <Switch
                checked={anonymous}
                onChange={() => setAnonymous(!anonymous)}
                color="primary"
              />
            </div>
            {anonymous && (
              <span className="text-center" style={{ color: "red" }}>
                Warning: You Cannot Edit Anonymous Posts
              </span>
            )}
          </div>
        </div>
      )}
      <div className="edit-profile-button" style={{ marginTop: "30px" }}>
        <Button
          variant="contained"
          color="primary"
          style={{
            fontSize: "15px",
            color: "white",
            fontFamily: "Montserrat",
            fontWeight: 550
          }}
          onClick={handleSubmit}
          fullWidth
        >
          Submit
        </Button>
      </div>
      <div className="manipulate-submit-section">
        {state.UI.loading && (
          <CircularProgress
            style={{ justifyContent: "center" }}
            color="primary"
          />
        )}
      </div>
    </div>
  );
};

export default CreateRant;
