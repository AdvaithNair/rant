import * as express from "express";

const { db } = require("../util/admin");

// Retrieves All Rants (Posts)
exports.getAllRants = (req: express.Request, res: express.Response) => {
  db.collection("rants")
    .orderBy("createdAt", "desc")
    .get()
    .then((data: any) => {
      // Array of Documents
      const rants: FirebaseFirestore.DocumentData[] = [];

      // Add Documents to Array
      data.forEach((doc: any) => {
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

      // Return Array
      return res.json(rants);
    })
    .catch((err: any) => {
      // Returns Errors
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// Retreives Specific Rant
exports.getRant = (req: express.Request, res: express.Response) => {
  // Initial Rant Data Object
  let rantData: { [k: string]: any } = {};

  // Gets Rant Data from Database
  db.doc(`/rants/${req.params.rantID}`)
    .get()
    .then((doc: any) => {
      // Returns 404 if Document Does Not Exist
      if (!doc.exists) return res.status(404).json({ error: "Rant Not Found" });

      // Imports Document Data to Rant Data Object
      rantData = doc.data();
      rantData.rantID = doc.id;

      // Gets Comments for Rant from Database
      return db
        .collection("comments")
        .orderBy("createdAt")
        .where("rantID", "==", req.params.rantID)
        .get();
    })
    .then((data: any) => {
      // Initial Comment Data Array
      rantData.comments = [];

      // Pushes Comment Documents from Database to Comment Data Array
      data.forEach((doc: any) => {
        rantData.comments.push(doc.data());
      });

      // Returns Rant Data Object
      return res.status(200).json(rantData);
    })
    .catch((err: any) => {
      // Returns Errors
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
