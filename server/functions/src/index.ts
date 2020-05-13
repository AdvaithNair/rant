import * as express from "express";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { resolve } from "path";
import { config } from "dotenv";

// Initialize Admin
admin.initializeApp();

// Initialize .env File
config({ path: resolve(__dirname, "../.env") });

// Initialize Express
const app: express.Application = express();
// const PORT: number = Number(process.env["PORT"]);

// Get All Rants
app.get("/get/all_rants", (req: express.Request, res: express.Response) => {
  admin
    .firestore()
    .collection("rants")
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
      let rants: FirebaseFirestore.DocumentData[] = [];

      data.forEach(doc => {
        rants.push({
            rantID: doc.id,
            userName: doc.data().userName,
            title: doc.data().title,
            body: doc.data().body,
            likeCount: doc.data().likeCount,
            commentCount: doc.data().commentCount,
            createdAt: doc.data().createdAt
        });
      });

      return res.json(rants);
    })
    .catch(err => console.error(err));
});

// Create Rant
app.post("/create/rant", (req: express.Request, res: express.Response) => {
  const newRant = {
    userName: req.body.userName,
    title: req.body.title,
    body: req.body.body,
    likeCount: req.body.likeCount,
    commentCount: req.body.commentCount,
    createdAt: new Date().toISOString()
  };

  admin
    .firestore()
    .collection("rants")
    .add(newRant)
    .then(doc => {
      res.json({ message: `Document ${doc.id} created sucessfully!` });
    })
    .catch(err => {
      res.status(500).json({ error: `Could Not Add` });
      console.error(err);
    });
});

exports.api = functions.https.onRequest(app);
