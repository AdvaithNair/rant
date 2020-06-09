import * as express from "express";

const { db } = require("../util/admin");
const { validateRant } = require("../util/validation");

// Creates a Rant (Post)
// MAKE SURE THIS WORKS - RUN TESTS
exports.createRant = (req: express.Request, res: express.Response) => {
  // Runs Sign Up Validation
  const { errors, valid } = validateRant(req);

  // Sends Error if Invalid
  if (!valid) {
    res.status(400).json({ errors });
    return;
  }

  const blankImage =
    "https://firebasestorage.googleapis.com/v0/b/rant-dd853.appspot.com/o/no-img.png?alt=media";

  // New Rant Object
  const newRant: { [k: string]: any } = {
    userName: req.body.anonymous ? "Anonymous" : req.user.userName,
    handle: req.body.anonymous ? "anonymous" : req.user.handle,
    imageURL: req.body.anonymous ? blankImage : req.user.imageURL,
    title: req.body.title,
    body: req.body.body,
    likeCount: 0,
    commentCount: 0,
    createdAt: new Date().toISOString()
  };

  // Adds Rant Object to Database
  db.collection("rants")
    .add(newRant)
    .then((doc: any) => {
      // Sets Document ID to rantID property
      newRant.rantID = doc.id;
      return res.json({ newRant });
    })
    .catch((err: any) => {
      // Return Errors
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

// Creates a Comment
exports.createComment = (req: express.Request, res: express.Response) => {
  // Validates Comment (Quickly)
  if (req.body.body.trim() === "") {
    res.status(400).json({ error: "Must Not Be Empty" });
    return;
  }

  // New Comment Object
  const newComment: { [k: string]: any } = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    rantID: req.params.rantID,
    commenterID: req.user.uid,
    userName: req.user.userName,
    handle: req.user.handle,
    imageURL: req.user.imageURL
  };

  // Adds New Comment
  db.doc(`/rants/${req.params.rantID}`)
    .get()
    .then((doc: any) => {
      // Returns Error if the Rant Does Not Exist
      if (!doc.exists) {
        res.status(404).json({ error: "Rant Not Found" });
        return;
      } else newComment.ranterID = doc.data().userID;
      return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
    })
    .then(() => {
      db.collection("comments").add(newComment);
    })
    .then(() => {
      res.status(200).json(newComment);
    })
    .catch((err: any) => {
      // Return Errors
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
/*
exports.createComment = (req: express.Request, res: express.Response) => {
  // Validates Comment (Quickly)
  if (req.body.body.trim() === "") {
    res.status(400).json({ error: "Must Not Be Empty" });
    return;
  }

  // New Comment Object
  const newComment: { [k: string]: any } = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    rantID: req.params.rantID,
    userName: req.user.userName,
    handle: req.user.handle,
    imageURL: req.user.imageURL
  };

  // Adds New Comment
  db.doc(`/rants/${req.params.rantID}`)
    .get()
    .then((doc: any) => {
      // Returns Error if the Rant Does Not Exist
      if (!doc.exists) {
        res.status(404).json({ error: "Rant Not Found" });
        return;
      } else newComment.ranterID = doc.data().userID;
      return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
    })
    .then(() => {
      return db.collection("comments").add(newComment);
    })
    .then(() => {
      res.status(200).json(newComment);
    })
    .catch((err: any) => {
      // Return Errors
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
*/

// Toggles Like/Unlike of Rant
exports.toggleLike = (req: express.Request, res: express.Response) => {
  // Gets Like Document (if it exists)
  const likeDocument = db
    .collection("likes")
    .where("userID", "==", req.user.uid)
    .where("rantID", "==", req.params.rantID)
    .limit(1);

  // Rant Document Preface (for simplicity)
  const rantDocument = db.doc(`/rants/${req.params.rantID}`);

  // Rant Data Object to Store Temporary Data
  let rantData: { [k: string]: any } = {};

  rantDocument
    .get()
    .then((doc: any) => {
      // Transfer Document Data to Rant Data (if it exists)
      if (doc.exists) {
        rantData = doc.data();
        rantData.rantID = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Rant Not Found" });
      }
    })
    .then((data: any) => {
      if (data.empty) {
        // Create Like Document
        return db
          .collection("likes")
          .add({
            rantID: req.params.rantID,
            userID: req.user.uid,
            userName: req.user.userName,
            handle: req.user.handle
          })
          .then(() => {
            // Increment Like Count and Update in Database
            rantData.likeCount++;
            return rantDocument.update({ likeCount: rantData.likeCount });
          })
          .then(() => {
            return res.status(200).json({ rantData });
          });
      } else {
        // Delete Like Document
        return db
          .doc(`/likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            // Decrement Like Count and Update in Database
            rantData.likeCount--;
            return rantDocument.update({ likeCount: rantData.likeCount });
          })
          .then(() => {
            res.status(200).json({ rantData });
          });
      }
    })
    .catch((err: any) => {
      // Return Errors
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
