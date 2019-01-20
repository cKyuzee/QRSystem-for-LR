//initialize all graphs
performInitialization();

function performInitialization() {
  app_firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

      //determine if user is admin
      var uid = app_firebase.auth().currentUser.uid;
      app_firebase.database().ref('users/' + uid).once('value').then(function(snapshot) {

        if (snapshot.val().userType == 'admin') {

          initializeDatePicker(); //initialize date picker
          showMonthlyDataViews(); //show monthly data views (MDV)

          //filtering the table
          $("#search-input").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#tableDetailedData tbody tr").filter(function() {
              $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
          });

        } else {
          window.location.replace('index.html');
        }
      });
    } else {
      window.location.replace('index.html');
    }
  });

}

function showMonthlyDataViews() {
  var key = $('#selectKey').val();
  var month = $('#selectMonth').val();
  var year = $('#selectYear').val();

  if (key == 'all') {
    showDonutChart(getAllMonthlyDataViews(month, year));
  } else {
    showSplineChart(key, month, year);
  }
}

function getAllMonthlyDataViews(month, year) {
  var counter = {
    irrigatedArea: 0,
    cultivatedArea: 0,
    productionVolume: 0,
    yield: 0,
    temperature: 0,
    humidity: 0,
    rainfall: 0,
    sunshineDuration: 0
  };

  app_firebase.database().ref('views/').on('value', categories => {
    categories.forEach(category => {
      let count = 0;

      category.forEach(view => {

        var viewDate = view.val().date.split('-');
        var viewMonth = parseInt(viewDate[1]);
        var viewYear = parseInt(viewDate[0]);

        if (viewMonth == month && viewYear == year) {
          count++;
        }
        switch (category.key) {
          case 'irrigated-area':
            counter.irrigatedArea = count;
            break;

          case 'cultivated-area':
            counter.cultivatedArea = count;
            break;

          case 'production-volume':
            counter.productionVolume = count;
            break;

          case 'yield':
            counter.yield = count;
            break;

          case 'temperature':
            counter.temperature = count;
            break;

          case 'humidity':
            counter.humidity = count;
            break;

          case 'rainfall':
            counter.rainfall = count;
            break;

          case 'sunshine-duration':
            counter.sunshineDuration = count;
            break;
        }

      });
    });
  });

  return counter;
}

function showDonutChart(counter) {
  var chart = c3.generate({
    bindto: '#donutGraph',
    data: {
      columns: [
        ['Cultivated Area', 0],
        ['Humidity', 0],
        ['Irrigated Area', 0],
        ['Production Volume', 0],
        ['Rainfall', 0],
        ['Sunshine Duration', 0],
        ['Temperature', 0],
        ['Yield', 0]
      ],
      type: 'donut'
    },
    donut: {
      title: "Monthly Views"
    },
    legend: {
      position: 'right'
    }
  });

  setTimeout(function() {
    chart.load({
      columns: [
        ['Cultivated Area', counter.cultivatedArea],
        ['Humidity', counter.humidity],
        ['Irrigated Area', counter.irrigatedArea],
        ['Production Volume', counter.productionVolume],
        ['Rainfall', counter.rainfall],
        ['Sunshine Duration', counter.sunshineDuration],
        ['Temperature', counter.temperature],
        ['Yield', counter.yield]
      ]
    });
  }, 5000);
}

function showSplineChart(key, month, year) {
  app_firebase.database().ref('views/' + key).orderByChild('stamp').once('value').then(function(category) {

    var counter = {
      dates: [],
      scores: []
    };

    category.forEach(function(view) {

      var viewDate = view.val().date.split('-');
      var viewMonth = parseInt(viewDate[1]);
      var viewYear = parseInt(viewDate[0]);

      if (viewMonth == month && viewYear == year) {
        var date = view.val().date;
        var index = $.inArray(date, counter.dates);

        if (index == -1) {
          counter.dates.push(date);
          counter.scores.push(1);
        } else {
          counter.scores[index] += 1;
        }
      }
    });

    createSplineChart(counter);

  });
}

function createSplineChart(counter) {

  counter.dates.unshift('x');
  counter.scores.unshift('Views');

  var chart = c3.generate({
    bindto: '#donutGraph',
    data: {
      x: 'x',
      columns: [
        counter.dates,
        counter.scores
      ]
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%d'
        }
      }
    },
    legend: {
      position: 'right'
    }
  });
}

function initializeDatePicker() {
  var dateFormat = "mm/dd/yy",
    from = $("#from")
    .datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 2
    })
    .on("change", function() {
      to.datepicker("option", "minDate", getDate(this));
    }),
    to = $("#to").datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 2
    })
    .on("change", function() {
      from.datepicker("option", "maxDate", getDate(this));
    });

  function getDate(element) {
    var date;
    try {
      date = $.datepicker.parseDate(dateFormat, element.value);
    } catch (error) {
      date = null;
    }

    return date;
  }
}

function clickbtnShow() {
  var from = $('#from').val();
  var to = $('#to').val();

  if (from && to) {
    $('#from').css('border-color', 'green');
    $('#to').css('border-color', 'green');

    showAllDetailedDataViews($('#selectCategory').val(), from, to);

  } else {
    (!from) ?
    $('#from').css('border-color', 'red'): $('#from').css('border-color', 'green');

    (!to) ?
    $('#to').css('border-color', 'red'): $('#to').css('border-color', 'green');
  }
}

function showAllDetailedDataViews(key, from, to) {
  $('#tableDetailedData tbody tr').remove();
  $('#search-input').val('');
  let num = 0;
  let event = (key) ? 'value' : 'child_added';

  app_firebase.database().ref('views/' + key).on(event, category => {
    category.forEach(view => {
      let viewDateParts = view.val().date.split('-');
      let viewDate = Date.parse(viewDateParts[1] +"/"+ viewDateParts[2] +"/"+ viewDateParts[0]);
      let fromDate = Date.parse(from);
      let toDate = Date.parse(to);

      if (fromDate <= viewDate && toDate >= viewDate) {
        let user = view.val().user;
        let row = {
          num: ++num,
          name: user.firstName + " " + user.lastName,
          email: user.email,
          key: category.key,
          date: view.val().date,
          time: view.val().time
        };
        $('#tableDetailedData tbody').append("<tr><td>" + row.num + "</td><td>" + row.name + "</td><td>" + row.email + "</td><td>" + row.key + "</td><td>" + row.date + "</td><td>" + row.time + "</td></tr>");
      }
    });
  });
}

function tableToExcel(table) {
  if ($('#tableDetailedData tbody tr').length > 0) {
    let date = new Date();
    let m = ((date.getMonth() + 1).toString().length == 1) ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
    let d = (date.getDate().toString().length == 1) ? "0" + date.getDate().toString() : date.getDate().toString();

    let filename = (($('#selectCategory').val()) ? $('#selectCategory').val() : 'all') + " [" + date.getFullYear() + "-" + m + "-" + d + "]";
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
  } else {
    window.alert('Invalid. No data retrieved.');
  }
}

function performSignOut() {
  app_firebase.auth().signOut().then(function() {
    showAnalytics(false);
    window.location.replace('index.html');
  }).catch(function(error) {

  });
}

// function clickbtnAdd() {
//   let key = $('#selectVariableCategory').val();
//   let year = parseInt($('#year').val(), 10);
//   let value = parseFloat($('#value').val());
//
//   app_firebase.database().ref('data/'+key+'/statistics').push({
//       year  : year,
//       value  : value,
//       stamp : (new Date).getTime()
//   });
//
//   $('#year').val(year+1);
//   $('#value').val('');
// }
