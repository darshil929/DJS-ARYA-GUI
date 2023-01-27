const express = require('express')
const socket = require('socket.io')
const fs = require('fs')
const axios = require('axios')
const SerialPort = require('serialport');
const {parseContainer, parsePayload} = require("./src/parse")
const {sendMQTT} = require("./src/mqtt")

const app = express()

app.use(express.static('public'))

const server = app.listen( 5000, () => {
    console.log("Listening at port 5000")
})

app.get('/com',async (req, res) => {
    const result = await SerialPort.list();
    const coms = result.map((com)=>{
        return com.path
    })
    // console.log(coms)
    return res.status(200).json(coms)
})

const pingTile = async () => {
    try {
        const res = await axios.get('http://localhost:5001');
        console.log(`${res.data.msg}`)
    } catch (error) {
        console.log("Tile server not found")
    }
}
pingTile()

const CFilePath = "./FILES/ContainerDummy.txt" // process.argv[2]
const TPFilePath = "./FILES/Payload_Dummy.txt" //process.argv[3]


const io = socket(server);
io.sockets.on('connection', connect);


var stringC;
fs.readFile(CFilePath, (err, data) => {
    stringC = data.toString();
})

var stringT;
fs.readFile(TPFilePath, (err, data) => {
    stringT = data.toString();
})

function connect (s) {
    let cnt = 0, cntTP=1;
    const lineC = stringC.split('\n');
    const lineT = stringT.split('\n');

    /** ----------------- MQTT SCREENSHOT -------------------**/
    // var interval = setInterval(function () {
    //         if(lineC.length!==0){
    //             const arrDataC = lineC[cnt].split(',');
    //             const newLineC = arrDataC.toString()+"\n";
    //             const dataObjC = parseContainer(arrDataC);
    //             console.log(dataObjC)
    //             s.emit("data", dataObjC);
    //         }
    //         // sendMQTT(newLineC);
    //         const arrDataT = lineT[cnt].split(',');
    //         const dataObjT = parsePayload(arrDataT);
    //         s.emit("data", dataObjT);
    //         const newLineT = arrDataT.toString()+"\n";
    //         // sendMQTT(newLineT);
    //         cnt = cnt + 1;
    //     if (cnt === 68) clearInterval(interval);
    // }, 1);
    
    
    let containerAlt=0;
    let containerSS=0;
    /** -------------------------- ENV TEST ---------------------- **/
    var interval = setInterval(function () {
        if(lineC[cnt] !== undefined){
            const arrDataC = lineC[cnt].split(',');
            const dataObjC = parseContainer(arrDataC);
            containerAlt = dataObjC.alt;
            containerSS = dataObjC.ss;
            s.emit("data",dataObjC);
            // console.log(dataObjC);
        }
        if (containerSS<6){
            
        }
        if(lineT[cntTP] !== undefined && containerSS===6){
            // console.log(cntTP);
            const arrDataT = lineT[cntTP].split(',');
            const dataObjT = parsePayload(arrDataT);
            s.emit("data",dataObjT);
            // console.log(dataObjT);
            cntTP=cntTP+4;
        }
        cnt = cnt+1;
        // console.log(lineC[cnt]);
        // console.log(lineT[cntTP]);
        if (lineT[cntTP]===undefined) clearInterval(interval);
    }, 10);
}




