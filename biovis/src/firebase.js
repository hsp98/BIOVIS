import firebase from 'firebase'
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

  var fire = firebase.initializeApp(firebaseConfig);
  export default fire;
  