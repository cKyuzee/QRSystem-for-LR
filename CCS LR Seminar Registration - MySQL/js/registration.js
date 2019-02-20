jQuery(document).ready(function($) {
  performFillSelectCollege();


  let qrcode = new QRCode(document.getElementById("qrcode"), {
    width: 200,
    height: 200
  });

  $('#select-delegateType').change(function() {
    let type = "";
    $('#select-delegateType option:selected').each(function() {
      type = $(this).text();
    });

    switch (type) {
      case "NEU Student":
        $('.student-information').show(500);
        $('.alumni-information').hide(500);
        $('.faculty-information').hide(500);
        break;
      case "NEU Alumni":
        $('.alumni-information').show(500);
        $('.student-information').hide(500);
        $('.faculty-information').hide(500);
        break;
      case "NEU Faculty":
        $('.student-information').hide(500);
        $('.alumni-information').hide(500);
        $('.faculty-information').show(500);
        break;
      default:
    }
  });

  $('#btnRegisterSubmit').click(function() {
    verifyInputs($('#select-delegateType option:selected').text());
  });

  $('#select-studentCollege').change(function() {
    $('#select-studentProgram').empty();
    let college = $('#select-studentCollege option:selected').text();
    fillProgramBySelectedCollege(college);
  });

  function checkForNumbers(input, isSuffix) {
    if (!/^[a-zA-Z ]*$/g.test(input) && !isSuffix) {
      return true //true means there is a number
    } else if (!/^[a-zA-Z ]*$/g.test(input) && isSuffix && input.length > 0) {
      return true
    } else {
      return false
    }
  }

  function checkForLetters(input) {
    if (!/^[0-9\-+]*$/g.test(input)) {
      return true //true means there is a letter
    } else {
      return false
    }
  }

  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function verifyInputs(type) {
    let firstName = $.trim($('#register-firstName').val());
    let middleName = $.trim($('#register-middleName').val());
    let lastName = $.trim($('#register-lastName').val());
    let suffix = $.trim($('#register-suffix').val());
    let email = $.trim($('#register-email').val());
    let dateTime = getDateTime();
    let userKey = "";
     console.log("what the hell you doing loc");
    console.log(firstName, middleName, lastName, suffix, email, dateTime, verifyAdditionalInputs(type));
     // verifyAdditionalInputs(type);
    if (firstName && lastName && email && verifyAdditionalInputs(type)) {
      if ($('#cbDataPrivacyConsent').is(':checked')) {

        //check for letters in student number
        // we don't require student numbers anymore
        // if (checkForLetters($.trim($('#register-studentNumber').val()))) {
        //   $('#signUp-errorMessage')
        //     .text('Invalid Student Number.')
        //     .show(100);
        if (false) // just a temp block clean up this code at some point
        {
        }
        else
        {

          //check for numerals in the Names
          if (checkForNumbers(firstName, false) || checkForNumbers(middleName, false) || checkForNumbers(lastName, false) || checkForNumbers(suffix, true)) {
            checkForNumbers(firstName, false) ?
              $('#register-firstName').css('border-color', 'red') :
              $('#register-firstName').css('border-color', '');

            checkForNumbers(middleName, false) ?
              $('#register-middleName').css('border-color', 'red') :
              $('#register-middleName').css('border-color', '');

            checkForNumbers(lastName, false) ?
              $('#register-lastName').css('border-color', 'red') :
              $('#register-lastName').css('border-color', '');

            checkForNumbers(suffix, true) ?
              $('#register-suffix').css('border-color', 'red') :
              $('#register-suffix').css('border-color', '');

            alert('Numbers are not allowed in the Name fields.');
          }
          //end check
          else {
            /*

                Make the app_firebase things below have an ajax php equivalent.
                use registration_DB.php

              */
            // validate email address
            if(validateEmail(email)) // if it's good
            {
              var duplicate = false;
              // check if email exists
              $.post("ajax/registration_DB.php", {func:'checkDupEmail', email:email}, function(data)
              {
                console.log(data);
                if(data == "1")
                {
                  // throw the error
                  console.log("Duplicated Email Detected");
                  duplicate = true;
                   $('#signUp-errorMessage')
                    .text('Email address provided is already in use.')
                    .show(100);

                  $('#register-form :input')
                    .not("#register-suffix").not("#register-middleName")
                    .each(function() {
                      let value = $(this).val();
                      if (value)
                        $(this).css('border-color', '');
                      else
                        $(this).css('border-color', 'red');
                    });
                }
                else if(data == 2) // for now we identify this state as good
                {
                  duplicate = false;
                }
              });
console.log("userkey");
              if(!duplicate)
              {
console.log("userke2");
                if (type === "NEU Student") {
                  // generate a QR Code here.
                  // userKey = app_firebase.database().ref('users').push({
                  //   attended: false,
                  //   ... snip ...
                  //     time: ""
                  //   }
                  // }).getKey();
                  var registrant = new Object();
                  registrant.attended = false;
                  registrant.college = $('#select-studentCollege option:selected').text();
                  registrant.program = $('#select-studentProgram option:selected').text();
                  registrant.email = email;
                  registrant.firstName = firstName;
                  registrant.middleName = middleName;
                  registrant.lastName = lastName;
                  registrant.suffix = suffix;
                  registrant.type = type;
                  registrant.registeredDate = dateTime[0];
                  registrant.registeredTime = dateTime[1];
                  registrant.attendedDate = "";
                  registrant.attendedTime = "";
                  registrant.QRCode = generateQRCode(firstName, lastName, email, registrant.registeredTime);// generate qr code here
                  userKey = registrant.QRCode;
                  console.log("userkey");
                  console.log(userKey);
                  // execute that command up in here
                  var encoded_registrant = JSON.stringify(registrant);
                  $.post("ajax/registration_DB.php", {func:'registerUser', registrant:encoded_registrant}, function(data)
                  {
                    console.log(data);
                    if(data.includes("0"))  // we good
                    {

                    }
                  });
                }
                else if (type === "NEU Alumni")
                {
                  var registrant = new Object();
                  registrant.attended = false;
                  registrant.email = email;
                  registrant.batch = $('#select-alumniBatch option:selected').text();
                  registrant.firstName = firstName;
                  registrant.middleName = middleName;
                  registrant.lastName = lastName;
                  registrant.suffix = suffix;
                  registrant.type = type;
                  registrant.registeredDate = dateTime[0];
                  registrant.registeredTime = dateTime[1];
                  registrant.attendedDate = "";
                  registrant.attendedTime = "";
                  registrant.QRCode = generateQRCode(firstName, lastName, email, registrant.registeredTime);// generate qr code here
                  userKey = registrant.QRCode;
                  // execute that command up in here
                  var encoded_registrant = JSON.stringify(registrant);
                  $.post("ajax/registration_DB.php", {func:'registerUser', registrant:encoded_registrant}, function(data)
                  {
                    console.log(data);
                    if(data.includes("0"))  // we good
                    {

                    }
                  });


                }
                else  // faculty
                {
                  var registrant = new Object();
                  registrant.attended = false;
                  registrant.email = email;
                  registrant.firstName = firstName;
                  registrant.middleName = middleName;
                  registrant.lastName = lastName;
                  registrant.suffix = suffix;
                  registrant.collegeCode = $('#select-facultyCollege option:selected').text();
                  registrant.type = type;
                  registrant.registeredDate =dateTime[0];
                  registrant.registeredTime =  dateTime[1];
                  registrant.attendedDate = "";
                  registrant.attendedTime = "";
                  registrant.QRCode = generateQRCode(firstName, lastName, email, registrant.registeredTime);// generate qr code here
                  userKey = registrant.QRCode;
                  // execute that command up in here
                  var encoded_registrant = JSON.stringify(registrant);
                  $.post("ajax/registration_DB.php", {func:'registerUser', registrant:encoded_registrant}, function(data)
                  {
                    console.log(data);
                    if(data.includes("0"))  // we good
                    {

                    }
                  });


                }

                //clears all entries
                $('#register-form input')
                  .each(function() {
                    $(this)
                      .css('border-color', '')
                      .val("");
                  });
                $('#cbDataPrivacyConsent').prop("checked", false);
                if (userKey) {
                  qrcode.makeCode(userKey);
                  $('#modal-showQRcode').modal().show();
                }
              }

            }
            else // if it's bad
            {
              $('#signUp-errorMessage').text("Invalid Email Address").show(100);
              $('#register-email').css('border-color', 'red');
            }

          }
        }

      } else {
        $('#signUp-errorMessage')
          .text('Please check the Data Privacy Consent agreement.')
          .show(100);
      }
    } else {
      $('#signUp-errorMessage')
        .text('Please fill all required fields.')
        .show(100);

      $('#register-form :input')
        .not("#register-suffix").not("#register-middleName")
        .each(function() {
          let value = $(this).val();
          if (value)
            $(this).css('border-color', '');
          else
            $(this).css('border-color', 'red');
        });
    }
  }


  function generateQRCode(fname,lname,email,dateTime) // put functions in here containing such algorithm
  {
      var QR = "";
      if(fname.length > 1)
        QR += (Math.random() > 0.5) ? fname.substring(0,1) : fname.substring(1,2);
      else
        QR += fname.substring(0,1);

      if(lname.length > 1)
        QR += (Math.random() > 0.5) ? lname.substring(0,1) : lname.substring(1,2);
      else
        QR += lname.substring(0,1);

      if(email.length > 1)
        QR += (Math.random() > 0.5) ? email.substring(0,1) : email.substring(1,2);
      else
        QR += email.substring(0,1);

      QR += dateTime.toString();

      return QR;
  }

  function verifyAdditionalInputs(type) {
    if (type === "NEU Student") {
      let college = $('#select-studentCollege option:selected').text();
      let program = $('#select-studentProgram option:selected').text();

      return (college && program);

    } else if (type === "NEU Alumni") {
      let alumniBatch = $('#select-alumniBatch option:selected').text();
      return (alumniBatch) ? true : false;

    } else {
      let facultyCollege = $('#select-facultyCollege option:selected').text();
      return (facultyCollege) ? true : false;
    }
    return false;
  }

  function performFillSelectCollege() {

    $.post("ajax/registration_DB.php", {func:"getColleges"}, function(data)
    {
      var colleges = JSON.parse(data);

      for(var key in colleges)
      {
        $('#select-studentCollege').append($('<option>', {
          value: key,
          text: colleges[key]['college']
        }));
        $('#select-facultyCollege').append($('<option>', {
          value: key,
          text: colleges[key]['collegeCode']
        }));
      }
      fillProgramBySelectedCollege($('#select-studentCollege option:selected').text());
    });

  }

  function fillProgramBySelectedCollege(collegeCode) {
    $.post("ajax/registration_DB.php", {func:"getPrograms", collegecode:collegeCode}, function(data)
    {
      var programs = JSON.parse(data);
      for(var key in programs)
      {
        $('#select-studentProgram').append($('<option>', {
          value: key,
          text: programs[key]['ProgramName']
        }));
      }
    });
  }

  function getDateTime() {
    var now = new Date();

    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();

    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    if (month.toString().length == 1) {
      month = '0' + month;
    }
    if (day.toString().length == 1) {
      day = '0' + day;
    }
    if (hour.toString().length == 1) {
      hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
      minute = '0' + minute;
    }
    if (second.toString().length == 1) {
      second = '0' + second;
    }

    var dateTime = year + '-' + month + '-' + day + '*' + hour + ':' + minute + ':' + second;
    return dateTime.split('*');
  }

});
