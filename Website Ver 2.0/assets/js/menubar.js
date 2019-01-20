performInitialization();

function performInitialization() {
  app_firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $('#signButton').text('Sign Out');
      initializeAnalytics();
      checkVerifiedUser();
    } else {
      showSignInModal();
    }
  });
}

function initializeAnalytics() {
  var uid = app_firebase.auth().currentUser.uid;
  app_firebase.database().ref('users/' +uid).once('value').then(function(snapshot) {
      showAnalytics(snapshot.val().userType == 'admin');
  });
}

function showSignInModal() {
  $('#modal-signIn').on('hidden.bs.modal', function (e) {
    $(this)
      .find("input")
         .val('')
         .css('border-color', '')
         .end()
    $('#signIn-completeMessage').css('display', 'none');
  }).modal('show');
}

function showRecoverPasswordModal() {
  $('#modal-forgotPassword').on('hidden.bs.modal', function (e) {
    $(this)
      .find("input")
         .val('')
         .css('border-color', '')
         .end()
    $('#forgotPassword-completeMessage').css('display', 'none');
  }).modal('show');
}

function showSignUpModal() {
  $('#modal-signUp').on('hidden.bs.modal', function (e) {
    $(this)
      .find("input")
         .val('')
         .css('border-color', '')
         .end()
    $('#signUp-completeMessage').css('display', 'none');
  }).modal('show');
}

function showVerifyEmailModal() {
  $('#modal-verifyEmail').on('hidden.bs.modal', function (e) {
    $(this)
      .find("input")
         .val('')
         .css('border-color', '')
         .end()
  }).modal('show');
  $('#verifyEmail-message').css('display', 'none');
}

function showSignUpVerifyEmailSentModal() {
  $('#modal-signUpVerifyEmailSent').on('hidden.bs.modal', function (e) {
    $(this)
      .find("input")
         .val('')
         .css('border-color', '')
         .end()
  }).modal('show');

  setTimeout(function() {
    $('#modal-signUpVerifyEmailSent').modal('hide');
  }, 1000);
}

function showAnalytics(bool) {
    $('#btnAnalytics').css('display', (bool)? 'block' : 'none');
}

function showUnverified(bool) {
    $('#unverifiedli').css('display', (bool)? 'block' : 'none');
}

function clickSignButton() {
  if($('#signButton').text() == 'Sign In')
    showSignInModal();
  else {
    $('#signButton').text('Sign In');
    performSignOut();
  }
}

function sendEmailVerification() {
  // use "firebase.auth().currentUser.emailVerified" or "user.emailVerified" (returns boolean) to check for email verification
  app_firebase.auth().currentUser.sendEmailVerification().then(function(){
    $('#verifyEmail-message').css('display', 'block');
    setTimeout(function() {
      $('#modal-verifyEmail').modal('hide');
    }, 1000);
  }).catch(function(error) {
    console.log(error);
  })
}

function checkVerifiedUser() {
  console.log(app_firebase.auth().currentUser.emailVerified);
  if (app_firebase.auth().currentUser.emailVerified) {
    showUnverified(false);
  }
  else {
    showUnverified(true);
  }
}

function performSignIn() {
  var email = $('#signIn-email').val();
  var password = $('#signIn-password').val();

  if(email && password) {

    app_firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      $('#signIn-completeMessage').text('Invalid Credentials. Please try again.').css('display', 'block');
    });

    app_firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        $('#modal-signIn').modal('hide');
        $('#signButton').text('Sign Out');

        initializeAnalytics();
      }
    });
  }
  else {
    (!email)
      ? $('#signIn-email').css('border-color', 'red')
      : $('#signIn-email').css('border-color', '');

    (!password)
      ? $('#signIn-password').css('border-color', 'red')
      : $('#signIn-password').css('border-color', '');

    $('#signIn-completeMessage').text('Please complete all the fields.').css('display', 'block');
  }
}

