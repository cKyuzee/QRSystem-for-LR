<!DOCTYPE html>
<html lang="en">

<head>
  <title> CCSLR &mdash; Registration</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <link href="https://fonts.googleapis.com/css?family=Amatic+SC:400,700|Work+Sans:300,400,700" rel="stylesheet">
  <link rel="stylesheet" href="fonts/icomoon/style.css">
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/magnific-popup.css">
  <link rel="stylesheet" href="css/jquery-ui.css">
  <link rel="stylesheet" href="css/owl.carousel.min.css">
  <link rel="stylesheet" href="css/owl.theme.default.min.css">
  <link rel="stylesheet" href="css/bootstrap-datepicker.css">
  <link rel="stylesheet" href="css/animate.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mediaelement@4.2.7/build/mediaelementplayer.min.css">
  <link rel="stylesheet" href="fonts/flaticon/font/flaticon.css">
  <link rel="stylesheet" href="css/aos.css">
  <link rel="stylesheet" href="css/style.css">
</head>

<body>
  <div class="site-wrap">

    <div class="site-mobile-menu">
      <div class="site-mobile-menu-header">
        <div class="site-mobile-menu-close mt-3">
          <span class="icon-close2 js-menu-toggle"></span>
        </div>
      </div>
      <div class="site-mobile-menu-body"></div>
    </div> <!-- .site-mobile-menu -->

    <div class="site-navbar-wrap js-site-navbar bg-white">
      <div class="container">
        <div class="site-navbar bg-light">
          <div class="py-1">
            <div class="row align-items-center">
              <div class="col-2">
                <h2 class="mb-0 site-logo"><a href="index.php">CCSLR</a></h2>
              </div>
              <div class="col-10">
                <nav class="site-navigation text-right" role="navigation">
                  <div class="container">
                    <!-- d-lg-none -->
                    <div class="d-inline-block  ml-md-0 mr-auto py-3"><a href="#" class="site-menu-toggle js-menu-toggle"><span class="icon-menu h3"></span></a></div>
                    <!-- d-lg-block -->
                    <ul class="site-menu js-clone-nav d-none">
                      <li><a href="index.php">Home</a></li>
                      <li class="active"><a href="registration.php">Registration</a></li>
                      <li><a href="speakers.php">Speakers</a></li>
                      <li><a href="venue.php">Venue</a></li>
                      <li><a href="about.php">About</a></li>

                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="site-blocks-cover overlay" style="background-image: url(images/others/loop.gif);" data-aos="fade" data-stellar-background-ratio="0.5">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-md-10 text-center" data-aos="fade">
            <h1 class="mb-4">REGISTRATION</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="site-section bg-light" id="register-form">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-7 mb-5">
            <div class="p-5 bg-white">
              <div class="row form-group">
                <div class="col-md-12 mb-3 mb-md-0">
                  <p>Please provide the following information.</p>
                </div>
              </div>
              <div class="ordinary-data">
                <div class="row form-group">
                  <div class="col-md-12 mb-3 mb-md-0">
                    <label class="font-weight-bold" for="register-firstName">First Name *</label>
                    <input type="text" id="register-firstName" class="form-control">
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-md-12 mb-3 mb-md-0">
                    <label class="font-weight-bold" for="register-middleName">Middle Name</label>
                    <input type="text" id="register-middleName" class="form-control">
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-md-12 mb-3 mb-md-0">
                    <label class="font-weight-bold" for="register-lastName">Last Name *</label>
                    <input type="text" id="register-lastName" class="form-control">
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-md-12 mb-3 mb-md-0">
                    <label class="font-weight-bold" for="register-suffix">Suffix</label>
                    <input type="text" id="register-suffix" class="form-control">
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-md-12 mb-3 mb-md-0">
                    <label class="font-weight-bold" for="register-suffix">Email Address *</label>
                    <input type="text" id="register-email" class="form-control">
                  </div>
                </div>
              </div>

              <div class="row form-group">
                <div class="col-md-12 mb-3 mb-md-0">
                  <label class="font-weight-bold" for="register-suffix">Delegate Type *</label>
                  <select id="select-delegateType" class="form-control" onchange="">
                    <option value="0" selected="">NEU Student</option>
                    <option value="1">NEU Alumni</option>
                    <option value="2">NEU Faculty</option>
                  </select>
                </div>
              </div>

              <!-- Start of Additional Student Information -->
              <div class="student-information">
                <div class="row form-group">
                  <div class="col-md-12 mb-3 mb-md-0">
                    <label class="font-weight-bold" for="register-college">College *</label>
                    <select id="select-studentCollege" class="form-control"></select>
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-md-12 mb-3 mb-md-0">
                    <label class="font-weight-bold" for="register-course">Program *</label>
                    <select id="select-studentProgram" class="form-control" onchange=""></select>
                  </div>
                </div>
              </div>
              <!-- End of Additional Student Information -->

              <!-- Start of Additional Alumni Information -->
              <div class="alumni-information" style="display:none">
                <div class="row form-group">
                  <div class="col-md-12">
                    <label class="font-weight-bold" for="register-studentNumber">Batch *</label>
                    <select id="select-alumniBatch" class="form-control" onchange="">
                      <option value="0" selected="">2017-2018</option>
                      <option value="1" selected="">2016-2017</option>
                      <option value="2" selected="">2015-2016</option>
                      <option value="3" selected="">2014-2015</option>
                      <option value="4" selected="">2013-2014</option>
                    </select>
                  </div>
                </div>
              </div>
              <!-- End of Additional Alumni Information -->

              <!-- Start of Additional Faculty Information -->
              <div class="faculty-information" style="display:none">
                <div class="row form-group">
                  <div class="col-md-12">
                    <label class="font-weight-bold" for="register-studentNumber">College *</label>
                    <select id="select-facultyCollege" class="form-control" onchange=""></select>
                  </div>
                </div>
              </div>
              <!-- End of Additional Faculty Information -->

              <div class="row form-group" id="div-data-terms-condition">
                <div class="col-md-12"><br>
                  <div class="">
                    <label class="font-weight-bold">Terms and Conditions</label>
                    <ol>
                      <li>I give consent to New Era University and its affiliates to use my personal details that I have provided to the University for the purpose of attendance monitoring for on-campus events.</li>
                      <li>I declare that the QR code which I am scanning for the purposes of registering my attendance to this event is the QR Code that is registered using my email address and is associated with my name.</li>
                      <li>I undertake NOT to provide, send, or otherwise communicate to others the QR Code issued to me for the purpose of registering my attendance in my absence or stead, or for any other purpose.</li>
                      <li>I accept that any breach of these conditions would attract the appropriate academic penalties.</li>
                    </ol>
                    <input id="cbDataPrivacyConsent" type="checkbox" name="cbDataPrivacyConsent" value=""> I agree to the stated terms and conditions*
                  </div>
                </div>
              </div>

              <div class="row form-group">
                <div class="col-md-12">
                  <p id="signUp-errorMessage" style="display:none"></p>
                  <button id="btnRegisterSubmit" class="btn btn-primary px-4 py-3 text-uppercase">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="py-5 quick-contact-info">
      <div class="container">
        <div class="row">
          <div class="col-md-4 text-center">
            <div>
              <span class="icon-room text-white h2 d-block"></span>
              <h2>Where</h2>
              <p class="mb-0">New Era University <br> Professional Schools Building Multi-purpose Hall</p>
            </div>
          </div>
          <div class="col-md-4 text-center">
            <div>
              <span class="icon-clock-o text-white h2 d-block"></span>
              <h2>When</h2>
              <p class="mb-0">February 26, 2019</p>
            </div>
          </div>
          <div class="col-md-4 text-center">
            <div>
              <span class="icon-comments text-white h2 d-block"></span>
              <h2>Email</h2>
              <p class="mb-0">leagueofresearchers_lr@outlook.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="site-footer" style="background-image: url('images/others/technology.gif');">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <h3 class="footer-heading mb-4 text-white">About</h3>
            <p>The seminar aims to teach the learning, failing, and successful experiences of professionals as a staple in Research and Development to the delegates.</p>
            <p><a href="about.php" class="btn btn-primary pill text-white px-4">Read More</a></p>
          </div>
          <div class="col-md-2">
            <div class="row">
              <div class="col-md-12">
                <h3 class="footer-heading mb-4 text-white">Quick Menu</h3>
                <ul class="list-unstyled">
                  <li><a href="index.php">Home</a></li>
                  <li><a href="speakers.php">About</a></li>
                  <li><a href="venue.php">Venue</a></li>
                  <li><a href="about.php">About</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="col-md-12">
              <img src="images/logos/logo-neu.png" width="30%">
              <img src="images/logos/logo-ccs.png" width="32%">
              <img src="images/logos/logo-lr.png" width="25%">
            </div>
          </div>
        </div>
      </div>
  </div>
  </footer>

  <!-- QR Code Modal -->
  <div class="modal fade" role="dialog" tabindex="-1" id="modal-showQRcode">
    <div class="modal-dialog align-center" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4>Successfully Registered</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <div>
            <div class="row modal-bodyRow">
              <div class="col-md-12 modal-bodyRow">
                <p>Please have a copy of this QR Code. It's your official ticket to enter the venue. </p>
                <div id=qrInformationHolder>
                  <div id="qrcode"></div>
                  <br>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script type="text/javascript" src="js/jquery.min.js"></script>
  <script type="text/javascript" src="js/qrcode.js"></script>
  <script type="text/javascript" src="js/qrcode.min.js"></script>

  <script src="js/jquery-3.3.1.min.js"></script>
  <script src="js/jquery-migrate-3.0.1.min.js"></script>
  <script src="js/jquery-ui.js"></script>
  <script src="js/popper.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="js/owl.carousel.min.js"></script>
  <script src="js/jquery.stellar.min.js"></script>
  <script src="js/jquery.countdown.min.js"></script>
  <script src="js/jquery.magnific-popup.min.js"></script>
  <script src="js/bootstrap-datepicker.min.js"></script>
  <script src="js/aos.js"></script>

  <script src="js/mediaelement-and-player.min.js"></script>

  <script src="js/main.js"></script>
  <script src="js/registration.js"></script>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      var mediaElements = document.querySelectorAll('video, audio'),
        total = mediaElements.length;

      for (var i = 0; i < total; i++) {
        new MediaElementPlayer(mediaElements[i], {
          pluginPath: 'https://cdn.jsdelivr.net/npm/mediaelement@4.2.7/build/',
          shimScriptAccess: 'always',
          success: function() {
            var target = document.body.querySelectorAll('.player'),
              targetTotal = target.length;
            for (var j = 0; j < targetTotal; j++) {
              target[j].style.visibility = 'visible';
            }
          }
        });
      }
    });
  </script>

</body>

</html>
