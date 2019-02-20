// var app_firebase = {};

// (function() {
//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyB2_7M04xa-U7Rem0awGnb7mAHnACdD24A",
//     authDomain: "qrsystem-for-lr-96084.firebaseapp.com",
//     databaseURL: "https://qrsystem-for-lr-96084.firebaseio.com",
//     projectId: "qrsystem-for-lr-96084",
//     storageBucket: "qrsystem-for-lr-96084.appspot.com",
//     messagingSenderId: "792275104984"
//   };
//   firebase.initializeApp(config);

//   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
//     .then(function() {
//       // Existing and future Auth states are now persisted in the current
//       // session only. Closing the window would clear any existing state even
//       // if a user forgets to sign out.
//       // ...
//       // New sign-in will be persisted with session persistence.
//       return firebase.auth().signInWithEmailAndPassword(email, password);
//     })
//     .catch(function(error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//     });

//   app_firebase = firebase;
// }());
