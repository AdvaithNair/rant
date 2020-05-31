import React, { useState, useContext, useEffect } from "react";

// Context
import { ReducerContext } from "../types";
import { UserContext } from "../context/UserContext";
import { updateUserData, uploadImage } from "../context/actions/UserActions";

// DayJS
import dayjs from "dayjs";

// Axios
import axios from "axios";

// Material UI
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

type ImageUploadData = { [k: string]: any | string | Blob };

export const Profile: React.FC = () => {
  // Importing Context (Global Store)
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  // Local States for Edit Dialog
  // TODO: Implement Update for First Name, Last Name, and Handle
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [imageName, setImageName] = useState("");
  const [imageUpload, setImageUpload] = useState<Blob>(new Blob());
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [imageError, setImageError] = useState("");

  // On Component Mount Set Local States
  useEffect(() => {
    // WARNING: Be careful about this part, local storage is not reliable
    setBio(state.credentials.bio);
    setWebsite(state.credentials.website);
  }, [setBio, setWebsite]);

  // Formats Wesbite Entry
  const formatWebsite = (input: string) => {
    const trimmed = input.trim();
    if (trimmed.substring(0, 4) === "http") return trimmed.substring(7);
    if (trimmed.substring(0, 5) === "https") return trimmed.substring(8);
  };

  // Formats Created At Entry
  const formatJoined = (input: string) => {
    return dayjs(input).format("MMMM D, YYYY");
  };

  // Formats Total Days on Rant
  const formatDays = (input: string) => {
    return dayjs().diff(input, "day");
  };

  // Handles Edit Dialog Close
  const handleEditClose = () => {
    setEdit(false);
  };

  //Handles Image Dialog Close
  const handleImageClose = () => {
    setImage(false);
  };

  // Handles Image Change in Dialog
  const handleImageChange = (event: any) => {
    const imageData = event.target.files[0];
    if (imageData !== undefined) {
      setImageUpload(imageData);
      setImageName(imageData.name);
    } else setImageName("");

    if (imageData.type.trim().substring(0, 5) !== "image") {
      setImageName("");
      setImageError("Upload Image File");
    } else setImageError("");
  };

  // Handles Image Submit
  const handleImageSubmit = (event: any) => {
    const formData = new FormData();
    formData.append("image", imageUpload, imageName);
    uploadImage(dispatch, formData);
    handleImageClose();
  };

  // Handles Submit
  const handleEditSubmit = (event: any) => {
    event.preventDefault();

    const userData = {
      bio,
      website
    };
    // Makes Login Request
    axios
      .post("/user/update", userData)
      .then((res: any) => {
        updateUserData(dispatch);
      })
      .catch((err: any) => {
        // Error Handling
        console.log(err);
      });

    // Closes
    handleEditClose();
  };

  return (
    <div className = 'main-home-content'>
      <h1>PROFILE</h1>
      <div className="profile-card">
        <div className="profile-card-content">
          <Tooltip title="Update Profile Picture" placement="bottom">
            <div
              className="profile-card-image-container"
              onClick={() => setImage(true)}
            >
              <img
                className="profile-card-image"
                src={state.credentials.imageURL}
                alt={state.credentials.userName}
              ></img>
              <div className="profile-card-image-overlay">
                <IconButton
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                  }}
                >
                  <PhotoCameraIcon fontSize="large" />
                </IconButton>
              </div>
            </div>
          </Tooltip>

          <h1 style={{ paddingTop: "10px" }}>{state.credentials.userName}</h1>
          <h2 className="profile-handle">@{state.credentials.handle}</h2>

          {state.credentials.bio && <h3>Bio</h3>}
          {state.credentials.bio && <p>{state.credentials.bio}</p>}
          {state.credentials.website && <h3>Website</h3>}
          {state.credentials.website && (
            <p>
              <a href={state.credentials.website} style={{ color: "#39CCCC" }}>
                {formatWebsite(state.credentials.website)}
              </a>
            </p>
          )}
          <h3>Joined</h3>
          <p style={{ marginBottom: "-10px" }}>
            {formatJoined(state.credentials.createdAt)}
          </p>
          <p style={{ marginBottom: "40px" }}>
            Ranting for {formatDays(state.credentials.createdAt)} Days
          </p>
          <div className="edit-profile-button">
            <Button
              style={{
                fontSize: "15px",
                color: "white",
                fontFamily: "Montserrat",
                fontWeight: 550
              }}
              onClick={() => setEdit(true)}
              fullWidth
            >
              Edit Profile
            </Button>
          </div>
          <Dialog
            open={edit}
            onClose={handleEditClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent>
              <form>
                <TextField
                  autoFocus
                  name="bio"
                  type="text"
                  label="Bio"
                  multiline
                  placeholder="A Short Bio About Yourself"
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  margin="dense"
                  fullWidth
                />
                <TextField
                  autoFocus
                  name="website"
                  type="text"
                  label="Website"
                  placeholder="Your Website"
                  value={website}
                  onChange={e => setWebsite(e.target.value)}
                  margin="dense"
                  fullWidth
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleEditSubmit} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={image}
            onClose={handleImageClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle>Upload Profile Picture</DialogTitle>
            <DialogContent>
              <form>
                <input
                  className="upload-profile-picture"
                  type="file"
                  id="imageInput"
                  onChange={handleImageChange}
                />
                <p>{imageName}</p>
                {imageError && <p style={{ color: "red" }}>{imageError}</p>}
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleImageClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleImageSubmit} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div style={{ clear: "both" }}></div>
      </div>
    </div>
  );
};

export default Profile;
