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
// TODO: Try to fix the default value (keep error handling if possible)
exports.getFeed = (req: express.Request, res: express.Response) => {
  const followingArray: Array<string> = [];
  let rants: FirebaseFirestore.DocumentData[] = [];

  // Returns User Information from Database
  db.doc(`/users/${req.user.handle}`)
    .get()
    .then((doc: any) => {
      // Gets Information
      if (doc.exists) {
        // Stores About Information to User Information Object
        const followingArrayFull: Array<any> = doc.data().following;

        if (followingArrayFull.length > 0)
          followingArrayFull.forEach((e: any) => followingArray.push(e.handle));
        else followingArray.push("rant");

        // Gets Rants Of Following Users
        return db
          .collection("rants")
          .where("handle", "in", followingArray)
          .where("isPrivate", "==", false)
          .orderBy("createdAt", "desc")
          .limit(50)
          .get();
      }
    })
    .then((data: any | undefined) => {
      // Add Documents to Array
      if (data.size !== 0) {
        data.forEach((doc: any) => {
          rants.push({
            ...doc.data(),
            rantID: doc.id
          });
        });
      }

      // Return Array
      return db
        .collection("rants")
        .where("userID", "==", req.user.uid)
        .orderBy("createdAt", "desc")
        .get();
    })
    .then((data: any | undefined) => {
      // Add Documents to Array
      if (data.size !== 0) {
        data.forEach((doc: any) => {
          rants.push({
            ...doc.data(),
            rantID: doc.id
          });
        });
      }

      rants.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : 1)

      // Return Array
      return res.json(rants);
    })
    .catch((err: any) => {
      // Returns Errors
      console.error(err);
      /*return res.json({
        rants: [
          {
            title: "No Rants Available",
            body: "Follow your friends to see their rants on your feed!",
            rantID: "6HFkW57zYVRfr0Dq2D4W",
            userName: "Rant",
            userID: "zGK5Za10wkRUCRxCk3CXLzPrw1F3",
            handle: "rant",
            likeCount: 0,
            commentCount: 0,
            rantverseScore: 0,
            isPrivate: false,
            createdAt: "2020-06-15T12:09:57.716Z",
            imageURL:
              "https://firebasestorage.googleapis.com/v0/b/rant-dd853.appspot.com/o/rant.png?alt=media"
          }
        ]
      });*/
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
        const userData: { [k: string]: string } = {
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
