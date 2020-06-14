import React, { useState, useContext, useEffect } from "react";

// Context
import { ReducerContext } from "../../../types";
import { UserContext } from "../../../context/Context";
import { editUserDetails } from "../../../context/Actions";
import { CLEAR_LOADING } from "../../../context/ReducerTypes";

// Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// Prop Type
interface Props {
    edit: boolean;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditProfile: React.FC<Props> = ({edit, setEdit}) => {
  // Importing Context (Global Store)
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  // Local States for Edit Dialog
  // TODO: Implement Update for First Name, Last Name, and Handle
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");

  // On Component Mount Set Local States
  useEffect(() => {
    const localUserData = JSON.parse(localStorage.getItem('userData') || '{}');
    setBio(state.credentials.bio || localUserData.about.bio || '');
    setWebsite(state.credentials.website|| localUserData.about.website || '');
    dispatch({ type: CLEAR_LOADING });
  }, []);

  // Handles Edit Dialog Close
  const handleEditClose = () => {
    setEdit(false);
  };

  // Handles Submit
  const handleEditSubmit = (event: any) => {
    event.preventDefault();

    const userData = {
      bio,
      website
    };
    // Makes Login Request
    // TODO: Watch Out
    editUserDetails(dispatch, userData);

    // Closes
    handleEditClose();
  };

  return (
    <Dialog open={edit} onClose={handleEditClose}>
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
  );
};

export default EditProfile;
