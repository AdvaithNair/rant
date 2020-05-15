import * as express from "express";
import * as functions from "firebase-functions";

const { firebaseAuth } = require("./util/firebaseAuth");

const { getAllRants, getRant } = require("./handlers/get");
const { createRant, createComment, toggleLike } = require("./handlers/create");
const {
  signUp,
  logIn,
  uploadImage,
  updateUser,
  getUser
} = require("./handlers/users");
const { deleteRant, deleteComment } = require("./handlers/delete");

// Initialize Express
const app: express.Application = express();

// Get
app.get("/get/all_rants", getAllRants);
// TODO: Get Feed

// Create
app.post("/create/rant", firebaseAuth, createRant);

// Rant Operations
app.get("/rant/:rantID", getRant);
app.post("/rant/comment/:rantID", firebaseAuth, createComment);
app.get("/rant/like/:rantID", firebaseAuth, toggleLike);

// Delete
app.delete("/delete/rant/:rantID", firebaseAuth, deleteRant);
app.delete("/delete/comment/:commentID", firebaseAuth, deleteComment);

// User
app.get("/user", firebaseAuth, getUser);
// TODO: Get User Data Given UserID
app.post("/user/signup", signUp);
app.post("/user/login", logIn);
app.post("/user/image", firebaseAuth, uploadImage);
app.post("/user/update", firebaseAuth, updateUser);

// Exports To Cloud Functions
exports.api = functions.https.onRequest(app);
