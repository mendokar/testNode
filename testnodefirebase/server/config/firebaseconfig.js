const firebase = require("firebase");
const storage = require("firebase/storage");
const admin = require("firebase-admin");

require("firebase/app");
require("firebase/auth");
require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyB08PhztVD3OrkJJNW4ZBbi90rfPE-XKhk",
  authDomain: "subir-imagen-d898d.firebaseapp.com",
  databaseURL: "https://subir-imagen-d898d.firebaseio.com",
  projectId: "subir-imagen-d898d",
  storageBucket: "subir-imagen-d898d.appspot.com",
  messagingSenderId: "175175578651",
  appId: "1:175175578651:web:3f2bc8f101a980ccd774be",
  measurementId: "G-KZ6MVX29MJ",
};

firebase.initializeApp(firebaseConfig);

module.exports = firebase;

// var serviceAccount = require("../../subir-imagen-d898d-firebase-adminsdk-5iax4-461339a17f.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://subir-imagen-d898d.firebaseio.com",
//   storageBucket: "subir-imagen-d898d.appspot.com",
// });

// module.exports = admin;
