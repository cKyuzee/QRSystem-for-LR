jQuery(document).ready(function($) {
  performFillSelectCollege();
  performFillDefaultSelectProgram();

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
    app_firebase.database().ref('colleges/' + college + "/programs").on('value', programs => {
      programs.forEach(program => {
        $('#select-studentProgram').append($('<option>', {
          value: program.key,
          text: program.val()
        }));
      });
    });
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

    if (firstName && middleName && lastName && email && verifyAdditionalInputs(type)) {
      if ($('#cbDataPrivacyConsent').is(':checked')) {

        //check for letters in student number
        if (checkForLetters($.trim($('#register-studentNumber').val()))) {
          $('#signUp-errorMessage')
            .text('Invalid Student Number.')
            .show(100);
        } else {

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

            app_firebase.auth().createUserWithEmailAndPassword(email, 'default').then(function(user) {

              if (type === "NEU Student") {
                userKey = app_firebase.database().ref('users').push({
                  attended: false,
                  college: $('#select-studentCollege option:selected').text(),
                  program: $('#select-studentProgram option:selected').text(),
                  email: email,
                  name: {
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                    suffix: suffix
                  },
                  studentNumber: $.trim($('#register-studentNumber').val()),
                  type: type,
                  registeredTimestamp: {
                    date: dateTime[0],
                    time: dateTime[1]
                  },
                  attendedTimestamp: {
                    date: "",
                    time: ""
                  }
                }).getKey();
              } else if (type === "NEU Alumni") {
                userKey = app_firebase.database().ref('users').push({
                  attended: false,
                  batch: $('#select-alumniBatch option:selected').text(),
                  email: email,
                  name: {
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                    suffix: suffix
                  },
                  type: type,
                  registeredTimestamp: {
                    date: dateTime[0],
                    time: dateTime[1]
                  },
                  attendedTimestamp: {
                    date: "",
                    time: ""
                  }
                }).getKey();
              } else {
                userKey = app_firebase.database().ref('users').push({
                  attended: false,
                  college: $('#select-facultyCollege option:selected').text(),
                  email: email,
                  name: {
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                    suffix: suffix
                  },
                  type: type,
                  registeredTimestamp: {
                    date: dateTime[0],
                    time: dateTime[1]
                  },
                  attendedTimestamp: {
                    date: "",
                    time: ""
                  }
                }).getKey();
              }
              //clears all entries
              $('#register-form :input')
                .each(function() {
                  $(this)
                    .css('border-color', '')
                    .val("");
                });
              if (userKey) {
                qrcode.makeCode(userKey);
                $('#modal-showQRcode').modal().show();
              }
            }, function(error) {
              $('#signUp-errorMessage')
                .text(error.message)
                .show(100);
            });
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
        .not("#register-suffix")
        .each(function() {
          let value = $(this).val();
          if (value)
            $(this).css('border-color', '');
          else
            $(this).css('border-color', 'red');
        });
    }
  }

  function verifyAdditionalInputs(type) {
    if (type === "NEU Student") {
      let studentNumber = $('#register-studentNumber').val();
      let college = $('#select-studentCollege option:selected').text();
      let program = $('#select-studentProgram option:selected').text();

      return (studentNumber && college && program)
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
    app_firebase.database().ref('colleges').on('value', colleges => {
      colleges.forEach(college => {
        $('#select-studentCollege').append($('<option>', {
          value: college.key,
          text: college.key
        }));
        $('#select-facultyCollege').append($('<option>', {
          value: college.key,
          text: college.key
        }));
      });
    });
  }

  function performFillDefaultSelectProgram() {
    app_firebase.database().ref('colleges/College of Accountancy/programs').on('value', programs => {
      programs.forEach(program => {
        $('#select-studentProgram').append($('<option>', {
          value: program.key,
          text: program.val()
        }));
      })
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
