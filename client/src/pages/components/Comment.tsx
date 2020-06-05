import React, { useState, useContext, useEffect } from "react";
import { CommentData, RantData } from "../../types";

// Context
import { ReducerContext } from "../../types";
import { UserContext } from "../../context/Context";
import {
  toggleLikeRequest,
  deleteRant,
  getRantInfo
} from "../../context/Actions";
import { DELETE_COMMENT } from "../../context/ReducerTypes";

// Time Formatting
import { formatRelative } from "../../time";

// Material UI
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";

// Props
interface Props {
  data: CommentData;
  ranterHandle: string;
  comments: CommentData[];
  setComments: React.Dispatch<React.SetStateAction<CommentData[]>>;
  rantData: RantData;
  setRantData: React.Dispatch<React.SetStateAction<RantData>>;
}

// TODO: Break this up into components
export const Comment: React.FC<Props> = ({
  data,
  ranterHandle,
  setComments,
  rantData,
  setRantData
}) => {
  // Importing Context (Global Store)
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  // On Component Mount, Renders Like
  useEffect(() => {}, []);

  // Deletes Rant
  const handleDelete = () => {
    console.log(data);
    axios
      .delete(`/delete/comment/${data.commentID}`)
      .then(() => {
        // Filter Comments
        console.log("HERE");
        setComments(
          comments =>
            comments.filter(element => element.commentID !== data.commentID) ||
            []
        );
        dispatch({ type: DELETE_COMMENT, payload: data.rantID });
        rantData.commentCount--;
        setRantData({
          ...rantData
        });
      })
      .catch((err: Error) => console.log(err));
  };

  // TODO: Add comment component and
  return (
    <div>
      <Divider />
      <div className="comment">
        <img
          className="header-img"
          src={data.imageURL}
          alt={state.credentials.userName}
        ></img>
        <div className="comment-content">
          <div className="comment-credits">
            <div className="comment-credit-text">
              <h3>{data.userName}</h3>
              <h4>@{data.handle}</h4>
            </div>
            <div className="commented-at">{formatRelative(data.createdAt)}</div>
            <div className="clear"></div>
          </div>
          <div className="comment-body">
            <div className="delete-comment">
              {(state.credentials.handle === data.handle ||
                state.credentials.handle === ranterHandle) && (
                <Tooltip title="Delete Comment" placement="bottom">
                  <IconButton onClick={handleDelete}>
                    <DeleteIcon color="action" style={{ color: "red" }} />
                  </IconButton>
                </Tooltip>
              )}
            </div>
            <div className="comment-body-content">
              <p>{data.body}</p>
            </div>
            <div className="clear"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
