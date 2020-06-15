import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Context
import { ReducerContext, RantData } from "../types";
import { UserContext } from "../context/Context";
import { postRant, updateRant } from "../context/Actions";

// Material UI
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Props {
  pageTitle: string;
  isCreate: boolean;
  match?: any;
}

export const CreateRant: React.FC<Props> = ({ pageTitle, isCreate, match }) => {
  // Setting State for Rant Data
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [titleError, setTitleError] = useState<string>("");
  const [bodyError, setBodyError] = useState<string>("");
  const [anonymous, setAnonymous] = useState<boolean>(false);
  const [priv, setPriv] = useState<boolean>(false);

  const emptyMessage = "Must Not Be Empty";

  // Importing Context (Global Store)
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  // History for Page Movement
  const history = useHistory();

  // On Component Mount, Update Title and Body (If Edit)
  useEffect(() => {
    if (!isCreate) {
      const rantData: RantData = state.rants.find(
        (element: RantData) => element.rantID === match.params.rantID
      ) || {
        rantID: "",
        userName: "",
        userID: "",
        handle: "",
        title: "",
        body: "",
        likeCount: 0,
        commentCount: 0,
        createdAt: '',
        imageURL: ''
      };
      setTitle(rantData.title || "");
      setBody(rantData.body || "");
    }
  }, [isCreate]);

  const handleSubmit = () => {
    // TODO: Possible Reduce This Function Down
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

    // Rant Data Object
    const newBody = body.replace(/\n/g, "\\\\n"); //"\\\\n"
    const rantData: { [k: string]: any } = {
      title,
      body: newBody,
      anonymous,
      isPrivate: priv
    };

    //console.log(rantData);

    // Posts Rant
    if (isCreate) postRant(rantData, dispatch);
    else updateRant(rantData, match.params.rantID, dispatch);
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
        value={body.replace(/\\\\n/g, "\n")}
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
            <p className="text-center">Post Privately</p>
            <div className="manipulate-anonymous-switch">
              <Switch
                checked={priv}
                onChange={() => setPriv(!priv)}
                color="primary"
              />
            </div>
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
