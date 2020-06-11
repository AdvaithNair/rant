import * as express from "express";

const { db } = require("../util/admin");
const { validateRant } = require("../util/validation");

// Updates a Rant (Post)
exports.updateRant = (req: express.Request, res: express.Response) => {
  // Runs Sign Up Validation
  const { errors, valid } = validateRant(req);

  // Sends Error if Invalid
  if (!valid) {
    res.status(400).json({ errors });
    return;
  }

  // Updated Rant Object
  const updatedRant: { [k: string]: any } = {
    title: req.body.title,
    body: req.body.body
  };

  // Adds Rant Object to Database
  db.collection("rants")
    .doc(req.params.rantID)
    .update(updatedRant)
    .then(() => {
      updatedRant.rantID = req.params.rantID;
      return res.json({ updatedRant });
    })
    .catch((err: any) => {
      // Return Errors
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
