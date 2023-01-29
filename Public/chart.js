//Graphs
const graph = document.getElementById('TEMPERATURE');

let dynamicChart1 = new Chart(graph, {
  type: "line",
  data: {
    labels: missionTimeData,
    datasets: [{
      fill: false,
      label: 'Temperature',
      lineTension: 0,
      // backgroundColor: "rgb(228, 68, 150, 0.8)", 
      // backgroundColor : tpAltitudeColor,   
      borderColor: '#0071c5',
      pointBackgroundColor: '#0071c5',
      // radius: 0,
      data: temperatureData,
      // borderWidth:2,
      // pointRadius:1,
    }]
  },
  options: {
    // scales: {
    //     y: {
    //         suggestedMin: 0,
    //         suggestedMax: 1000
    //     }
    // },
    legend: {
      display: true,
      labels: {
        fontColor: "#333",
        fontSize: 12,
        fontFamily: 'Monaco',
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    position: 'left',
    align: 'start',
    spanGaps: true,
    scales: {
      // y: {
      //   beginAtZero: false,
      // },
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Time',
          fontColor: '#333',
          fontSize: 14
        },
        // gridLines: {
        //     tickColor:'#dedede',
        //     color: "#333",      // color of the grid lines
        //     // borderColor: "red",
        //     zeroLineColor: '#333'     // Color of the axis
        // },
        ticks: {
          fontColor: "#333",
          fontSize: 14,
          // min:0,
          // minTicksLimit: 0, 
        },

      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: '°Celcius',
          fontColor: '#333',
          fontSize: 14
        },
        // gridLines: {
        //     tickColor:'#333',
        //     color: "#333",      // color of the grid lines
        //     zeroLineColor: '#333'     // Color of the axis
        // },
        ticks: {
          beginAtZero: false,
          fontColor: "#333",
          fontSize: 14,
          // suggestedMin: 0,
  
        },
      }],
    },

  }
});



// const graph = document.getElementById('TEMPERATURE');

//         let dynamicChart1 = new Chart(graph, {
//           type: 'line',
//           data: {
//             labels: missionTimeData,
//             datasets: [
//                 {
//               label: 'TEMPERATURE',
//               data: temperatureData,
//               borderWidth: 3,
//               borderColor: '#0071c5',
//                 }
//             ]
//           },
//           options: {
//             scales: {
//               y: {
//                 beginAtZero: false,
//               }
//             }

//           }
//         });

const graph1 = document.getElementById('VOLTAGE');

let dynamicChart2 = new Chart(graph1, {
  type: "line",
  data: {
    labels: missionTimeData,
    datasets: [{
      fill: false,
      label: 'Voltage',
      lineTension: 0,
      // backgroundColor: "rgb(228, 68, 150, 0.8)", 
      // backgroundColor : tpAltitudeColor,   
      borderColor: '#0071c5',
      pointBackgroundColor: '#0071c5',
      // radius: 0,
      data: voltageData,
      // borderWidth:2,
      // pointRadius:1,
    }]
  },
  options: {

    // scales: {
    //     y: {
    //         suggestedMin: 0,
    //         suggestedMax: 1000
    //     }
    // },
    legend: {
      display: true,
      labels: {
        fontColor: "#333",
        fontSize: 12,
        fontFamily: 'Monaco',
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    position: 'left',
    align: 'start',
    spanGaps: true,
    scales: {
      // y: {
      //   beginAtZero: false,
      // },
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Time',
          fontColor: '#333',
          fontSize: 14
        },
        // gridLines: {
        //     tickColor:'#dedede',
        //     color: "#333",      // color of the grid lines
        //     // borderColor: "red",
        //     zeroLineColor: '#333'     // Color of the axis
        // },
        ticks: {
          fontColor: "#333",
          fontSize: 14,
          // min:0,
          // minTicksLimit: 0, 
        },

      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Volts',
          fontColor: '#333',
          fontSize: 14
        },
        // gridLines: {
        //     tickColor:'#333',
        //     color: "#333",      // color of the grid lines
        //     zeroLineColor: '#333'     // Color of the axis
        // },
        ticks: {
beginAtZero: false,
          fontColor: "#333",
          fontSize: 14,
          // suggestedMin: 0,
        },
      }],
    },

  }
});

