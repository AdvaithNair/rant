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
    .catch((err: any) => console.error(err));
};
