import * as express from "express";
import * as firebase from "firebase";

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

  let authToken: string;
  let userID: string;

  db.doc(`users/${newUser.firstName}`)
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
        createdAt: new Date().toISOString()
      };

      return db.collection("users").add(userCredentials);
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
