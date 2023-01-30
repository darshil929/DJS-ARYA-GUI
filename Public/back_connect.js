const socket = io('http://localhost:3000')
socket.on('connection',() => {

})

var voltageData = [];
var temperatureData = [];
var altitudeData = [];
var missionTimeData = [];
var tiltxData = [];
var tiltyData = [];
var pressureData = [];
var gpsAltitudeData = [];
var gpsLatitudeData = [];
var gpsLongitudeData = [];


const Time = document.querySelector('.m-time');
const State = document.querySelector('.state');
const packet_count = document.querySelector('.packetCount');
const mode = document.querySelector('.mode');
const hs_deployed = document.querySelector('.hsDeployed');
const pc_deployed = document.querySelector('.pcDeployed');
const mast_raised = document.querySelector('.mastRaised');
const GPStime = document.querySelector('.gpsTime');
const GPSalt = document.querySelector('.gpsAlt');
const GPSlat = document.querySelector('.gpsLat');
const GPSlong = document.querySelector('.gpsLong');
const GPSsats = document.querySelector('.gpsSats');
const CMDecho = document.querySelector('.CMDecho');
const pressure = document.querySelector('.pressure');
let threeD;
const threeData= new vis.DataSet();
let visFlag = 0;

socket.on('trial.csv', (myData) => {
    console.log(myData.altitude); // to see if the data is being recieved
    voltageData.push(myData.voltage);
    temperatureData.push(myData.temperature);
    altitudeData.push(myData.altitude);
    missionTimeData.push(myData.missionTime);
    tiltxData.push(myData.tiltX);
    tiltyData.push(myData.tiltY);
    pressureData.push(myData.pressure);
    gpsAltitudeData.push(myData.gpsAltitude);
    gpsLatitudeData.push(myData.gpsLatitude);
    gpsLongitudeData.push(myData.gpsLongitude);
    dynamicChart1.update();
    dynamicChart2.update();
    dynamicChart3.update();
    dynamicChart4.update();
    dynamicChart5.update();

    
    Time.innerHTML = `${myData.missionTime}`;
    State.innerHTML = `${myData.state}`;
    packet_count.innerHTML = `${myData.packetCount}`;
    mode.innerHTML = `${myData.mode}`;
    hs_deployed.innerHTML = `${myData.hsDeployed}`;
    pc_deployed.innerHTML = `${myData.pcDeployed}`;
    mast_raised.innerHTML = `${myData.mastRaised}`;
    GPStime.innerHTML = `${myData.gpsTime}`;
    GPSalt.innerHTML = `${myData.gpsAltitude}`;
    GPSlat.innerHTML = `${myData.gpsLatitude}`;
    GPSlong.innerHTML = `${myData.gpsLongitude}`;
    GPSsats.innerHTML = `${myData.gpsSats}`;
    CMDecho.innerHTML = `${myData.cmdEcho}`;
    pressure.innerHTML = `${myData.pressure}`;

    createContainerTable(myData);
    create3dChart(myData);
})
