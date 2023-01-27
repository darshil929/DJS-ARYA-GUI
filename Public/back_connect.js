const socket = io('http://localhost:3000')
socket.on('connection',() => {

})

var voltageData = [];
var temperatureData = [];
var altitudeData = [];
var missionTimeData = [];

socket.on('trial.csv', (myData) => {
    console.log(myData.altitude); // to see if the data is being recieved
    voltageData.push(myData.voltage);
    temperatureData.push(myData.temperature);
    altitudeData.push(myData.altitude);
    missionTimeData.push(myData.missionTime);
    dynamicChart1.update();
    dynamicChart2.update();
    dynamicChart3.update();
})