const graph3 = document.getElementById('ALTITUDE');

let dynamicChart3 = new Chart(graph3, {
  type: "line",
  data: {
    labels: missionTimeData,
    datasets: [{
      fill: false,
      label: 'Altitude',
      lineTension: 0,
      // backgroundColor: "rgb(228, 68, 150, 0.8)", 
      // backgroundColor : tpAltitudeColor,   
      borderColor: '#0071c5',
      pointBackgroundColor: '#0071c5',
      // radius: 0,
      data: altitudeData,
      // borderWidth:2,
      // pointRadius:1,
    }]
  },
  options: {

    // scales: {
    //     y: {
    //         suggestedMin: 0,
    //         suggestedMax: 1000
    //     }
    // },
    legend: {
      display: true,
      labels: {
        fontColor: "#333",
        fontSize: 12,
        fontFamily: 'Monaco',
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    position: 'left',
    align: 'start',
    spanGaps: true,
    scales: {
      // y: {
      //   beginAtZero: false,
      // },
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Time',
          fontColor: '#333',
          fontSize: 14
        },
        // gridLines: {
        //     tickColor:'#dedede',
        //     color: "#333",      // color of the grid lines
        //     // borderColor: "red",
        //     zeroLineColor: '#333'     // Color of the axis
        // },
        ticks: {
          fontColor: "#333",
          fontSize: 14,
          // min:0,
          // minTicksLimit: 0, 
        },

      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Meters',
          fontColor: '#333',
          fontSize: 14
        },
        // gridLines: {
        //     tickColor:'#333',
        //     color: "#333",      // color of the grid lines
        //     zeroLineColor: '#333'     // Color of the axis
        // },
        ticks: {
beginAtZero: false,
          fontColor: "#333",
          fontSize: 14,
          // suggestedMin: 0,
        },
      }],
    },

  }
});

const graph4 = document.getElementById('TILT');

let dynamicChart4 = new Chart(graph4, {
  type: "line",
  data: {
    labels: missionTimeData,
    datasets: [{
      fill: false,
      label: 'Tilt-X',
      lineTension: 0,
      // backgroundColor: "rgb(228, 68, 150, 0.8)", 
      // backgroundColor : tpAltitudeColor,   
      borderColor: '#0071c5',
      pointBackgroundColor: '#0071c5',
      // radius: 0,
      data: tiltxData,
      // borderWidth:2,
      // pointRadius:1,
    },
    {
      fill: false,
      label: 'Tilt-Y',
      lineTension: 0,
      // backgroundColor: "rgb(228, 68, 150, 0.8)", 
      // backgroundColor : tpAltitudeColor,   
      borderColor: '#f25278',
      pointBackgroundColor: '#f25278',
      // radius: 0,
      data: tiltyData,
      // borderWidth:2,
      // pointRadius:1,
    }]
  },
  options: {

    // scales: {
    //     y: {
    //         suggestedMin: 0,
    //         suggestedMax: 1000
    //     }
    // },
    legend: {
      display: true,
      labels: {
        fontColor: "#333",
        fontSize: 12,
        fontFamily: 'Monaco',
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    position: 'left',
    align: 'start',
    spanGaps: true,
    scales: {
      // y: {
      //   beginAtZero: false,
      // },
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Time',
          fontColor: '#333',
          fontSize: 14
        },
        // gridLines: {
        //     tickColor:'#dedede',
        //     color: "#333",      // color of the grid lines
        //     // borderColor: "red",
        //     zeroLineColor: '#333'     // Color of the axis
        // },
        ticks: {
          fontColor: "#333",
          fontSize: 14,
          // min:0,
          // minTicksLimit: 0, 
        },

      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Degree',
          fontColor: '#333',
          fontSize: 14
        },
        // gridLines: {
        //     tickColor:'#333',
        //     color: "#333",      // color of the grid lines
        //     zeroLineColor: '#333'     // Color of the axis
        // },
        ticks: {
beginAtZero: false,
          fontColor: "#333",
          fontSize: 14,
          // suggestedMin: 0,
        },
      }],
    },

  }
});

