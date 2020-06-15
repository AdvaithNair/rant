import React, { useContext } from "react";

// Context
import { ReducerContext, RantData, CommentData } from "../../../types";
import { UserContext } from "../../../context/Context";
import { DELETE_COMMENT } from "../../../context/ReducerTypes";

// Axios
import api from '../../../api';

// Material UI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

interface Props {
  dialog: boolean;
  setDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setComments: React.Dispatch<React.SetStateAction<CommentData[]>>;
  setRantData: React.Dispatch<React.SetStateAction<RantData>>;
  rantData: RantData;
  commentData: CommentData;
}

// TODO: Break this up into components
export const DeleteCommentDialog: React.FC<Props> = ({
  dialog,
  setDialog,
  setComments,
  setRantData,
  rantData,
  commentData
}) => {
  // Importing Context (Global Store)
  const { dispatch } = useContext<ReducerContext>(UserContext);

  // Closes Delete Dialog
  const handleClose = (event: any) => {
    event.stopPropagation();
    setDialog(false);
  };

  // Deletes Object
  const handleSubmit = (event: any) => {
    event.stopPropagation();
    api
      .delete(`/delete/comment/${commentData.commentID}`)
      .then(() => {
        // Filter Comments
        setComments(
          comments =>
            comments.filter(
              element => element.commentID !== commentData.commentID
            ) || []
        );
        dispatch({ type: DELETE_COMMENT, payload: commentData.rantID });
        rantData.commentCount--;
        setRantData({
          ...rantData
        });
      })
      .catch((err: Error) => console.log(err));
    handleClose(event);
  };

  return (
    <div>
      <Dialog open={dialog} onClose={handleClose}>
        <DialogTitle>Delete Comment</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this comment?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} style={{ color: "red" }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteCommentDialog;
