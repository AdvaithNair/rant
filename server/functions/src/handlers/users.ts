import * as express from "express";
import * as firebase from "firebase";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

// const { v1: uuidv1 } = require("uuid");
const { db } = require("../util/admin");
const { firebaseConfig } = require("../util/config");
const {
  validateSignUp,
  validateLogIn,
  reduceUserDetails
} = require("../util/validation");

// Initialize Firebase App
firebase.initializeApp(firebaseConfig);

// Signs Up User to Firebase Authentication and Database
exports.signUp = (req: express.Request, res: express.Response) => {
  // New User Object
  const newUser: { [k: string]: string } = {
    handle: req.body.handle,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  };

  // Runs Sign Up Validation
  const { errors, valid } = validateSignUp(newUser);

  // Sends Error if Invalid
  if (!valid) {
    res.status(400).json({ errors });
    return;
  }

  // Default Image
  const noImg = "no-img.png";

  // Variables for Authorization
  let authToken: string;
  let userID: string;

  // Signs Up User in Database
  db.doc(`users/${newUser.handle}`)
    .get()
    .then((doc: any) => {
      // Checks Handle
      if (doc.exists)
        return res
          .status(400)
          .json({ handle: "This Username is Already Taken" });
      // Initial Sign Up
      return firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password);
    })
    .then((data: any) => {
      // Provides Authentication Token
      userID = data.user.uid;
      return data.user.getIdToken();
    })
    .then((token: any) => {
      authToken = token;
      const userName =
        newUser.firstName.toString() + " " + newUser.lastName.toString();
      // User Credentials for Database
      const userCredentials = {
        handle: newUser.handle,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        userName: userName,
        email: newUser.email,
        userID,
        imageURL: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${noImg}?alt=media`,
        createdAt: new Date().toISOString()
      };

      // Creates User Instance in Database
      return db.doc(`/users/${userCredentials.handle}`).set(userCredentials);
    })
    .then(() => {
      // Returns Authentication Token
      return res.status(201).json({ token: authToken });
    })
    .catch((err: any) => {
      // Returns Errors
      console.error(err);

      // Returns Custom Email In Use Error
      if (err.code === "auth/email-already-in-use")
        return res.status(400).json({ email: "Email is already in use" });
      // Returns Custon Weak Password Error
      else if (err.code === "auth/weak-password")
        return res.status(400).json({ password: "Weak Password" });
      // Returns Default Error
      else
        return res
          .status(500)
          .json({ general: "Something Went Wrong. Please Try Again." });
    });
};

// Logs In User to App (Provides Authentication Token)
exports.logIn = (req: express.Request, res: express.Response) => {
  // User Object
  const newUser = {
    email: req.body.email,
    password: req.body.password
  };

  // Runs LogIn Validation
  const { errors, valid } = validateLogIn(newUser);

  // Sends Error if Invalid
  if (!valid) {
    res.status(400).json({ errors });
    return;
  }

  // Logs In Using Firebase Authentication
  firebase
    .auth()
    .signInWithEmailAndPassword(newUser.email, newUser.password)
    .then((data: any) => {
      // Provides Authentication Token
      return data.user.getIdToken();
    })
    .then(token => {
      // Returns Authentication Token
      return res.json({ token });
    })
    .catch(err => {
      // Returns Errors
      console.error(err);

      // Returns Default Error
      return res.status(403).json({ general: "Incorrect Credentials" });
    });
};

// Uploads Image to Firebase Cloud Storage and Updates Image URL to Database
exports.uploadImage = (req: express.Request, res: express.Response) => {
  // Imports for Image Upload
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  // Initializes Image Reader
  const busboy = new BusBoy({ headers: req.headers });

  // Variables for Exporting
  let imageFileName: string;
  let imageToBeUploaded: { [k: string]: any } = {};
  let imageURL: string;

  // Reads Image File
  busboy.on(
    "file",
    (
      fieldname: any,
      file: any,
      filename: any,
      encoding: any,
      mimetype: any
    ) => {
      // Sends Error if File Type is not an Image
      if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
        res.status(400).json({ error: "Wrong File Type Submitted" });
        return;
      }

      // Gets Image Extension
      const imageExtension = filename.split(".")[
        filename.split(".").length - 1
      ];

      // Creates Unique (Timestamp-Based UUID) File Name
      //imageFileName = `${uuidv1()}.${imageExtension}`;
      imageFileName = `${req.user.handle}.${imageExtension}`;

      // Adds Image Data to Upload-Ready Object
      const filepath = path.join(os.tmpdir(), imageFileName);
      imageToBeUploaded = { filepath, mimetype };
      file.pipe(fs.createWriteStream(filepath));
    }
  );

  // Uploads Image to Storage and Updates User Image URL in Database
  busboy.on("finish", () => {
    // Uploads Image
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
        // Updates User Image URL in Database
        imageURL = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`;
        return db.doc(`/users/${req.user.handle}`).update({ imageURL });
      })
      .then(() => {
        // Success Message
        return res.json({ message: "Image Uploaded Successfully", imageURL });
      })
      .catch(err => {
        // Returns Errors
        console.error(err);
        return res.status(501).json({ error: err.code });
      });
  });

  // Ends Image Reader Process
  busboy.end(req.rawBody);
};

