import * as admin from "firebase-admin";

// Initialize Admin
admin.initializeApp();

// Initialize Firestore Database
const db: FirebaseFirestore.Firestore = admin.firestore();

module.exports = { admin, db };