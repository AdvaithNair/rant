import * as express from "express";
import * as functions from "firebase-functions";

const { firebaseAuth } = require("./util/firebaseAuth");

const { getAllRants } = require("./handlers/get");
const { createRant } = require("./handlers/create");
const { signUp, logIn, uploadImage } = require("./handlers/users");

// Initialize Express
const app: express.Application = express();

// Get All Rants
app.get("/get/all_rants", getAllRants);

// Create Rant
app.post("/create/rant", firebaseAuth, createRant);

// User Sign Up
app.post("/user/signup", signUp);

// User Log In
app.post("/user/login", logIn);

// User Upload Image
app.post('/user/image', firebaseAuth, uploadImage);

// Exports To Cloud Functions
exports.api = functions.https.onRequest(app);
