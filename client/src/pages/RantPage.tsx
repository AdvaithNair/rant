import React, { useState, useContext, useEffect } from "react";
import { RantData, CommentData } from "../types";
import { useHistory } from "react-router-dom";

// Context
import { ReducerContext } from "../types";
import { UserContext } from "../context/Context";

// Components
import CommentSection from "./components/CommentSection";
import RantContent from "./components/RantContent";

// Material UI
import CircularProgress from "@material-ui/core/CircularProgress";

// Axios
import axios from "axios";

// Props
interface Props {
  match: any;
}

// Initializes State for Rant Data
const initDataState = (state: any, rantID: string) => {
  return state.rants[0]
    ? state.rants.find((element: any) => element.rantID === rantID)
    : {
        userName: "",
        handle: "",
        createdAt: "",
        title: "",
        body: "",
        likeCount: 0,
        commentCount: 0,
        imageURL: "",
        rantID
      };
};

// TODO: Break this up into components
export const Rant: React.FC<Props> = ({ match }) => {
  // Importing Context (Global Store)
  const { state } = useContext<ReducerContext>(UserContext);

  // Extract RantID from props
  const rantID: string = match.params.rantID;

  // States
  const [loading, setLoading] = useState<boolean>(state.rants[0]);
  const [rantData, setRantData] = useState<RantData>({
    userName: "",
    handle: "",
    createdAt: "",
    title: "",
    body: "",
    likeCount: 0,
    commentCount: 0,
    imageURL: "",
    userID: '',
    rantID
  });
  const [commentData, setCommentData] = useState<Array<CommentData>>([]);

  // History for Page Traversal
  const history = useHistory();

  // On Component Mount, Renders Like
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/rant/${rantID}`)
      .then((res: any) => {
        setRantData({
          userName: res.data.userName,
          handle: res.data.handle,
          createdAt: res.data.createdAt,
          title: res.data.title,
          body: res.data.body,
          likeCount: res.data.likeCount,
          commentCount: res.data.commentCount,
          userID: res.data.userID,
          imageURL: res.data.imageURL,
          rantID
        });
        setCommentData(commentData => commentData.concat(res.data.comments));
        setLoading(false);
      })
      .catch((err: any) => {
        // Error Handling
        console.log(err);
      });
  }, []);

  return (
    <div>
      {loading && (
        <div className="loading-rants">
          <CircularProgress style={{ marginLeft: "50%" }} color="primary" />
        </div>
      )}
      {!loading && (
        <div className="rant-body">
          <RantContent data={rantData} />
          <CommentSection rantID={rantID} data = {commentData} rantData = {rantData} setRantData = {setRantData}/>
        </div>
      )}
    </div>
  );
};

export default Rant;
