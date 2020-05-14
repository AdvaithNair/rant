import * as express from "express";
import * as firebase from "firebase";
import * as admin from "firebase-admin";

const { v1: uuidv1 } = require('uuid');
const { db } = require("../util/admin");
const { firebaseConfig } = require("../util/config");
const { validateSignUp, validateLogIn } = require("../util/validation");

firebase.initializeApp(firebaseConfig);

exports.signUp = (req: express.Request, res: express.Response) => {
  // New User Object
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  };

  const { errors, valid } = validateSignUp(newUser);

  if (!valid) {
    res.status(400).json({ errors });
    return;
  }

  const noImg = "no-img.png";

  let authToken: string;
  let userID: string;

  db.doc(`users/${newUser.email}`)
    .get()
    .then((doc: any) => {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password);
    })
    .then((data: any) => {
      userID = data.user.uid;
      return data.user.getIdToken();
    })
    .then((token: any) => {
      authToken = token;

      // User Credentials for Database
      const userCredentials = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        userID,
        imageURL: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${noImg}?alt=media`,
        createdAt: new Date().toISOString()
      };

      return db.doc(`/users/${userID}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token: authToken });
    })
    .catch((err: any) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use")
        return res.status(400).json({ email: "Email is already in use" });
      else if (err.code === "auth/weak-password")
        return res.status(400).json({ password: "Weak Password" });
      else return res.status(500).json({ error: err.code });
    });
};

exports.logIn = (req: express.Request, res: express.Response) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  const { errors, valid } = validateLogIn(user);

  if (!valid) {
    res.status(400).json({ errors });
    return;
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data: any) => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.json({ token });
    })
    .catch(err => {
      console.error(err);
      if (err.code === "auth/wrong-password")
        return res.status(403).json({ general: "Incorrect Credentials" });
      else return res.status(500).json({ error: err.code });
    });
};

exports.uploadImage = (req: express.Request, res: express.Response) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: req.headers });

  let imageFileName: string;
  let imageToBeUploaded: { [k: string]: any } = {};

  busboy.on(
    "file",
    (
      fieldname: any,
      file: any,
      filename: any,
      encoding: any,
      mimetype: any
    ) => {
      if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
        res.status(400).json({ error: "Wrong File Type Submitted" });
        return;
      }

      const imageExtension = filename.split(".")[
        filename.split(".").length - 1
      ];

      imageFileName = `${uuidv1()}.${imageExtension}`;

      const filepath = path.join(os.tmpdir(), imageFileName);
      imageToBeUploaded = { filepath, mimetype };

      file.pipe(fs.createWriteStream(filepath));
    }
  );

  busboy.on("finish", () => {
    admin
      .storage()
      .bucket(`${firebaseConfig.storageBucket}`)
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype
          }
        }
      })
      .then(() => {
        const imageURL = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`;
        return db.doc(`/users/${req.user.uid}`).update({ imageURL });
      })
      .then(() => {
        return res.json({ message: "Image Uploaded Successfully" });
      })
      .catch(err => {
        console.error(err);
        return res.status(501).json({ error: err.code });
      });
  });

  busboy.end(req.rawBody);
};
