import * as express from "express";
import * as functions from "firebase-functions";

const { db } = require("../util/admin");

// Like Notification Snapshot
exports.likeNotification = functions.firestore
  .document("/likes/{id}")
  .onCreate((snapshot: any) => {
    return db
      .doc(`/rants/${snapshot.data().rantID}`)
      .get()
      .then((doc: any) => {
        // When a Like Document is Created
        if (doc.exists) {
          // Check for Reduncancy (Own Notification)
          if (doc.data().handle !== snapshot.data().handle) {
            // Create a Notification in the Database
            return db.doc(`/notifications/${snapshot.id}`).set({
              createdAt: new Date().toISOString(),
              recipient: doc.data().handle,
              sender: snapshot.data().handle,
              senderName: snapshot.data().userName,
              imageURL: snapshot.data().imageURL,
              type: "like",
              read: false,
              rantID: doc.id
            });
          }
        }
      })
      .catch((err: any) => {
        // Return Errors
        console.error(err);
      });
  });

// Unlike Notification Snapshot
exports.unlikeNotification = functions.firestore
  .document("/likes/{id}")
  .onDelete((snapshot: any) => {
    return db
      .doc(`/notifications/${snapshot.id}`)
      .delete()
      .catch((err: any) => {
        // Return Errors
        console.error(err);
      });
  });

// Comment Notification Snapshot
exports.commentNotification = functions.firestore
  .document("/comments/{id}")
  .onCreate((snapshot: any) => {
    return db
      .doc(`/rants/${snapshot.data().rantID}`)
      .get()
      .then((doc: any) => {
        // When a Comment Document is Created
        if (doc.exists) {
          // Check for Reduncancy (Own Notification)
          if (doc.data().handle !== snapshot.data().handle) {
            // Create a Notification in the Database
            return db.doc(`/notifications/${snapshot.id}`).set({
              createdAt: new Date().toISOString(),
              recipient: doc.data().handle,
              sender: snapshot.data().handle,
              senderName: snapshot.data().userName,
              imageURL: snapshot.data().imageURL,
              type: "comment",
              read: false,
              rantID: doc.id
            });
          }
        }
      })
      .catch((err: any) => {
        // Return Errors
        console.error(err);
      });
  });

// Delete Comment Notification Snapshot
exports.deleteCommentNotification = functions.firestore
  .document("/comments/{id}")
  .onDelete((snapshot: any) => {
    return db
      .doc(`/notifications/${snapshot.id}`)
      .delete()
      .catch((err: any) => {
        // Return Errors
        console.error(err);
      });
  });

// Marks Notifications as Read
exports.readNotifications = (req: express.Request, res: express.Response) => {
  const batch = db.batch();

  // Update Each Notification
  req.body.forEach((notificationID: any) => {
    batch.update(db.doc(`/notifications/${notificationID}`), { read: true });
  });

  // Commit Batch
  batch
    .commit()
    .then(() => {
      return res.json({ message: "Notifications Read" });
    })
    .catch((err: any) => {
      // Return Errors
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
