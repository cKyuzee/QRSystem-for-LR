jQuery(document).ready(function($) {
  var qrcode = new QRCode(document.getElementById("qrcode"), {
    width: 200,
    height: 200
  });


  $('#btnRegisterSubmit').click(function() {
    $('#modal-showQRcode').modal().show();

    // if successfully registered, present qr code :
    let value = "League of Researchers";
    qrcode.makeCode(value);
    $('#txtQRCode').html(value);
  });
});
