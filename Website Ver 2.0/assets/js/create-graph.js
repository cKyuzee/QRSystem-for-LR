/*
 * Parse the data and create a graph with the data.
 */


function parseData() {
console.log("Parse start");
		Papa.parse("../../../MatLab Stuffs/RBFNN Results", {
			download: true,
			complete: function(result1) {
				console.log("RBFNN complete");

				Papa.parse("../../../MatLab Stuffs/GRNN Results", {
					download: true,
					complete: function(result2) {
						console.log("GRNN complete");

						Papa.parse("../../../MatLab Stuffs/FFNN Results", {
							download: true,
							complete: function(result3) {
								console.log("FFNN complete");

								Papa.parse("assets/files/Rice Data Sheet-4.csv", {
									download: true,
									complete: function(result4) {
										console.log("Rice Data complete");

										createGraph(result1.data, result2.data, result3.data, result4.data)
									}
								});
							}
						});
					}
				});
			}
		});
}

function createGraph(rbfnn, grnn, ffnn, ricedata) {
var rbfnn_line = ["RBFNN"];
var grnn_line = ["GRNN"];
var ffnn_line = ["FFNN"];
var actualYields = ["Actual Yield"];
var years = [];

for (var year = 2008; year < 2018; year++) {
	years.push(year);
}

for (var i = 0; i < rbfnn[0].length; i++) {
	rbfnn_line.push(rbfnn[0][i]);
	grnn_line.push(grnn[0][i]);
	ffnn_line.push(ffnn[0][i]);
	actualYields.push(ricedata[4][i+11]) //4 is the row for Yield and i+11 is column counter that starts at 2008
}
console.log(rbfnn_line);
console.log(grnn_line);
console.log(ffnn_line);

	var chart = c3.generate({
		bindto: '#chart',
	    data: {
	        columns: [
	        	rbfnn_line, grnn_line, ffnn_line, actualYields
	        ]
	    },
			axis: {
	        x: {
	            type: 'category',
	            categories: years,
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
			legend: {
	        position: 'right'
	    }
	});
}

parseData();
