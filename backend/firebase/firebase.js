// config/firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./path/al/archivo/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = db;