function performRecoverPassword(){
  var email = $('#forgotPassword-email').val();
  var indexDotHtml = window.location.href;
  var actionCodeSettings = {
      url: indexDotHtml,
      handleCodeInApp: false
    }

  if(email) {

    app_firebase.auth().sendPasswordResetEmail(email, actionCodeSettings).then(function() {
      $('#forgotPassword-completeMessage').text('Link sent. Please check your email.').css('display', 'block');
      $('#modal-forgotPassword').modal('hide');
    }).catch(function(error){
      $('#forgotPassword-completeMessage').text('Invalid email. Please try again.').css('display', 'block');
    });
  }
  else {
    (!email)
      ? $('#forgotPassword-email').css('border-color', 'red')
      : $('#forgotPassword-email').css('border-color', '');

    $('#signIn-completeMessage').text('Please complete all the fields.').css('display', 'block');
  }
}

function performSignOut(){
  app_firebase.auth().signOut().then(function() {
    showAnalytics(false);
    window.location.replace('index.html');
  }).catch(function(error) {
    console.log(error);
  });
}

function checkForNumbers(input){
  if(!/^[a-zA-Z]*$/g.test(input)){
    return true         //true means there is a number
  }
  else {
    return false
  }
}

function performSignUp() {
  var firstName = $('#signUp-firstName').val();
  var middleName = $('#signUp-middleName').val();
  var lastName = $('#signUp-lastName').val();
  var email = $('#signUp-email').val();
  var password = $('#signUp-password').val();
  var confirmPassword = $('#signUp-confirmPassword').val();

// Middlename should be optional? (removed && middleName)
  if(firstName && lastName && email && password && confirmPassword){
    if(password == confirmPassword){

      //check for numerals in the Names
      if (checkForNumbers(firstName) || checkForNumbers(middleName) || checkForNumbers(lastName)) {
        checkForNumbers(firstName)
        ? $('#signUp-firstName').css('border-color', 'red')
        : $('#signUp-firstName').css('border-color', '');

        checkForNumbers(middleName)
        ? $('#signUp-middleName').css('border-color', 'red')
        : $('#signUp-middleName').css('border-color', '');

        checkForNumbers(lastName)
        ? $('#signUp-lastName').css('border-color', 'red')
        : $('#signUp-lastName').css('border-color', '');

        $('#signUp-completeMessage').text('Numbers are not allowed in the Name fields.').css('display', 'block');
      }
      //end check
      else {
        app_firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            $('#signUp-completeMessage').text(error.message).css('display', 'block');
        });

        app_firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            $('#modal-signUp').modal('hide');
            $('#signButton').text('Sign Out');
            sendEmailVerification();
            showSignUpVerifyEmailSentModal();

            app_firebase.database().ref('users/' + user.uid).set({
                email: email,
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                userType: 'viewer'
            });
          }
        });
      }
    }
    else {
      $('#signUp-password').css('border-color', 'red');
      $('#signUp-confirmPassword').css('border-color', 'red');
      $('#signUp-completeMessage').text('Retype the password for confirmation.').css('display', 'block');
    }
  }
  else {
    (!firstName)
      ? $('#signUp-firstName').css('border-color', 'red')
      : $('#signUp-firstName').css('border-color', '');

    // (!middleName)
    //   ? $('#signUp-middleName').css('border-color', '')
    //   : $('#signUp-middleName').css('border-color', '');

    (!lastName)
      ? $('#signUp-lastName').css('border-color', 'red')
      : $('#signUp-lastName').css('border-color', '');

    (!email)
      ? $('#signUp-email').css('border-color', 'red')
      : $('#signUp-email').css('border-color', '');

    (!password)
      ? $('#signUp-password').css('border-color', 'red')
      : $('#signUp-password').css('border-color', '');

    (!confirmPassword)
      ? $('#signUp-confirmPassword').css('border-color', 'red')
      : $('#signUp-confirmPassword').css('border-color', '');

    $('#signUp-completeMessage').text('Please complete all the fields.').css('display', 'block');
  }
}
