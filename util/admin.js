const admin = require("firebase-admin");
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

const serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = admin.firestore();

var firebaseConfig = {
  apiKey: "AIzaSyAGdVIdiuVe2kaCeg_BjyCXPPcL0x7gzqA",
  authDomain: "randomthoughts-137c6.firebaseapp.com",
  databaseURL: "https://randomthoughts-137c6.firebaseio.com",
  projectId: "randomthoughts-137c6",
  storageBucket: "randomthoughts-137c6.appspot.com",
  messagingSenderId: "659699113413",
  appId: "1:659699113413:web:5718b859c63d88f7e67fac",
  measurementId: "G-YYF17WEBP6",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

module.exports = { admin, db, firebase };
