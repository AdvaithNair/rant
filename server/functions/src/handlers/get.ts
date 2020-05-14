import * as express from "express";

const { db } = require("../util/admin");

exports.getAllRants = (req: express.Request, res: express.Response) => {
  db.collection("rants")
    .orderBy("createdAt", "desc")
    .get()
    .then((data: any) => {
      const rants: FirebaseFirestore.DocumentData[] = [];

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

      return res.json(rants);
    })
    .catch((err: any) => console.error(err));
};
