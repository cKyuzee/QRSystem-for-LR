var app_firebase = {};

(function(){
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCtqD2QnfWN1zk-XdN9QcS59vk1MzJcXKc",
      authDomain: "rice-yield-forecast.firebaseapp.com",
      databaseURL: "https://rice-yield-forecast.firebaseio.com",
      projectId: "rice-yield-forecast",
      storageBucket: "rice-yield-forecast.appspot.com",
      messagingSenderId: "79366616240"
    };
    firebase.initializeApp(config);

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function() {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });

    app_firebase = firebase;
}());
