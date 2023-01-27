//draw visualization function for 3d chart
const chartColor = "rgb(255,158,62, 0.87)";

function drawVisualization() {
    const options = {
        width: "500px",
        height: "500px",
        style: "line",
        showPerspective: false,
        showGrid: true,
        keepAspectRatio: true,
        verticalRatio: 1.0,
        // backgroundColor: '#13122f',
        // backgroundColor: 'rgb(123, 189, 222, 1)',
        backgroundColor: 'transparent',
        // dataColor: '#6EEB83',
        xLabel: 'Latitude',
        yLabel: 'Longitude',
        zLabel: 'Altitude',
        gridColor: 'white',
        axisColor: 'white',
        axisFontSize: 20,
        // rotateAxisLabels: false,
        dataColor:{
            strokeWidth : 4,
            // stroke:'rgb(48, 205, 205, 0.87)',
            // stroke:'rgb(255,158,62, 0.87)',
            stroke: chartColor,
            // stroke: 'rgb(62, 149, 205)',
            // dataColor: '#6EEB83'
        },
        xValueLabel:function (x) {return Number((x * 100).toFixed(0))},
        yValueLabel:function (y) {return Number((y * 100).toFixed(1))},
        zValueLabel:function (z) {return Number((z * 100).toFixed((1)))},
    };
    const container = document.getElementById('threeD-plot');
    graph = new vis.Graph3d(container, threeData, options);

    graph.setCameraPosition({horizontal:1,vertical: 0.5,distance: 2});
}

//3d chart creation and updation functions
function create3dChart(dataObj) {
    const coord = {
        x: dataObj.gpslat/100,
        y: dataObj.gpslong/100,
        z: dataObj.gpsalt/100
    }
    threeData.add(coord);

    if( visFlag == 0){
        drawVisualization();
        visFlag = 1;
    }
}