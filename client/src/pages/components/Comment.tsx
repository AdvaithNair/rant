import React, { useState, useContext, useEffect } from "react";
import { CommentData, RantData } from "../../types";
import { useHistory } from "react-router-dom";

// Context
import { ReducerContext } from "../../types";
import { UserContext } from "../../context/Context";

// Time Formatting
import { formatRelative } from "../../time";

// Material UI
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteCommentDialog from "./dialogs/DeleteCommentDialog";

// Props
interface Props {
  data: CommentData;
  comments: CommentData[];
  setComments: React.Dispatch<React.SetStateAction<CommentData[]>>;
  rantData: RantData;
  setRantData: React.Dispatch<React.SetStateAction<RantData>>;
}

// TODO: Break this up into components
export const Comment: React.FC<Props> = ({
  data,
  setComments,
  rantData,
  setRantData
}) => {
  // Importing Context (Global Store)
  const { state } = useContext<ReducerContext>(UserContext);

  // Local States
  const [dialog, setDialog] = useState<boolean>(false);

  // History to Push Pages
  const history = useHistory();

  // On Component Mount, Renders Like
  useEffect(() => {}, []);

  // Opens Delete Dialog
  const handleOpen = (event: any) => {
    event.stopPropagation();
    setDialog(true);
    console.log(dialog);
  };

  // Takes Client To User Page
  const toUserPage = (event: any) => {
    event.stopPropagation();
    if (data.handle === state.credentials.handle) history.push("/home/profile");
    else history.push(`/home/users/${data.handle}`);
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
          onClick={toUserPage}
        ></img>
        <div className="comment-content">
          <div className="comment-credits">
            <div className="comment-credit-text" onClick={toUserPage}>
              <h3>{data.userName}</h3>
              <h4>@{data.handle}</h4>
            </div>
            <div className="commented-at">
              <u>{formatRelative(data.createdAt)}</u>
            </div>
            <div className="clear"></div>
          </div>
          <div className="comment-body">
            <div className="delete-comment">
              {(state.credentials.handle === data.handle ||
                state.credentials.handle === rantData.handle ||
                state.credentials.userID === data.userID ||
                state.credentials.userID === rantData.userID) && (
                <Tooltip title="Delete Comment" placement="bottom">
                  <IconButton onClick={handleOpen}>
                    <DeleteIcon color="action" style={{ color: "red" }} />
                  </IconButton>
                </Tooltip>
              )}
              <DeleteCommentDialog
                dialog={dialog}
                setDialog={setDialog}
                setComments={setComments}
                setRantData={setRantData}
                rantData={rantData}
                commentData={data}
              />
            </div>
            <div className="comment-body-content">
              <p>
                {data.body.split("\\\\n").map((item: string, i: any) => (
                  <p key={i}>{item}</p>
                ))}
              </p>
            </div>
            <div className="clear"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
