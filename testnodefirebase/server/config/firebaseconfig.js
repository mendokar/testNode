const firebase = require('firebase');
const storage = require('firebase/storage');
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };

  firebase.initializeApp(firebaseConfig);

  module.exports = firebase;