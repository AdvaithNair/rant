import * as admin from "firebase-admin";

// Initialize Admin
admin.initializeApp();

// Initialize Firestore Database
const db: FirebaseFirestore.Firestore = admin.firestore();

// Exports Admin and DB Constants
module.exports = { admin, db };