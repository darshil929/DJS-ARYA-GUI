// SIM MODE

let sim_enable = false;
let sim_activate = false;

//Server
let container_ss, tp_ss;

let time = [];
let lastThreeTime = [];
let container_alt = [], tp_alt = [];
let container_temp = [], tp_temp = [];
let container_volt = [], tp_volt = [];
let gyro_r = [], gyro_p = [], gyro_y = [];
let accel_r = [], accel_p = [], accel_y = [];
let mag_r = [], mag_p = [], mag_y = [];

// CONTAINER DATA
const teamID = document.querySelector('.team-id');
const missionTime = document.querySelector('.m-time');
const packetCount = document.querySelector('.packet-count');
const packetType = document.querySelector('.packet-type');
const TPReleased = document.querySelector('.tp-released');
const mode = document.querySelector('.mode');
const cmd = document.querySelector('.cmd-echo');

const gpsSats = document.querySelector('.gps-sats');
const gpsTime = document.querySelector('.gps-time');
const gpsLat = document.querySelector('.gps-lat');
const gpsLong = document.querySelector('.gps-long');
const gpsAlt = document.querySelector('.gps-alt');

// PAYLOAD DATA
const point_err = document.querySelector('.pointing-error');

// 3d chart
let graph;
const threeData = new vis.DataSet();
let visFlag = 0;

let td;
let threedmodel = false;
socket.on('data', async (dataObj) => {
    // console.log(dataObj);
    if (dataObj.pt == 'C') {

        // CONTAINER VALUES
        // team_id = dataObj.id;

        // container_pc = dataObj.pc;
        // container_pt = dataObj.pt;
        container_ss = dataObj.ss;
        // console.table(dataObj);
        // console.log(container_ss);

        // mode = dataObj.mode;
        // tp_released = dataObj.released;
        // cmd_echo = dataObj.cmd;

        // gps_time = dataObj.gpstime;
        // gps_lat = dataObj.gpslat;
        // gps_long = dataObj.gpslong;
        // gps_alt = dataObj.gpsalt;
        // gps_sats = dataObj.gpssats;

        // MAP
        // marker.setLatLng([dataObj.gpslat, dataObj.gpslong]);
        let r1 = Math.random();
        let r2 = Math.random();
        r1 = r1.toString();
        r2 = r2.toString();
        r1 = parseFloat( '0.0' + r1.substring(5,8));
        r2 = parseFloat('0.0' + r2.substring(5,8));
        // marker.setLatLng([19.076 + r1, 72.877 + r2]);
        marker.setLatLng([37.236 + r1, -80.446 + r2]);

        // const circle = L.circle([dataObj.gpslat, dataObj.gpslong], {   // marking the past Lat Long
        // const circle = L.circle([19.076 + r1, 72.877 + r2], {   // marking the past Lat Long
        const circle = L.circle([37.236 + r1, -80.446 + r2], {   // marking the past Lat Long
            color: "blue",
            fillColor: "blue",
            fillOpacity: 1,
            radius: 1.0
        }).addTo(mymap);

        // CONTAINER GRAPH
        time.push(dataObj.mtime);
        container_alt.push(dataObj.alt);
        container_temp.push(dataObj.temp);
        container_volt.push(dataObj.volt);

        // CONTAINER CSV
        createContainerTable(dataObj);

        // UPDATING CONTAINER DATA
        teamID.innerHTML = `${dataObj.id}`;
        missionTime.innerHTML = `${dataObj.mtime}`;
        packetCount.innerHTML = `${dataObj.pc}`;
        packetType.innerHTML = `${dataObj.pt}`;
        TPReleased.innerHTML = `${dataObj.released}`;
        mode.innerHTML = `${dataObj.mode}`;
        cmd.innerHTML = `${dataObj.cmd}`;

        gpsTime.innerHTML = `${dataObj.gpstime}`;
        gpsLat.innerHTML = `${dataObj.gpslat}`;
        gpsLong.innerHTML = `${dataObj.gpslong}`;
        gpsAlt.innerHTML = `${dataObj.gpsalt}`;
        gpsSats.innerHTML = `${dataObj.gpssats}`;

        // Data updation for 3d chart
        // const coordRand = {
        //     x: Math.random(),
        //     y: Math.random(),
        //     z: Math.random()
        // }
        // threeData.add(coordRand);
        create3dChart(dataObj);

        // UPDATING GRAPHS
        alt.update();
        temp.update();
        volt.update();
        gyro.update();
        accel.update();
        mag.update();
        transition_ss(dataObj.ss);

        if(dataObj.ss < 6) {
            tp_alt.push(undefined);
            tp_temp.push(undefined);
            tp_volt.push(undefined);
        }
    } else if (dataObj.pt == 'T') {
        // console.log(dataObj);
        // PAYLOAD VALUES
        // pointing_error = dataObj.pe;
        // tp_pc = dataObj.pc;
        // tp_pt = dataObj.pt;
        tp_ss = dataObj.ss;

        // TETHERED PAYLOAD GRAPH
        lastThreeTime.push(dataObj.mtime)
        tp_alt.push(dataObj.alt);
        tp_temp.push(dataObj.temp);
        tp_volt.push(dataObj.volt);
        gyro_r.push(dataObj.gyroR);
        gyro_p.push(dataObj.gyroP);
        gyro_y.push(dataObj.gyroY);
        accel_r.push(dataObj.accelR);
        accel_p.push(dataObj.accelP);
        accel_y.push(dataObj.accelY);
        mag_r.push(dataObj.magR);
        mag_p.push(dataObj.magP);
        mag_y.push(dataObj.magY);

        // Data updation for 3d model
        if (threedmodel) {
            setTimeout(() => {
                create3dModel(dataObj);
                //table creation for 3d model
                createModelTable(dataObj);
            }, 250)
        };
        // getValues(dataObj);

        // TETHERED PAYLOAD CSV
        createTPTable(dataObj);

        // UPDATING PAYLOAD DATA
        packetCount.innerHTML = `${dataObj.pc}`;
        packetType.innerHTML = `${dataObj.pt}`;
        point_err.innerHTML = `${dataObj.pe}`;

        tp_transition_ss(dataObj.ss);
        // UPDATING GRAPHS
        alt.update();
        temp.update();
        volt.update();
        gyro.update();
        accel.update();
        mag.update();
    }
    else {
        console.error("Invalid Packet Type")
    }
})

