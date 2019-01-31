jQuery(document).ready(function($) {
  let qrcode = new QRCode(document.getElementById("qrcode"), {
    width: 200,
    height: 200
  });

  $('#select-delegateType').change(function (){
    let type = "";
    $('#select-delegateType option:selected').each(function (){
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
    $('#modal-showQRcode').modal().show();

    // if successfully registered, present qr code :
    let value = "League of Researchers";
    qrcode.makeCode(value);
    $('#txtQRCode').html(value);
  });
});
