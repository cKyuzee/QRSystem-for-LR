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
    // $('#modal-showQRcode').modal().show();
    verifyInputs($('#select-delegateType option:selected').text());

    // if successfully registered, present qr code :
    // let value = "League of Researchers";
    // qrcode.makeCode(value);
    // $('#txtQRCode').html(value);
  });

  $('#select-studentCollege').change(function (){
    $('#select-studentProgram').empty();

    let college = $('#select-studentCollege option:selected').text();
    app_firebase.database().ref('colleges/'+college+"/programs").on('value', programs => {
      programs.forEach( program => {
        $('#select-studentProgram').append($('<option>', {
          value: program.key,
          text: program.val()
        }));
      });
    });
  });

  function verifyInputs(type) {
    let firstName = $('#register-firstName').val();
    let middleName = $('#register-middleName').val();
    let lastName = $('#register-lastName').val();
    let suffix = $('#register-suffix').val();
    let email = $('#register-email').val();
    let userKey = "";

    if (firstName && middleName && lastName && email && verifyAdditionalInputs(type)) {
      if(type === "NEU Student") {
        userKey = app_firebase.database().ref('users/'+type).push({
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
          studentNumber: $('#register-studentNumber').val()
        }).getKey();
      }
      else if(type === "NEU Alumni") {
        userKey = app_firebase.database().ref('users/'+type).push({
          attended: false,
          batch: $('#select-alumniBatch option:selected').text(),
          email: email,
          name: {
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            suffix: suffix
          }
        }).getKey();
      }
      else{
        userKey = app_firebase.database().ref('users/'+type).push({
          attended: false,
          college: $('#select-facultyCollege option:selected').text(),
          email: email,
          name: {
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            suffix: suffix
          }
        }).getKey();
      }

      if(userKey) {
        qrcode.makeCode(userKey);
        $('#txtQRCode').html(userKey);
        $('#modal-showQRcode').modal().show();
      }
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
      programs.forEach( program => {
        $('#select-studentProgram').append($('<option>', {
          value: program.key,
          text: program.val()
        }));
      })
    });
  }
});
