import * as express from "express";

const { db } = require("../util/admin");

// Creates a Rant (Post)
exports.createRant = (req: express.Request, res: express.Response) => {
    // Catches Empty Rant Body
    if (req.body.body.trim() === "") {
      res.status(400).json({ body: "Body Must Not Be Empty" });
      return;
    }
    // ADD EMPTY TITLE CATCHING

    // New Rant Object
    const newRant = {
      userName: req.user.userName,
      title: req.body.title,
      body: req.body.body,
      likeCount: req.body.likeCount,
      commentCount: req.body.commentCount,
      createdAt: new Date().toISOString()
    };

    // Adds Rant Object to Database
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