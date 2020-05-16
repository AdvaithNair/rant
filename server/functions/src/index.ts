import * as express from "express";
import * as functions from "firebase-functions";

// Authentication Middleware
const { firebaseAuth } = require("./util/firebaseAuth");

const { getAllRants, getRant } = require("./handlers/get");
const { createRant, createComment, toggleLike } = require("./handlers/create");
const {
  signUp,
  logIn,
  uploadImage,
  updateUser,
  getUser,
  getUserDetails,
  onImageChange
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
// TODO: Get Feed

// Create
app.post("/create/rant", firebaseAuth, createRant); // Creates Rant

// Rant Operations
app.get("/rant/:rantID", getRant); // Gets Rant Data for Specific Rant
app.post("/rant/comment/:rantID", firebaseAuth, createComment); // Posts Comment
app.get("/rant/like/:rantID", firebaseAuth, toggleLike); // Toggles Like (Likes/Unlikes)

// Delete
app.delete("/delete/rant/:rantID", firebaseAuth, deleteRant); // Deletes Rant (and associated Comments, Likes, and Notifications)
app.delete("/delete/comment/:commentID", firebaseAuth, deleteComment); // Deletes Comment

// User
app.get("/user", firebaseAuth, getUser); // Gets Own User Details
app.get("/user/:handle", getUserDetails); // Gets Any User Details
app.post("/user/signup", signUp); // Signs Up User
app.post("/user/login", logIn); // Logs In User
app.post("/user/image", firebaseAuth, uploadImage); // Uploads Image for User
app.post("/user/update", firebaseAuth, updateUser); // Updates User Info (Bio/Website)

// Notifications
app.post("/notifications", firebaseAuth, readNotifications); // Marks Notifications as Read

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
exports.imageUpdate = onImageChange;

// Deletes Comments When Rant is Deleted
exports.deleteRantComplete = onRantDelete;
