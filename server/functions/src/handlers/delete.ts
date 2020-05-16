import * as express from "express";
import * as functions from "firebase-functions";

const { db } = require("../util/admin");

// Deletes a Rant (Post)
exports.deleteRant = (req: express.Request, res: express.Response) => {
  // Document Path for Rant
  const rantDocument = db.doc(`/rants/${req.params.rantID}`);

  // Deletes Document
  rantDocument
    .get()
    .then((doc: any) => {
      // Checks if Rant Exists
      if (!doc.exists) {
        res.status(404).json({ error: "Rant Not Found" });
        return;
      }
      // Checks if User is Authorized
      if (doc.data().userID !== req.user.uid)
        return res.status(403).json({ error: "Unauthorized" });
      //Deletes Document
      else return rantDocument.delete();
    })
    .then(() => {
      res.status(200).json({ message: "Rant Deleted Successfully" });
    })
    .catch((err: any) => {
      // Return Errors
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

// Deletes a Comment
exports.deleteComment = (req: express.Request, res: express.Response) => {
  // Document Path for Comment
  const commentDocument = db.doc(`/comments/${req.params.commentID}`);

  // Deletes Document
  commentDocument
    .get()
    .then((doc: any) => {
      // Checks if Comment Exists
      if (!doc.exists) {
        res.status(404).json({ error: "Comment Not Found" });
        return;
      }
      //return res.json({ info: doc.data() });
      // Checks if User is Authorized
      if (
        doc.data().commenterID !== req.user.uid &&
        doc.data().ranterID !== req.user.uid
      )
        return res.status(403).json({ error: "Unauthorized" });
      // Gets Rant Document
      else {
        return db.doc(`/rants/${doc.data().rantID}`).get();
      }
    })
    .then((doc: any) => {
      // Updates Comment Count on Rant Document in Database (if it exists)
      if (doc.exists) {
        return db
          .doc(`/rants/${doc.id}`)
          .update({ commentCount: doc.data().commentCount - 1 });
      } else {
        return res.status(404).json({ error: "Original Rant Not Found" });
      }
    })
    .then(() => {
      // Deletes Comment Document
      return commentDocument.delete();
    })
    .then(() => {
      res.status(200).json({ message: "Comment Deleted Successfully" });
    })
    .catch((err: any) => {
      // Return Errors
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

// Deletes Comments, Likes, and Notifications when Rant is Deleted
exports.onRantDelete = functions.firestore
  .document("rants/{rantID}")
  .onDelete((snapshot: any, context: any) => {
    const rantID = context.params.rantID;
    const batch = db.batch();

    // Gets All Corresponding Comments
    return db
      .collection("comments")
      .where("rantID", "==", rantID)
      .get()
      .then((data: any) => {
        // Adds Comment Deletes to Batch
        data.forEach((doc: any) => {
          batch.delete(db.doc(`/comments/${doc.id}`));
        });

        // Gets All Corresponding Likes
        return db
          .collection("likes")
          .where("rantID", "==", rantID)
          .get();
      })
      .then((data: any) => {
        // Adds Like Deletes to Batch
        data.forEach((doc: any) => {
          batch.delete(db.doc(`/likes/${doc.id}`));
        });

        // Gets All Corresponding Notifications
        return db
          .collection("notifications")
          .where("rantID", "==", rantID)
          .get();
      })
      .then((data: any) => {
        // Adds Notification Deletes to Batch
        data.forEach((doc: any) => {
          batch.delete(db.doc(`/notifications/${doc.id}`));
        });

        // Commits Batch (Deletes Everything)
        return batch.commit();
      })
      .catch((err: any) => {
        // Returns Errors
        console.error(err);
      });
  });
