const csv = require('csvtojson');
const mail = require('@sendgrid/mail');
mail.setApiKey('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')
const website = 'https://neufair-2019.firebaseapp.com'
var email_array = [
  "neufairofficial2019@gmail.com",
  "neufair@gmail.com",//g
  "neufair2019attendance@gmail.com",//g
  "neufair2019@gmail.com",
  "alabneu2019@gmail.com",
  "alabneu@gmail.com",//g
  "newerauniversityfair@gmail.com",
  "2019neufair@gmail.com",
  "2k19neufair@gmail.com",
  "neufairszxc@gmail.com",
  "neumail2019@gmail.com"
];
var api_array = [
  "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",
  "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",
  "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",
];
// var api_array = [
//   "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",
//   "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",
//   "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",
//   "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",
// ];

var ctr = 0;
var api_ctr = 0;
var error_array = [];
csv().fromFile('data5_online.csv').then((json) => {
    let i = 0;
    var email = "";

    const sendMessage = function () {
        let recipient_data = json[i];
        let recipient_email = recipient_data[5];
        email = recipient_email;
        let recipient_name = recipient_data[1];
        let recipient_code = recipient_data[6];
        var email_content = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <!-- If you delete this meta tag, Half Life 3 will never be released. -->
        <meta name="viewport" content="width=device-width" />

        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>ZURBemails</title>

        <style>
        /* -------------------------------------
        		GLOBAL
        ------------------------------------- */
        * {
        	margin:0;
        	padding:0;
        }
        * { font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif; }

        img {
        	max-width: 100%;
        }
        .collapse {
        	margin:0;
        	padding:0;
        }
        body {
        	-webkit-font-smoothing:antialiased;
        	-webkit-text-size-adjust:none;
        	width: 100%!important;
        	height: 100%;
        }


        /* -------------------------------------
        		ELEMENTS
        ------------------------------------- */
        a { color: #2BA6CB;}

        .btn {
        	text-decoration:none;
        	color: #FFF;
        	background-color: #666;
        	padding:10px 16px;
        	font-weight:bold;
        	margin-right:10px;
        	text-align:center;
        	cursor:pointer;
        	display: inline-block;
        }

        p.callout {
        	padding:15px;
        	background-color:#ECF8FF;
        	margin-bottom: 15px;
        }
        .callout a {
        	font-weight:bold;
        	color: #2BA6CB;
        }

        table.social {
        /* 	padding:15px; */
        	background-color: #ebebeb;

        }
        .social .soc-btn {
        	padding: 3px 7px;
        	font-size:12px;
        	margin-bottom:10px;
        	text-decoration:none;
        	color: #FFF;font-weight:bold;
        	display:block;
        	text-align:center;
        }
        a.fb { background-color: #3B5998!important; }
        a.tw { background-color: #1daced!important; }
        a.gp { background-color: #DB4A39!important; }
        a.ms { background-color: #000!important; }

        .sidebar .soc-btn {
        	display:block;
        	width:100%;
        }

        /* -------------------------------------
        		HEADER
        ------------------------------------- */
        table.head-wrap { width: 100%;}

        .header.container table td.logo { padding: 15px; }
        .header.container table td.label { padding: 15px; padding-left:0px;}


        /* -------------------------------------
        		BODY
        ------------------------------------- */
        table.body-wrap { width: 100%;}


        /* -------------------------------------
        		FOOTER
        ------------------------------------- */
        table.footer-wrap { width: 100%;	clear:both!important;
        }
        .footer-wrap .container td.content  p { border-top: 1px solid rgb(215,215,215); padding-top:15px;}
        .footer-wrap .container td.content p {
        	font-size:10px;
        	font-weight: bold;

        }


        /* -------------------------------------
        		TYPOGRAPHY
        ------------------------------------- */
        h1,h2,h3,h4,h5,h6 {
        font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; line-height: 1.1; margin-bottom:15px; color:#000;
        }
        h1 small, h2 small, h3 small, h4 small, h5 small, h6 small { font-size: 60%; color: #6f6f6f; line-height: 0; text-transform: none; }

        h1 { font-weight:200; font-size: 44px;}
        h2 { font-weight:200; font-size: 37px;}
        h3 { font-weight:500; font-size: 27px;}
        h4 { font-weight:500; font-size: 23px;}
        h5 { font-weight:400; font-size: 17px;}
        h6 { font-weight:400; font-size: 14px;}


        .collapse { margin:0!important;}

        p, ul {
        	margin-bottom: 10px;
        	font-weight: normal;
        	font-size:14px;
        	line-height:1.6;
        }
        p.last { margin-bottom:0px;}

        ul li {
        	margin-left:5px;
        	list-style-position: inside;
        }

        /* -------------------------------------
        		SIDEBAR
        ------------------------------------- */
        ul.sidebar {
        	background:#ebebeb;
        	display:block;
        	list-style-type: none;
        }
        ul.sidebar li { display: block; margin:0;}
        ul.sidebar li a {
        	text-decoration:none;
        	color: #666;
        	padding:10px 16px;
        /* 	font-weight:bold; */
        	margin-right:10px;
        /* 	text-align:center; */
        	cursor:pointer;
        	border-bottom: 1px solid #777777;
        	border-top: 1px solid #FFFFFF;
        	display:block;
        	margin:0;
        }
        ul.sidebar li a.last { border-bottom-width:0px;}
        ul.sidebar li a h1,ul.sidebar li a h2,ul.sidebar li a h3,ul.sidebar li a h4,ul.sidebar li a h5,ul.sidebar li a h6,ul.sidebar li a p { margin-bottom:0!important;}



        /* ---------------------------------------------------
        		RESPONSIVENESS
        		Nuke it from orbit. It's the only way to be sure.
        ------------------------------------------------------ */

        /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
        .container {
        	display:block!important;
        	max-width:600px!important;
        	margin:0 auto!important; /* makes it centered */
        	clear:both!important;
        }

        /* This should also be a block element, so that it will fill 100% of the .container */
        .content {
        	padding:15px;
        	max-width:600px;
        	margin:0 auto;
        	display:block;
        }

        /* Let's make sure tables in the content area are 100% wide */
        .content table { width: 100%; }


        /* Odds and ends */
        .column {
        	width: 300px;
        	float:left;
        }
        .column tr td { padding: 15px; }
        .column-wrap {
        	padding:0!important;
        	margin:0 auto;
        	max-width:600px!important;
        }
        .column table { width:100%;}
        .social .column {
        	width: 280px;
        	min-width: 279px;
        	float:left;
        }

        /* Be sure to place a .clear element after each set of columns, just to be safe */
        .clear { display: block; clear: both; }


        /* -------------------------------------------
        		PHONE
        		For clients that support media queries.
        		Nothing fancy.
        -------------------------------------------- */
        @media only screen and (max-width: 600px) {

        	a[class="btn"] { display:block!important; margin-bottom:10px!important; background-image:none!important; margin-right:0!important;}

        	div[class="column"] { width: auto!important; float:none!important;}

        	table.social div[class="column"] {
        		width:auto!important;
        	}

        }
        </style>

        </head>

        <body bgcolor="#FFFFFF">
        <!-- BODY -->
        <table class="body-wrap" bgcolor="#ecf0f1">
        	<tr>
        		<td></td>
        		<td class="container" bgcolor="#FFFFFF">

        			<div class="content">
        			<table>
        				<tr>
        					<td>
        						<h5>Good day, ${recipient_name}!</h5>
        						<p style="font-size: 18px;font-weight:600;text-decoration:underline;line-height:20px;">This is your FINAL and official QR Code. If you have registered before, please disregard the QR Code sent before.</p>
        						<hr style="margin-bottom:10px;"/>
        						<h6>Please download or screenshot the QR Code at the link below at the bottom and present it to the officers at the event.</h6>

                    <a href="${website}/${recipient_code}">Show my QR Code</a>

        						<!-- Callout Panel -->

        						<div class="callout" style="padding-top:10px;">
        						<p >
        				    Terms and Conditions:
        				    </p>
        				    <p>
        				    1. I give consent to New Era University and its affiliates to use my
        				    personal details that I have provided to the University for the purpose
        				    of attendance monitoring for on-campus events.
        				    </p>
        				    <p>
        				    2. I declare that the QR code which I am scanning for the purposes of registering
        				    my attendance to this event is the QR Code that is sent to my nominated email address
        				    and is associated with my name.
        				    </p>
        				    <p>
        				    3. I undertake NOT to provide, send, or otherwise communicate to others the QR Code issued
        				    to me personally through my nominated email for the purpose of
        				    registering my attendance in my absence or stead, or for any other purpose.
        				    </p>
        				    <p>
        				    4. I accept that any breach of these conditions would attract the appropriate academic penalties.
        				    </p><!-- /Callout Panel -->

        					</div>

        						<!-- social & contact -->
        						<table class="social" width="100%">
        							<tr>
        								<td>

        									<!-- column 1 -->
        									<table align="left" class="column">
        										<tr>
        											<td>

        												<h5 class="">Connect with Us:</h5>
        												<p class=""><a href="https://www.facebook.com/Neu.ph.official/" class="soc-btn fb">Facebook</a> <a href="https://twitter.com/NEU_ph_official/" class="soc-btn tw">Twitter</a> <a href="https://neu.edu.ph" class="soc-btn gp">Website</a></p>


        											</td>
        										</tr>
        									</table><!-- /column 1 -->

        									<!-- column 2 -->
        									<table align="left" class="column">
        										<tr>
        											<td>

        												<h5 class="">Contact Info:</h5>
        												<p>Address: <strong>No. 9 Central Avenue, New Era, Quezon City</strong><br/>
        												Phone: <strong>09169375609</strong><br/>
                        				Email: <strong><a href="emailto:hseldon@trantor.com">neufair2019@gmail.com</a></strong></p>

        											</td>
        										</tr>
        									</table><!-- /column 2 -->

        									<span class="clear"></span>

        								</td>
        							</tr>
        						</table><!-- /social & contact -->

        					</td>
        				</tr>
        			</table>
        			</div><!-- /content -->

        		</td>
        		<td></td>
        	</tr>
        </table><!-- /BODY -->

        <!-- FOOTER -->
        <table class="footer-wrap">
        	<tr>
        		<td></td>
        		<td class="container">

        				<!-- content -->
        				<div class="content">
        				<table>
        				<tr>
        					<td align="center">
        						<p>
        							<a href="https://www.neu.edu.ph/main.php/soon">Terms</a> |
        							<a href="https://www.neu.edu.ph/main.php/soon">Privacy</a> |
        							<a href="https://www.neu.edu.ph"><unsubscribe>Unsubscribe</unsubscribe></a>
        						</p>
        					</td>
        				</tr>
        			</table>
        				</div><!-- /content -->

        		</td>
        		<td></td>
        	</tr>
        </table><!-- /FOOTER -->

        </body>
        </html>
`;

        console.log(`Sent to: ${recipient_email}`);
        console.log(`Api Key: ${api_array[api_ctr]}`);
        console.log(`Email: ${email_array[ctr]}`);
        console.log('----------------------------------');

        const msg = {
            to: recipient_email,
            from: email_array[ctr],
            subject: 'NEU Fair 2019 QR Code',
            text: 'Click the link to show your QR Code ' + recipient_code,
            html: email_content,
        };


        mail.send(msg).then((res) => {
            if (i < json.length - 1) {
                i++;
                console.log(i);
                console.log(email);

                sendMessage();


                if(api_ctr==2){
                  api_ctr = 0;
                }else{
                  api_ctr++;
                }
                mail.setApiKey(api_array[api_ctr]);

                if(ctr==10){
                  ctr = 0;
                } else {
                  ctr++;
                }
            } else {
                console.log(error_array);
                return;
            }
        },(reason)=>{
          error_array.push(email);
          i++;
          console.log('error on '+email);
          console.log('----------------------------------');
          sendMessage();
        });


    }

    sendMessage();

});
