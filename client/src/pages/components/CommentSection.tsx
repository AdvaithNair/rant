import React, { useState, useContext, useEffect } from "react";
import { RantData } from "../../types";

// Context
import { ReducerContext } from "../../types";
import { UserContext } from "../../context/UserContext";
import {
  toggleLikeRequest,
  deleteRant,
  getRantInfo
} from "../../context/actions/UserActions";

// Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

// Props
interface Props {
  data?: RantData;
  rantID: string;
}

// TODO: Break this up into components
export const CommentSection: React.FC<Props> = ({ rantID }) => {
  // Importing Context (Global Store)
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  // On Component Mount, Renders Like
  useEffect(() => {
    /*const storageItem = JSON.parse(localStorage.userData || "{}")
    setLiked(
      JSON.parse(localStorage.userData || "{}").likes.find((e: any) => e.rantID === data.rantID) ? true : false
    );*/
    //getRantInfo(dispatch, rantID);
  }, []);

  // TODO: Add comment component and 
  return (
    <div className="comment-section">
      <TextField placeholder="Comment..." fullWidth />
      <Divider orientation="vertical" />
      <Button
        variant="contained"
        color="secondary"
        style={{ width: "50px", marginLeft: "20px" }}
      >
        Add
      </Button>
    </div>
  );
};

export default CommentSection;
