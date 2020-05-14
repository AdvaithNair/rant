import * as express from "express";
import * as functions from "firebase-functions";

const { firebaseAuth } = require("./util/firebaseAuth");

const { getAllRants } = require("./handlers/get");
const { createRant } = require("./handlers/create");
const { signUp, logIn, uploadImage } = require("./handlers/users");

// Initialize Express
const app: express.Application = express();

// Get
app.get("/get/all_rants", getAllRants);

// Create
app.post("/create/rant", firebaseAuth, createRant);

// User
app.post("/user/signup", signUp);
app.post("/user/login", logIn);
app.post('/user/image', firebaseAuth, uploadImage);

// Exports To Cloud Functions
exports.api = functions.https.onRequest(app);
