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
  getColleges();

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

  /* Temporarily remove these
  $('#modal-verifyEmail').on('hidden.bs.modal', function (e) {
    $(this)
      .find("input")
         .val('')
         .css('border-color', '')
         .end()
  }).modal('show');
  $('#verifyEmail-message').css('display', 'none');

  */
  getColleges();
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

function getColleges()
{
  var database = firebase.database();
  var db = database.ref('colleges');
  db.on('value', getData, errData);
}


function getData(data)
{
  // bug currently the course appears after some seconds delay
  // try to find a way to pre-load before modal opens?
  var colleges = data.val();
  var keys = Object.keys(colleges);
  var selectCollege = document.getElementById('selectCollege');
  selectCollege.setAttribute("onChange", "selectCollegeOption(this)");
  selectCollege.innerHTML = "";

  for(var i = 0; i < keys.length; i++)  // gets college names initial populate of select
  {
    var option = keys[i];
    var o = document.createElement('option');
    o.setAttribute("data-abbr", colleges[keys[i]]["abbr"]);
    o.innerHTML = option;
    selectCollege.appendChild(o);
  }

  var keys2 = Object.keys(colleges[keys[0]]["programs"]);
  var selectCourse = document.getElementById('selectCourse');
  selectCourse.innerHTML = "";
  for(var i = 0; i < keys2.length; i++)
  {
    var option = colleges[keys[0]]["programs"][keys2[i]];
    var o = document.createElement('option');
    o.innerHTML = option;
    selectCourse.appendChild(o);
  }
  // abbreviation code snip
  // var colleges = data.val();
  // var keys = Object.keys(colleges);
  // var option = new Array();
  // var selectCollege = document.getElementById('selectCollege');
  // for(var i = 0; i < keys.length; i++)  // gets college abbrevation
  // {
  //   var option = colleges[keys[i]]["abbr"];
  //
  // }
}

function selectCollegeOption(x)  // refreshes the courses below
{
  for(var i = 0; i < x.childNodes.length; i++)
  {
    if(x.childNodes[i].innerHTML == x.value)
    {
      var abbreviation = x.childNodes[i].dataset.abbr;
      var database = firebase.database();
      var db = database.ref('colleges');
      db.on('value', function(data)
      {
         var keys = Object.keys(data.val());
        console.log(data);
        for(var i = 0; i < keys.length; i++)
        {
          var dbKey = data.val()[keys[i]]["abbr"];
          if(dbKey == abbreviation)
          {
            var courses = data.val()[keys[i]]['programs'];
            var keys2 = Object.keys(courses);
            console.log(keys2);
            var selectCourse = document.getElementById('selectCourse');
            selectCourse.innerHTML = "";
            for(var i = 0; i < keys2.length; i++)
            {
              var option = courses[keys2[i]];
              var o = document.createElement('option');
              o.innerHTML = option;
              selectCourse.appendChild(o);
            }
            break;
          }
        }
      });
      break;
    }
  }

}
function errData(err)
{
  console.console.log('Error!');
  console.log(err);
}

function performSignUp()
{
  var attended = false;
  var college = $('#signUp-college').val();
  var course = $('#signUp-course').val();
  var email = $('#signUp-email').val();
  var firstName = $('#signUp-firstName').val();
  var middleName = $('#signUp-middleName').val();
  var lastName = $('#signUp-lastName').val();
  var studentNumber = $('#signUp-studentNumber').val();
  var yearLevel = $('#signUp-yearLevel').val();
  var password = $('#signUp-password').val();
  var confirmPassword = $('#signUp-confirmPassword').val();

  /*
  var attended: false
  college: ""
  course: ""
  email: ""
  name{
    firstName: ""
    lastName: ""
    middleName: ""
    suffix: ""
  }
  studentNumber:""
  yearLevel:""
  */

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

            app_firebase.database().ref('USER/' + user.uid).set({
                attended: attended,
                college: college,
                course: course,
                email: email,
                name:{
                  firstName: firstName,
                  middleName: middleName,
                  lastName: lastName,
                },
                studentNumber: studentNumber,
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
