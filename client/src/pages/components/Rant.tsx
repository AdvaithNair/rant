import React, { useState, useContext, useEffect, useRef } from "react";
import { RantData } from "../../types";

// Context
import { ReducerContext } from "../../types";
import { UserContext } from "../../context/UserContext";
import { toggleLikeRequest, deleteRant } from "../../context/actions/UserActions";

// Material UI
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// DayJS
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Props
interface Props {
  data: RantData;
}

// TODO: Break this up into components
export const Rant: React.FC<Props> = ({ data }) => {
  // Importing Context (Global Store)
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  // Local States
  // TODO: Be careful about userdata local session
  const [liked, setLiked] = useState<boolean>(
    JSON.parse(localStorage.userData || "{}").likes.find(
      (e: any) => e.rantID === data.rantID
    )
      ? true
      : false
  );
  const [menu, setMenu] = useState<boolean>(false);
  const [anchor, setAnchor] = useState(null);
  const [dialog, setDialog] = useState<boolean>(false);

  // Liked Componenets
  const isLiked: JSX.Element = (
    <FavoriteIcon style={{ color: "#F012BE", fontSize: "30" }} />
  );
  const notLiked: JSX.Element = (
    <FavoriteBorderIcon style={{ color: "#F012BE", fontSize: "30" }} />
  );

  // On Component Mount, Renders Like
  useEffect(() => {
    /*const storageItem = JSON.parse(localStorage.userData || "{}")
    setLiked(
      JSON.parse(localStorage.userData || "{}").likes.find((e: any) => e.rantID === data.rantID) ? true : false
    );*/
  }, []);

  // Toggles Like
  const toggleLike = () => {
    toggleLikeRequest(dispatch, data.rantID, liked);
    setLiked(!liked);
    liked ? data.likeCount-- : data.likeCount++;
  };

  // Formats Date
  const formatDate = (date: string): string => {
    return dayjs(date).format("MMMM D, YYYY");
  };

  // Formats Time
  const formatTime = (date: string): string => {
    return dayjs(date).format("h:mm A");
  };

  // Formats Relative Time
  const formatRelative = (date: string): string => {
    dayjs.extend(relativeTime);
    return dayjs(date).fromNow();
  };

  // On Click of Menu
  const handleClick = (event: any) => {
    setMenu(true);
    setAnchor(event.currentTarget);
  };

  // On Close of Menu (or Click Away)
  const handleClose = () => {
    setMenu(false);
    setAnchor(null);
  };

  // Opens Delete Dialog
  const handleDelete = () => {
    setDialog(true);
    setMenu(false);
  };

  // Closes Delete Dialog
  const handleDeleteClose = () => {
    setDialog(false);
  };

  // Deletes Object
  const handleDeleteSubmit = () => {
    deleteRant(data.rantID, dispatch);
    handleDeleteClose();
  };

  return (
    <div className="rant-body">
      <div className="rant-title">
        <div className="rant-title-text">
          <h1>{data.title}</h1>
        </div>
        <div className="more-icon">
          {state.credentials.handle === data.handle && (
            <IconButton onClick={handleClick}>
              <MoreVertIcon style={{ color: "white" }} />
            </IconButton>
          )}
          <Popover
            open={menu}
            anchorEl={anchor}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
          >
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList autoFocusItem={menu}>
                <MenuItem onClick={handleClose}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Popover>
          <Dialog open={dialog} onClose={handleDeleteClose}>
            <DialogTitle>Delete Rant</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this rant?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDeleteSubmit} style = {{color: 'red'}}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <div className="rant-credits">
        <div className="rant-credits-img">
          <img alt={data.handle} src={data.imageURL}></img>
        </div>
        <div className="rant-credits-info">
          <h2>{data.userName}</h2>
          <h3>@{data.handle}</h3>
          <p>
            <u>{formatRelative(data.createdAt)}</u>
          </p>
        </div>
        <div className="rant-credits-date">
          <h3>Created</h3>
          <p>{formatDate(data.createdAt)}</p>
          <p>{formatTime(data.createdAt)}</p>
          <p></p>
        </div>
      </div>
      <div className="rant-content">
        <p>{data.body}</p>
        <div className="rant-info">
          <span style={{ marginRight: "0px" }} onClick={toggleLike}>
            {liked ? isLiked : notLiked}
          </span>
          <span>{data.likeCount}</span>
          <ChatIcon style={{ color: "#39CCCC", fontSize: "30" }} />
          <span>{data.commentCount}</span>
        </div>
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
      </div>
    </div>
  );
};

export default Rant;
