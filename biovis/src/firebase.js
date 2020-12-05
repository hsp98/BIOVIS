import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


  var firebaseConfig = {
    apiKey: "AIzaSyAqt50ORCfP0VknDxuq5F16N2XUbPDPEcs",
    authDomain: "biovis.firebaseapp.com",
    databaseURL: "https://biovis.firebaseio.com",
    projectId: "biovis",
    storageBucket: "biovis.appspot.com",
    messagingSenderId: "635873039623",
    appId: "1:635873039623:web:e67892327e943bb782a1a2",
    measurementId: "G-W98TGFFXGX"
  };

  
  
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();