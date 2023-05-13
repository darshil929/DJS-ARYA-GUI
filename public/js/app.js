const socket = io('http://localhost:5000')
socket.on('connection', () => {})
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
const inputCommand = document.querySelector('#input-cmd');
const command = document.querySelector('#command');
// let threeD;
// const threeData= new vis.DataSet();
// let visFlag = 0;
//3D Chart
// let threeD;
// const threeData = new vis.DataSet();
// let visFlag = 0;
// 3d chart
let threeD;
const threeData = new vis.DataSet();
let visFlag = 0;

socket.on('data', (myData) => {
    console.log(myData)
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
    transition_ss(myData.state);
    // displayStates(myData.state);
    // randomState(myData.state);
    // displayStates(myData.state);
    create3dChart(myData);

    // MAP
    // // marker.setLatLng([myData.gpsLatitude, myData.gpsLongitude]);
    // let r1 = myData.gpsLatitude;
    // let r2 = myData.gpsLongitude;
    // r1 = r1.toString();
    // r2 = r2.toString();
    // r1 = parseFloat( '0.0' + r1.substring(5,8));
    // r2 = parseFloat('0.0' + r2.substring(5,8));
    // // marker.setLatLng([19.076 + r1, 72.877 + r2]);
    marker.setLatLng([myData.gpsLatitude, myData.gpsLongitude]);
    // const circle = L.circle([myData.gpsLatitude, myData.gpsLongitude], {   // marking the past Lat Long
    // const circle = L.circle([19.076 + r1, 72.877 + r2], {   // marking the past Lat Long
    const circle = L.circle([myData.gpsLatitude, myData.gpsLongitude], {   // marking the past Lat Long
        color: "blue",
        fillColor: "blue",
        fillOpacity: 1,
        radius: 1.0
    }).addTo(map);
})

// Tab Switch
const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        setTimeout(function () { map.invalidateSize() }, 1)
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active')
        })
        tabs.forEach(tab => {
            tab.classList.remove('active')
        })
        tab.classList.add('active')
        target.classList.add('active')
    })
})
//BUTTON INTEGRATION
// let startFlag=0;
// let stopFlag=0;
document.querySelector('#btn1').addEventListener('click', async () => {
    const com = document.querySelector('#com').value
    const baud = document.querySelector('#baudRate').value
    socket.emit('start', {com, baud});
    //startFlag = 1;  
});

document.querySelector('#btn2').addEventListener('click', async () => {
    socket.emit('stop');
    // socket.disconnect();
});

document.querySelector('#btn3').addEventListener('click', async () => {
    socket.emit('cal');
    // socket.disconnect();
});



command.addEventListener('keyup', (e) => {
    e.preventDefault();
    let cmd = command.value.toUpperCase();
    command.value = cmd;
})

inputCommand.addEventListener('submit', (e) => {
    e.preventDefault();
    commandButtonCB();
});

document.querySelector('#baudRate').addEventListener('change',(e)=>{
    socket.emit('baud', e.target.value)
});

const getCOMPorts = async () => {
    try {
        const res = await fetch('http://localhost:5000/com');
        const coms = await res.json();
        // console.log(coms)
        if(coms.length !== 0) {
            const options = coms.map( (com) => { 
                const option = document.createElement("option");
                option.innerHTML = `${com}`;
                option.value = `${com}`;
                return option;
            })
        
            options.forEach( (option) => {
                document.querySelector('#com').appendChild(option)
            })
        } else {
            console.log('COM error at Server')
        }
    } catch (error) {
        console.log(error.message)
    }
}
getCOMPorts();