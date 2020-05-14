import * as express from "express";
import * as admin from "firebase-admin";

const { db } = require("../util/admin");

// Firebase Authentication Middleware
exports.firebaseAuth = (
  req: express.Request,
  res: express.Response,
  next: any
) => {
  let idToken: string;

  // Validates Header Token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    // Gets ID Token from Headers
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error;
    res.status(403).json({ error: "Unauthorized" });
    return;
  }

  // Verifies ID Token
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedToken => {
      // Selects Specific User Document in Database
      req.user = decodedToken;
      return db
        .collection("users")
        .where("userID", "==", req.user.uid)
        .limit(1)
        .get();
    })
    .then(data => {
      // Gives Request User a Username Property
      const userName =
        data.docs[0].data().firstName.toString() +
        " " +
        data.docs[0].data().lastName.toString();
      req.user.userName = userName;
      return next();
    })
    .catch(err => {
      // Returns Errors
      console.error("Error While Verifying Token", err);
      return res.status(403).json(err);
    });
};
