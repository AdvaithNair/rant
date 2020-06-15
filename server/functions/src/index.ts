import * as express from "express";
import * as functions from "firebase-functions";

// Authentication Middleware
const { firebaseAuth } = require("./util/firebaseAuth");

const {
  getAllRants,
  getFeed,
  getTrending,
  getRant,
  searchUsers
} = require("./handlers/get");
const { createRant, createComment, toggleLike } = require("./handlers/create");
const { updateRant } = require("./handlers/update");
const {
  signUp,
  logIn,
  updateEmail,
  updatePassword,
  uploadImage,
  updateUser,
  getUser,
  getUserDetails,
  followUser,
  unfollowUser,
  addFriend,
  removeFriend
  //onImageChange
} = require("./handlers/users");
const {
  deleteRant,
  deleteComment,
  onRantDelete
} = require("./handlers/delete");
const {
  likeNotification,
  unlikeNotification,
  commentNotification,
  deleteCommentNotification,
  readNotifications
} = require("./handlers/notifications");

// Initialize Express
const app: express.Application = express();

// Get
app.get("/get/all_rants", getAllRants); // Gets Rant Data for All Rants
app.get('/get/feed', firebaseAuth, getFeed) // Gets Feed for User
app.get("/get/rantverse/trending", getTrending); // Gets Top 10 Trending Rants
// TODO: Rant

// Create
app.post("/create/rant", firebaseAuth, createRant); // Creates Rant

//Update
app.put("/update/rant/:rantID", firebaseAuth, updateRant);

// Rant Operations
app.get("/rant/:rantID", getRant); // Gets Rant Data for Specific Rant
app.post("/rant/comment/:rantID", firebaseAuth, createComment); // Posts Comment
app.get("/rant/like/:rantID", firebaseAuth, toggleLike); // Toggles Like (Likes/Unlikes)

// Delete
app.delete("/delete/rant/:rantID", firebaseAuth, deleteRant); // Deletes Rant (and associated Comments, Likes, and Notifications)
app.delete("/delete/comment/:commentID", firebaseAuth, deleteComment); // Deletes Comment

// User
app.get("/user", firebaseAuth, getUser); // Gets Own User Details
app.get("/user/:handle", firebaseAuth, getUserDetails); // Gets Any User Details
app.post("/user/signup", signUp); // Signs Up User
app.post("/user/login", logIn); // Logs In User
app.put("/user/update/email", firebaseAuth, updateEmail); // Updates User Email Address
app.put("/user/update/password", firebaseAuth, updatePassword); // Updates User Password
app.post("/user/image", firebaseAuth, uploadImage); // Uploads Image for User
app.post("/user/update", firebaseAuth, updateUser); // Updates User Info (Bio/Website)
app.post("/user/follow", firebaseAuth, followUser); // Follows User
app.post("/user/unfollow", firebaseAuth, unfollowUser); // Unfollows User
app.post("/user/friend/add", firebaseAuth, addFriend); // Friends User
app.post("/user/friend/remove", firebaseAuth, removeFriend); // Unfriends User

// Notifications
app.post("/notifications", firebaseAuth, readNotifications); // Marks Notifications as Read

// Search Parameter
app.get("/search/users/:handle", searchUsers); // Searches through User Database for Similar Handles

// Exports To Cloud Functions
exports.api = functions.https.onRequest(app);

// Creates Notification on Like Creation
exports.createLikeNotification = likeNotification;

// Deletes Notification on Unlike (Like Deletion)
exports.deleteLikeNotification = unlikeNotification;

// Create Notification on Comment Creation
exports.createCommentNotification = commentNotification;

// Create Notification on Comment Creation
exports.deleteCommentNotification = deleteCommentNotification;

// Updates User Image Upon Update
// exports.imageUpdate = onImageChange;

// Deletes Comments When Rant is Deleted
exports.deleteRantComplete = onRantDelete;
