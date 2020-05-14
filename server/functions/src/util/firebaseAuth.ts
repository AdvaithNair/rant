import * as express from "express";
import * as admin from "firebase-admin";

const { db } = require("../util/admin");

exports.firebaseAuth  = (
    req: express.Request,
    res: express.Response,
    next: any
  ) => {
    let idToken: string;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      idToken = req.headers.authorization.split("Bearer ")[1];
    } else {
      console.error;
      res.status(403).json({ error: "Unauthorized" });
      return;
    }
  
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => {
        req.user = decodedToken;
        return db
          .collection("users")
          .where("userID", "==", req.user.uid)
          .limit(1)
          .get();
      })
      .then(data => {
        let userName =
          data.docs[0].data().firstName.toString() +
          " " +
          data.docs[0].data().lastName.toString();
        req.user.userName = userName;
        return next();
      })
      .catch(err => {
        console.error("Error While Verifying Token", err);
        return res.status(403).json(err);
      });
  };