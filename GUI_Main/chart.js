const graph = document.getElementById('TEMPERATURE');
      
        new Chart(graph, {
          type: 'line',
          data: {
            labels: ['0','10', '20', '30', '40', '50', '60'],
            datasets: [
                {
              label: 'TEMPERATURE',
              data: [0, 10, 50, 60, 70, 100, 40],
              borderWidth: 3,
              borderColor: '#0071c5',
                }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
            
          }
        });

const graph1 = document.getElementById('VOLTAGE');
      
        new Chart(graph1, {
          type: 'line',
          data: {
            labels: ['0','10', '20', '30', '40', '50', '60'],
            datasets: [
                {
              label: 'VOLTAGE',
              data: [0, 10, 20, 30, 40, 50, 60],
              borderWidth: 3,
              borderColor: '#0071c5'
                }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
            
          }
        });

const graph3 = document.getElementById('ALTITUDE');
      
        new Chart(graph3, {
          type: 'line',
          data: {
            labels: ['0','10', '20', '30', '40', '50', '60'],
            datasets: [
                {
              label: 'ALTITUDE',
              data: [40, 10, 50, 60, 70, 100, 80],
              borderWidth: 3,
              borderColor: '#0071c5'
                }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
            
          }
        });

// const graph4 = document.getElementById('TILT-X');
      
//         new Chart(graph4, {
//           type: 'line',
//           data: {
//             labels: ['0','10', '20', '30', '40', '50', '60'],
//             datasets: [
//                 {
//               label: 'TILT-X',
//               data: [0, 10, 50, 60, 40, 90, 20],
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

// const graph5 = document.getElementById('TILT-Y');
      
//         new Chart(graph5, {
//           type: 'line',
//           data: {
//             labels: ['0','10', '20', '30', '40', '50', '60'],
//             datasets: [
//                 {
//               label: 'TILT-Y',
//               data: [0, 10, 80, 60, 70, 40, 30],
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
            width:  '700px',
            height: '500px',
            style: 'line',
            dataColor: {strokeWidth: 4},
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






