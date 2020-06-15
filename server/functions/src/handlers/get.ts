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
          ...doc.data(),
          rantID: doc.id
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

// Gets Feed of Rants
// TODO: Incorporate Private Posts if Possible
exports.getFeed = (req: express.Request, res: express.Response) => {
  const followingArray: Array<string> = [];
  // Returns User Information from Database
  db.doc(`/users/${req.user.handle}`)
    .get()
    .then((doc: any) => {
      // Gets Information
      if (doc.exists) {
        // Stores About Information to User Information Object
        const followingArrayFull: Array<any> = doc.data().following;
        followingArrayFull.forEach((e: any) => followingArray.push(e.handle))

        // Gets Rants Of Following Users
        return db.collection("rants")
        .where('handle', 'in', followingArray)
        .orderBy("createdAt", "desc")
        .limit(50)
        .get()
      }
    })
    .then((data: any) => {
      // Array of Documents
      const rants: FirebaseFirestore.DocumentData[] = [];

      // Add Documents to Array
      data.forEach((doc: any) => {
        rants.push({
          rantID: doc.id,
          userName: doc.data().userName,
          userID: doc.data().userID,
          handle: doc.data().handle,
          title: doc.data().title,
          body: doc.data().body,
          rantverseScore: doc.data().rantverseScore,
          likeCount: doc.data().likeCount,
          commentCount: doc.data().commentCount,
          createdAt: doc.data().createdAt,
          imageURL: doc.data().imageURL
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

// Retreives Top 10 Trending Rants
exports.getTrending = (req: express.Request, res: express.Response) => {
  db.collection("rants")
    .orderBy("rantverseScore", "desc")
    .limit(10)
    .get()
    .then((data: any) => {
      // Array of Documents
      const rants: FirebaseFirestore.DocumentData[] = [];

      // Add Documents to Array
      data.forEach((doc: any) => {
        rants.push({
          rantID: doc.id,
          userName: doc.data().userName,
          userID: doc.data().userID,
          handle: doc.data().handle,
          title: doc.data().title,
          body: doc.data().body,
          rantverseScore: doc.data().rantverseScore,
          likeCount: doc.data().likeCount,
          commentCount: doc.data().commentCount,
          createdAt: doc.data().createdAt,
          imageURL: doc.data().imageURL
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
}

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
        const commentData = { ...doc.data(), commentID: doc.id };
        rantData.comments.push(commentData);
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

// Retreives Specific Rant
exports.searchUsers = (req: express.Request, res: express.Response) => {
  // Gets User Data from Database
  db.collection("users")
    .orderBy("handle")
    .startAt(req.params.handle)
    .endAt(req.params.handle + "\uf8ff")
    .get()
    .then((data: any) => {
      // Initial Results Data Array
      const results: Array<{ [k: string]: string }> = [];

      // Pushes Handles into Array
      data.forEach((doc: any) => {
        const userData: {[k: string]: string} = {
          handle: doc.data().handle,
          userName: doc.data().userName,
          imageURL: doc.data().imageURL
        };
        results.push(userData);
      });

      return res.status(200).json({ results });
    })
    .catch((err: any) => {
      // Returns Errors
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
