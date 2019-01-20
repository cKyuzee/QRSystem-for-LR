//function to view the rice production variable specific data
function viewData(key) {
  var user = app_firebase.auth().currentUser;

  if (user) {

    app_firebase.database().ref('data/' + key).on('value', category => {
      $('#category-dataTable tbody tr').remove();

      let details = category.val().details;

      //setting up the details of data category
      $('#category-name').text(details.name.toUpperCase());
      $('#category-description').text(details.description);
      $('#category-unitName').text(details.unit.whole +" ("+details.unit.abbr+")");
      $('#category-dataSource').text('Data Retrieved from: ' + details.source.whole +" ("+details.source.abbr+")");

      if(key != 'temperature' && key != 'humidity' && key != 'rainfall'){
        let statistics = category.val().statistics;
        let rowNumber = 0;
        let format = (key === 'yield')? '0,0.000000000' : '0,0';

        $.each(statistics, function(i, v) {
          let timestamp = new Date(v.stamp);
          let date = (timestamp.getMonth()+1) +"/"+ timestamp.getDate() +"/"+ timestamp.getFullYear();
          let time =
            ((timestamp.getHours().toString().length == 1)
              ? "0" + timestamp.getHours() : timestamp.getHours()) +":"+
            ((timestamp.getMinutes().toString().length == 1)
              ? "0" + timestamp.getMinutes() : timestamp.getMinutes()) +":"+
            ((timestamp.getSeconds().toString().length == 1)
              ? "0" + timestamp.getSeconds() : timestamp.getSeconds());
          $('#category-dataTable').append("<tr><td>" + (++rowNumber) + "</td><td>" + v.year + "</td><td>" + numeral(v.value).format(format) + "</td><td>" + (date+"  "+time) + "</td></tr>");
        });
        $('#category-dataTable').css('display', 'block');
      }
      else {
        $('#category-dataTable').css('display', 'none');
        $('#btnExportData').css('display', 'none');
      }
    });
    $('#modal-variableData').modal('show');
    storeDataView(key);

  } else {
    $('#modal-errorViewData').modal('show');
  }
}

//function to store the data view details to database
function storeDataView(key) {
  var uid = app_firebase.auth().currentUser.uid;
  var hold = getDateTime();
  var date = hold[0];
  var time = hold[1];

  app_firebase.database().ref('users/'+ uid).once('value', user => {
    app_firebase.database().ref('views/' + key).push({
      date: date,
      time: time,
      fileDownload: 'false',
      stamp: (new Date).getTime(),
      user: {
        email: user.val().email,
        firstName: user.val().firstName,
        lastName: user.val().lastName
      }
    }).then( snap => {
      $('#viewId').text(snap.key);
    });
  });

}

//function to get the current date and time for timestamp
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

function tableToExcel(table) {
  if ($('#category-dataTable tbody tr').length > 0) {
    let date = new Date();
    let m = ((date.getMonth() + 1).toString().length == 1) ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
    let d = (date.getDate().toString().length == 1) ? "0" + date.getDate().toString() : date.getDate().toString();

    let filename = $('#category-name').text() + " [" + date.getFullYear() + "-" + m + "-" + d + "]";
    let uri = 'data:application/vnd.ms-excel;base64,',
      template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><title></title><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>',
      base64 = function(s) {
        return window.btoa(decodeURIComponent(encodeURIComponent(s)))
      },
      format = function(s, c) {
        return s.replace(/{(\w+)}/g, function(m, p) {
          return c[p];
        })
      }

    if (!table.nodeType) table = document.getElementById(table)
    var ctx = {
      worksheet: 'Sheet1' || 'Worksheet',
      table: table.innerHTML
    }

    var link = document.createElement('a');
    link.download = filename;
    link.href = uri + base64(format(template, ctx));
    link.click();

    //write to downloads
    let uid = app_firebase.auth().currentUser.uid;
    let key = $('#category-name').text().toLowerCase().replace(' ', '-');
    let hold = getDateTime();
    let date1 = hold[0];
    let time = hold[1];

    app_firebase.database().ref('users/'+ uid).once('value', user => {
      app_firebase.database().ref('downloads/' + key).push({
        date: date1,
        time: time,
        stamp: (new Date).getTime(),
        user: {
          email: user.val().email,
          firstName: user.val().firstName,
          lastName: user.val().lastName
        },
        view: $('#viewId').text()
      });
    });

    //change fileDownload to true, since it was downloaded.
    app_firebase.database().ref('views/'+key+'/'+$('#viewId').text()).update({
      fileDownload : 'true'
    })

  } else {
    window.alert('Invalid. No data retrieved.');
  }
}
