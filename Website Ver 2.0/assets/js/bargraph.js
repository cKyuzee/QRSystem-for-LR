/*
 * Parse the data and create a graph with the data.
 */

var category = [];
var year2018 = [];
var year2019 = [];

var bargraph = c3.generate({
  bindto: '#bargraph',
    data: {
        columns: [
          year2018
        ],
        type: 'bar'
    },
    axis: {
        x: {
            type: 'category',
            categories: category,
            tick: {
              multiline: false,
                culling: {
                    max: 15
                }
            }
        }
    },

    zoom: {
      enabled: true
    },
});

function parseData() {
console.log("Parse start");
		Papa.parse("../../../MatLab Stuffs/Datasets/Bargraph Sample Data.csv", {
			download: true,
			complete: function(results) {
        console.log("Parse complete");
				console.log(results.data);
        for (var i=1; i< results.data[0].length; i++) {
          category.push(results.data[0][i]);
        }
        for (var x = 1; x < results.data.length; x++){
          if (x < 13) {
            year2018[x-1] = results.data[x];
          }
          else{
          year2019[x-13] = results.data[x];
        }
      }
      updateGraph('all', 'all', 'all');
    }
	});
}

function updateGraph(dataStr = '', monthStr = '', yearStr = '') {
  var month = 0;
  var year = year2018;
  var yearArray = year2018[0];
  var dataCategory = category;

  switch (yearStr){
    case '2018':
      year = year2018;
      break;
    case '2019':
      year = year2019;
      break;
    default:
      year = year2018;
  }

  switch (monthStr){
    case 'jan':
      month = 0;
      break;
    case 'feb':
      month = 1;
      break;
    case 'mar':
      month = 2;
      break;
    case 'apr':
      month = 3;
      break;
    case 'may':
      month = 4;
      break;
    case 'jun':
      month = 5;
      break;
    case 'jul':
      month = 6;
      break;
    case 'aug':
      month = 7;
      break;
    case 'sep':
      month = 8;
      break;
    case 'oct':
      month = 9;
      break;
    case 'nov':
      month = 10;
      break;
    case 'dec':
      month = 11;
      break;
    default:
      month = 0;

  }

  switch (dataStr){
    case 'irrigatedarea':
      dataCategory = category[0];
      yearArray = ["IRRIGATED AREA"];
      yearArray.push(year[month][1]);
      break;
    case 'cultivatedarea':
      dataCategory = category[1];
      yearArray = ["CULTIVATED AREA"];
      yearArray.push(year[month][2]);
      break;
    case 'productionvolume':
      dataCategory = category[2];
      yearArray = ["PRODUCTION VOLUME"];
      yearArray.push(year[month][3]);
      break;
    case 'yield':
      dataCategory = category[3];
      yearArray = ["YIELD"];
      yearArray.push(year[month][4]);
      break;
    case 'temperature':
      dataCategory = category[4];
      yearArray = ["TEMPERATURE"];
      yearArray.push(year[month][5]);
      break;
    case 'humidity':
      dataCategory = category[5];
      yearArray = ["HUMIDITY"];
      yearArray.push(year[month][6]);
      break;
    case 'rainfall':
      dataCategory = category[6];
      yearArray = ["RAINFALL"];
      yearArray.push(year[month][7]);
      break;
    case 'sunshineduration':
      dataCategory = category[7];
      yearArray = ["SUNSHINE DURATION"];
      yearArray.push(year[month][8]);
      break;

    default:
      console.log("category = default");
        dataCategory = category;
        yearArray = year[month];
  }


  bargraph.unload({
    done: function() {
      bargraph.load({
        columns: [
          year2018[0], year2018[1], year2018[2], year2018[3], year2018[4], year2018[5],
          year2018[6], year2018[7], year2018[8], year2018[9], year2018[10], year2018[11]
        ],
        axis: {
            x: {
                categories: dataCategory
            }
        },
      });
    }
  });
}


parseData();