// Updates User Information
exports.updateUser = (req: express.Request, res: express.Response) => {
  const userDetails = reduceUserDetails(req.body);

  db.doc(`/users/${req.user.handle}`)
    .update(userDetails)
    .then(() => {
      return res.status(200).json({ message: "Details Added Successfully" });
    })
    .catch((err: any) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

// Retrieves Own User Information
exports.getUser = (req: express.Request, res: express.Response) => {
  // Object Storing User Information
  const userData: { [k: string]: any } = {};

  // Returns User Information from Database
  db.doc(`/users/${req.user.handle}`)
    .get()
    .then((doc: any) => {
      // Gets Information
      if (doc.exists) {
        // Stores About Information to User Information Object
        userData.about = doc.data();

        // Gets User Comments
        return db
          .collection("likes")
          .where("handle", "==", req.user.handle)
          .get();
      }
    })
    .then((data: any) => {
      // Initial Likes Array
      userData.likes = [];

      // Pushes Each Like to Array
      data.forEach((doc: any) => {
        userData.likes.push(doc.data());
      });

      // Gets Newest 25 Notifications
      // TODO: Possibly Change This Limit
      return db
        .collection("notifications")
        .where("recipient", "==", req.user.handle)
        .orderBy("createdAt", "desc")
        .limit(25)
        .get();
    })
    .then((data: any) => {
      // Initial Notificaitons Array
      userData.notifications = [];

      // Pushes Each Notification to Array
      data.forEach((doc: any) => {
        userData.notifications.push({
          recipient: doc.data().recipient,
          sender: doc.data().sender,
          createdAt: doc.data().createdAt,
          rantID: doc.data().rantID,
          type: doc.data().type,
          read: doc.data().read,
          imageURL: doc.data().imageURL,
          notificationID: doc.id
        });
      });

      // Returns User Data
      return res.status(200).json({ userData });
    })
    .catch((err: any) => {
      // Returns Error
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

// Retrieves User Information
// TODO: FIX THIS
exports.getUserDetails = (req: express.Request, res: express.Response) => {
  const userData: { [k: string]: any } = {};
  db.doc(`/users/${req.params.handle}`)
    .get()
    .then((doc: any) => {
      if (doc.exists) {
        userData.user = doc.data();
        return db
          .collection("rants")
          .where("handle", "==", req.params.handle)
          .orderBy("createdAt", "desc")
          .get();
      }
    })
    .then((data: any) => {
      userData.rants = [];
      data.forEach((doc: any) => {
        userData.rants.push({
          title: doc.data().title,
          body: doc.data().body,
          createdAt: doc.data().createdAt,
          userName: doc.data().userName,
          handle: doc.data().handle,
          userImage: doc.data().userImage,
          likeCount: doc.data().likeCount,
          commentCount: doc.data().commentCount,
          imageURL: doc.data().imageURL,
          rantID: doc.id
        });
      });

      // Returns User Data
      return res.json({ userData });
    })
    .catch((err: any) => {
      console.error(err);
      return res.status(500).json({ error: err });
    });
};

// Updates Images
exports.onImageChange = functions.firestore
  .document("/users/{userID}")
  .onUpdate((change: any) => {
    // If the Image URL has changed
    if (change.before.data().imageURL !== change.after.data().imageURL) {
      const batch = db.batch();

      // Get All Corresponding Rant Documents
      return db
        .collection("rants")
        .where("handle", "==", change.before.data().handle)
        .get()
        .then((data: any) => {
          // Update Each Rant
          data.forEach((doc: any) => {
            batch.update(db.doc(`/rants/${doc.id}`), {
              imageURL: change.after.data().imageURL
            });
          });

          // Get All Corresponding Comment Documents
          return db
            .collection("comments")
            .where("handle", "==", change.before.data().handle)
            .get();
        })
        .then((data: any) => {
          // Update Each Comment
          data.forEach((doc: any) => {
            batch.update(db.doc(`/comments/${doc.id}`), {
              imageURL: change.after.data().imageURL
            });
          });

          // Commit Batch (Update All)
          return batch.commit();
        });
    } else return true;
  });
