const socket = io('http://localhost:3000')
socket.on('connection',() => {

})

var voltageData = [];
var temperatureData = [];
var altitudeData = [];
var missionTimeData = [];

socket.on('trial.csv', (myData) => {
    console.log(myData.voltage);
    voltageData.push(myData.voltage);
    temperatureData.push(myData.temperature);
    altitudeData.push(myData.altitude);
    missionTimeData.push(myData.missionTime);
    graph.update();
    graph1.update();
    graph3.update();
})
