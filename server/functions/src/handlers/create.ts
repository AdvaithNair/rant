import * as express from "express";

const { db } = require("../util/admin");

exports.createRant = (req: express.Request, res: express.Response) => {
    if (req.body.body.trim() === "") {
      res.status(400).json({ body: "Body Must Not Be Empty" });
      return;
    }

    const newRant = {
      userName: req.user.userName,
      title: req.body.title,
      body: req.body.body,
      likeCount: req.body.likeCount,
      commentCount: req.body.commentCount,
      createdAt: new Date().toISOString()
    };

    db.collection("rants")
      .add(newRant)
      .then((doc: any) => {
        return res.json({ message: `Document ${doc.id} created sucessfully!` });
      })
      .catch((err: any) => {
        console.error(err);
        return res.status(500).json({ error: `Could Not Add` });
      });
  }