socket.on('tpdata', (dataObj) => {
    // TETHERED PAYLOAD CSV
    createTPTable(dataObj); 

    if (threedmodel) {
        setTimeout(() => {
            create3dModel(dataObj);
            //table creation for 3d model
            createModelTable(dataObj);
        }, 250);
    };
});

socket.on('test',(data)=>{
    console.log(data);
})

// Graph and CSV display
const btns = [document.querySelector('#graphs'), document.querySelector('#csv'), document.querySelector('#model')];
const btnDisplay = [document.querySelector('#graph-container'), document.querySelector('#csv-container'), document.querySelector('#model-container')];


btns.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
        setTimeout(function () { mymap.invalidateSize() }, 400);
        btnDisplay.forEach((open) => {
            let x = e.target.classList[2]
            if (open.classList.contains(x)) {
                if(index===2){
                    threedmodel=true;
                } else {
                    threedmodel=false;
                }
                open.style = "display: block;"
            }
            else {
                open.style = "display: none;"
            }
        })
    })
})

// CSV Table Display
const arr_csv_btns = [document.querySelector('#con_csv'), document.querySelector('#tp_csv')];
arr_csv_btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        if (e.target.id == "tp_csv") {
            document.querySelector('#tp_table').style = "display: block;"
            document.querySelector('#container_table').style = "display: none;"
        }
        else {
            document.querySelector('#tp_table').style = "display: none;"
            document.querySelector('#container_table').style = "display: block;"
        }
    })
})

// Start and Stop Button
let startFlag = 0;
let stopFlag = 0;
document.querySelector('#start').addEventListener('click', async () => {
    if (startFlag == 0) {
        const com = document.querySelector('#com').value
        const baud = document.querySelector('#baudRate').value
        // console.log(com,baud)
        await socket.emit('start',({com,baud}));
        writeOnSerial('1');
        startFlag = 1;
    }
})

document.querySelector('#stop').addEventListener('click', async () => {
    if (stopFlag == 0) {
        await socket.emit('stop');
        writeOnSerial('2');
        stopFlag = 1;
        socket.disconnect();
    }
})


document.querySelector('#baudRate').addEventListener('change',(e)=>{
    socket.emit('baud',e.target.value)
})

const getCOMPorts = async () => {
    const res = await fetch('http://localhost:5000/com');
    const coms = await res.json();
    // console.log(coms)
    const options = coms.map( (com) => { 
        const option = document.createElement("option");
        option.innerHTML = `${com}`;
        option.value = `${com}`;
        return option;
    })
    options.forEach( (option) => {
        document.querySelector('#com').appendChild(option)
    })
}
getCOMPorts();

let checkBoxFlag = 0;

document.querySelector('#sim-switch').addEventListener('click', (e)=>{
    if( e.target.checked ) {
        sim_enable = true;
        writeOnSerial('6');
        sim_activate = true;
        writeOnSerial('7');
    } else {
        sim_enable = false;
        sim_activate = false;
        writeOnSerial('8')
    }
})

document.querySelector('#downloadDOM').addEventListener('click', async () => {
    save_data();
})

