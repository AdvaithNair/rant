import React, { useState, useContext, useEffect } from "react";
import { RantData, CommentData } from "../../types";

// Context
import { ReducerContext } from "../../types";
import { UserContext } from "../../context/Context";

// Components
import Comment from "./Comment";

// Axios
import api from '../../api';

// Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import LinearProgress from "@material-ui/core/LinearProgress";
import { ADD_COMMENT } from "../../context/ReducerTypes";

// Props
interface Props {
  rantID: string;
  data: Array<CommentData>;
  rantData: RantData;
  setRantData: React.Dispatch<React.SetStateAction<RantData>>;
}

// TODO: Break this up into components
export const CommentSection: React.FC<Props> = ({
  rantID,
  data,
  rantData,
  setRantData
}) => {
  // Importing Context (Global Store)
  const { dispatch } = useContext<ReducerContext>(UserContext);

  // Local States
  const [comments, setComments] = useState<Array<CommentData>>(data);
  const [loading, setLoading] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");

  // Add Comment
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setLoading(true);

    const anonymous: boolean = rantData.handle === "anonymous";
    const newComment = commentText.replace(/\n/g, "\\\\n"); //"\\\\n"

    // Posts Comment
    api
      .post(`/rant/comment/${rantID}`, { body: newComment, anonymous })
      .then((res: any) => {
        setComments(comments => comments.concat(res.data.returnComment));
        // Increment Comment Count
        dispatch({ type: ADD_COMMENT, payload: rantID });
        rantData.commentCount++;
        setRantData({
          ...rantData
        });
        setCommentText("");
        setLoading(false);
      })
      .catch((err: any) => console.log(err));
  };

  // On Component Mount, Renders Like
  useEffect(() => {}, []);

  // TODO: Add comment component and
  return (
    <div className="comment-section">
      <div className="add-comments">
        <TextField
          placeholder="Comment..."
          value={commentText}
          onChange={(e: any) => setCommentText(e.target.value)}
          multiline
          fullWidth
        />
        <Divider orientation="vertical" />
        <div className="comment-button">
          <Button
            variant="contained"
            color="secondary"
            disabled={!commentText}
            style={{ width: "50px", marginLeft: "20px", height: '40px', position: 'absolute', bottom: 0 }}
            onClick={handleSubmit}
          >
            Add
          </Button>
        </div>
      </div>
      <div className="display-comments">
        {loading && (
          <div style={{ marginTop: "-20px", marginBottom: "20px" }}>
            <LinearProgress color="secondary" />
          </div>
        )}
        {comments[0] &&
          comments.map((comment: CommentData) => (
            <Comment
              key={comment.createdAt}
              data={comment}
              comments={comments}
              setComments={setComments}
              rantData={rantData}
              setRantData={setRantData}
            />
          ))}
        {!comments[0] && <h4 className="text-center">No Comments</h4>}
      </div>
    </div>
  );
};

export default CommentSection;
