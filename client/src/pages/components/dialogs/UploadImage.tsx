import React, { useState, useContext, useEffect } from "react";

// Context
import { ReducerContext } from "../../../types";
import { UserContext } from "../../../context/UserContext";
import { uploadImage } from "../../../context/actions/UserActions";

// Material UI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// type ImageUploadData = { [k: string]: any | string | Blob };
// Prop Type
interface Props {
    image: boolean;
    setImage: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Profile: React.FC<Props> = ({image, setImage}) => {
  // Importing Context (Global Store)
  const { dispatch } = useContext<ReducerContext>(UserContext);

  // Local States for Edit Dialog
  // TODO: Implement Update for First Name, Last Name, and Handle
  const [imageName, setImageName] = useState<string>("");
  const [imageUpload, setImageUpload] = useState<Blob>(new Blob());
  const [imageError, setImageError] = useState<string>("");

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

  return (
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
  );
};

export default Profile;