document.querySelector('#calibrate').addEventListener( 'click', (e) => {
    if(startFlag == 0) {
        const local =JSON.parse(document.getElementById("saved_data").innerHTML);
        updateAlt(strToFloat(local["container_alt"]),strToFloat(local["tp_alt"]),strToFloat(local["time"]))
        updateVolt(strToFloat(local["container_volt"]) , strToFloat(local["tp_volt"]) , strToFloat(local["time"]) )
        updateTemp(strToFloat(local["container_temp"]) , strToFloat(local["tp_temp"]) , strToFloat(local["time"]) )
        updateGyro(strToFloat(local["gyro_r"]) , strToFloat(local["gyro_y"]) ,  strToFloat(local["gyro_p"]) ,strToFloat(local["time"]) )
        updateAccel(strToFloat(local["accel_r"]) , strToFloat(local["accel_y"]) ,  strToFloat(local["accel_p"]) ,strToFloat(local["time"]) )
        updateMag(strToFloat(local["mag_r"]) , strToFloat(local["mag_y"]) ,  strToFloat(local["mag_p"]) ,strToFloat(local["time"]) )
        // lastThreeTime = lastThreeTime.concat(local["lastThreeTime"])

        // For 3D Chart
        let newLat = local["lat"], newLong = local["long"], newAlt = local["alt"];

        for( let i = 0; i < newLat.length; i++) {
            const dataObj = {
                gpslat: parseFloat(newLat[i]), 
                gpslong: parseFloat(newLong[i]), 
                gpsalt: parseFloat(newAlt[i]), 
            }
            create3dChart(dataObj);
        }

        // For 3D Model
        // const newGyroR=strToFloat(local["gyro_r"]) , newGyroY=strToFloat(local["gyro_y"]) ,  newGyroP=strToFloat(local["gyro_p"]) ;
        // for( let i = 0; i < newGyroP.length; i++) {
        //     const dataObject = {
        //         gyroP: parseFloat(newGyroP[i]), 
        //         gyroR: parseFloat(newGyroR[i]), 
        //         gyroY: parseFloat(newGyroY[i]), 
        //     }
        //     create3dModel(dataObject);
        // }
    }
})

const save_data = () => {
    const lat=[],long=[],alt=[];
    const vals = threeData._data.values()
    while(true){
        if(vals.next().value === undefined) break;
        const {x,y,z} = vals.next().value;
        lat.push(x)
        long.push(y)
        alt.push(z)
        if(vals.next().done===true) break;
    }
    const local = {
        time,
        lastThreeTime,
        container_alt,
        tp_alt,
        container_temp,
        tp_temp,
        container_volt,
        tp_volt,
        gyro_r,
        gyro_p,
        gyro_y,
        accel_r,
        accel_p,
        accel_y,
        mag_r,
        mag_y,
        mag_p,
        lat,
        long,
        alt
    }
    document.getElementById("saved_data").innerHTML=JSON.stringify(local);
    // localStorage.setItem("local",JSON.stringify(local));

    // Code to download (Save as or Ctrl+S)
    socket.emit('save-state', document.querySelector('html').innerHTML)

    document.getElementById("saved_data").innerHTML = "";
}

// convert string values of JSON to number
const strToFloat = (data)=>{
	let newArr = [];
	for(let d=0;d<data.length;d++){
		if(data[d]!==undefined && data[d]!==null){
			newArr.push(parseFloat(data[d]))
		}
	}
	return newArr;
}

//update charts with JSON values
const updateAlt=(ca,ta,t)=>{
	for(let i=0;i<t.length;i++){
		time.push(t[i]);
		container_alt.push(ca[i]);
		tp_alt.push(ta[i])
		alt.update();
	}
    time.length=0;
}
const updateVolt=(cv,tv,t)=>{
	for(let i=0;i<t.length;i++){
		time.push(t[i]);
		container_volt.push(cv[i]);
		tp_volt.push(tv[i])
		volt.update();
	}
    time.length=0;
}
const updateTemp=(ct,tt,t)=>{
	for(let i=0;i<t.length;i++){
		time.push(t[i]);
		container_temp.push(ct[i]);
		tp_temp.push(tt[i])
		temp.update();
	}
    time.length=0;
}
const updateMag=(mr,my,mp,t)=>{
	for(let i=0;i<t.length;i++){
		lastThreeTime.push(t[i]);
		mag_p.push(mp[i]);
		mag_r.push(mr[i]);
		mag_y.push(my[i]);
		mag.update();
	}
    lastThreeTime.length=0;
}
const updateGyro=(gr,gy,gp,t)=>{
	for(let i=0;i<t.length;i++){
		lastThreeTime.push(t[i]);
		gyro_p.push(gp[i]);
		gyro_r.push(gr[i]);
		gyro_y.push(gy[i]);
		gyro.update();
	}
    lastThreeTime.length=0;
}
const updateAccel=(ar,ay,ap,t)=>{
	for(let i=0;i<t.length;i++){
		lastThreeTime.push(t[i]);
		accel_p.push(ap[i]);
		accel_r.push(ar[i]);
		accel_y.push(ay[i]);
		accel.update();
	}
    lastThreeTime.length=0;
}