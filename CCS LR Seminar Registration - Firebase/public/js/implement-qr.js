var qrcode = {};

(function() {
  var code = new QRCode(document.getElementById("qrcode"), {
    width: 200,
    height: 200
  });

  qrcode = code;
}());