const graph5 = document.getElementById('PRESSURE');

let dynamicChart5 = new Chart(graph5, {
  type: "line",
  data: {
    labels: missionTimeData,
    datasets: [{
      fill: false,
      label: 'Pressure',
      lineTension: 0,
      // backgroundColor: "rgb(228, 68, 150, 0.8)", 
      // backgroundColor : tpAltitudeColor,   
      borderColor: '#0071c5',
      pointBackgroundColor: '#0071c5',
      // radius: 0,
      data: pressureData,
      // borderWidth:2,
      // pointRadius:1,
    }]
  },
  options: {

    // scales: {
    //     y: {
    //         suggestedMin: 0,
    //         suggestedMax: 1000
    //     }
    // },

    legend: {
      display: true,
      labels: {
        fontColor: "#333",
        fontSize: 12,
        fontFamily: 'Monaco',
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    position: 'left',
    align: 'start',
    spanGaps: true,
    scales: {
      // y: {
      //   beginAtZero: false,
      // },
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Time',
          fontColor: '#333',
          fontSize: 14
        },
        // gridLines: {
        //     tickColor:'#dedede',
        //     color: "#333",      // color of the grid lines
        //     // borderColor: "red",
        //     zeroLineColor: '#333'     // Color of the axis
        // },
        ticks: {
          fontColor: "#333",
          fontSize: 14,
          // min:0,
          // minTicksLimit: 0, 
        },

      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Pascal',
          fontColor: '#333',
          fontSize: 14
        },
        // gridLines: {
        //     tickColor:'#333',
        //     color: "#333",      // color of the grid lines
        //     zeroLineColor: '#333'     // Color of the axis
        // },
        ticks: {
beginAtZero: false,
          fontColor: "#333",
          fontSize: 14,
          // suggestedMin: 0,
        },
      }],
    },

  }
});

// const graph6 = document.getElementById('myChart6');

//         new Chart(graph6, {
//           type: 'line',
//           data: {
//             labels: ['0','10', '20', '30', '40', '50', '60'],
//             datasets: [
//                 {
//               label: 'myChart6',
//               data: [0, 60, 50, 30, 70, 100, 40],
//               borderWidth: 3,
//               borderColor: '#333'
//                 }
//             ]
//           },
//           options: {
//             scales: {
//               y: {
//                 beginAtZero: true
//               }
//             }

//           }
//         });


var data = null;
var graph3d = null;

function customx(x) {
  return (x + 10);
}

function customy(y) {
  return (y * y);
}



// Called when the Visualization API is loaded.
function drawVisualization() {
  // Create and populate a data table.
  var data = new vis.DataSet();
  // create some nice looking data with sin/cos
  // number of datapoints will be steps*steps
  var axisMax = 10;
  for (var x = 0; x < axisMax; x++) {
    for (var y = 0; y < axisMax; y++) {
      var x = customx(x);
      var y = customy(y);
      var z = x + y + 10;
      data.add({
        x: x,
        y: y,
        z: z,
        style: z
      });
    }
  }

  // specify options
  var options = {
    width: '700px',
    height: '500px',
    style: 'line',
    dataColor: { strokeWidth: 4 },
    showPerspective: true,
    showGrid: true,
    showShadow: false,
    keepAspectRatio: true,
    verticalRatio: 0.5
  };

  // create a graph3d
  var container = document.getElementById('mygraph7');
  graph3d = new vis.Graph3d(container, data, options);
}






