//Import dependencies
require('dotenv').config()
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const express = require('express')
const socket = require('socket.io')
const { makeCSV, saveState } = require('./src/file')
const { parsePayload, parseContainer } = require('./src/parse')
const { sendMQTT } = require('./src/mqtt')
const cors = require('cors')
const fs = require('fs')
const axios = require('axios')
const path = require('path')
const xbee_api = require('xbee-api');
const xbee = require('xbee')

const C = xbee_api.constants;

const xbeeAPI = new xbee_api.XBeeAPI({
    api_mode: 1
});


const app = express();
app.use(cors());
app.use(express.static('public'));
const server = app.listen(5000, () => {
    console.log("Listening at port 5000");
});

app.get('/com', async (req, res) => {
    const result = await SerialPort.list();
    const coms = result.map((com) => {
        return com.path
    })
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

const modeOfOperation = 0; // 0 = one packet at a time, 1 = all 5 packets separated with delimeter '\n'

// const comPort = "COM3"

// let port = new SerialPort(comPort, {
//     baudRate: 9600,
//     autoOpen: false
// });

// const parser = new Readline();
// port.pipe(parser);
// port.on('open', () => {
//     port.flush();
//     console.log(`Port opened at ${port.path} at ${port.settings.baudRate} baudrate`);
// });
// port.on('error', (error) => {
//     console.log(error," put error message of error at port");
// });

const io = socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    },
});
io.sockets.on('connection', connect);

let tpPacketCount = 0;
let SS;
let cmd_echo = '';

const serial_xbee = new SerialPort("COM4", {
    parser: xbee.packetParser()
}, () => {
    // console.log(serial_xbee);
});

let packet = ""

serial_xbee.on("data", function (data) {
    if (data.toString() === '\n') {
        console.log(packet)
        packet = ""
    }
    else {
        packet += data.toString()
    }
});

// // Something we might want to send to an XBee...
const frame_obj = {
    type: C.FRAME_TYPE.AT_COMMAND,
    command: "2",
    commandParameter: [],
}
const test = xbeeAPI.buildFrame(frame_obj).slice(5,-1)
console.log(test.length)
serial_xbee.write(test)

// console.log(xbeeAPI.buildFrame(frame_obj))
// <Buffer 7e 00 04 08 01 4e 49 5f>

function connect(s) {

    console.log(`Socket id: ${s.id} [Connected]`);
    let socketIsAlive = true;
    let portIsAlive = false;

    // s.on('disconnect', () => {
    //     console.log(`Socket id: ${s.id} [Disconnected]`);
    //     console.log(`Total sockets after disconnection: ${io.engine.clientsCount}`);
    //     // console.log(port)
    //     if(portIsAlive){
    //         if(port.isOpen){
    //             console.log(port.isOpen);
    //             port.close();
    //             console.log(port.isOpen);
    //         }}
    //         socketIsAlive = false;
    //     })

    // s.on('cmd', (cmd) => {
    //     const arrCmd = cmd.split(',');
    //     cmd_echo = arrCmd[2] + "_" + arrCmd[3];
    //     port.write(cmd_echo);
    // });

    s.on('start', async ({ com, baud }) => {
        try {
            // console.log(com,baud)
            const port = new SerialPort(com, {
                baudRate: parseInt(baud),
                autoOpen: false,
                // parser: xbeeAPI.rawParser()
            });

            // xbeeAPI.on("frame_object", function (frame) {
            //     console.log(">>", frame);
            // });

            s.on('disconnect', () => {
                console.log(`Socket id: ${s.id} [Disconnected]`);
                console.log(`Total sockets after disconnection: ${io.engine.clientsCount}`);
                // console.log(port)
                if (portIsAlive) {
                    if (port.isOpen) {
                        port.close();
                    }
                }
                socketIsAlive = false;
            });
            port.on('open', () => {
                portIsAlive = true;
                port.flush();
                console.log(`Port opened at ${port.path} at ${port.settings.baudRate} baudrate`);
            });

            port.on('error', (error) => {
                console.log(`Error with opening COM port: ${error}`);
            });

            port.open();
            port.pipe(parser);

            s.on('baud', (baud) => {
                baud = parseInt(baud);
                port.update({ baudRate: baud });
                console.log(`Port baudrate changed to ${port.settings.baudRate}`);
            })

            s.on('cmd', (cmd) => {
                if (cmd === '9') {
                    fs.readFile('./test_pressure.txt', async (error, data) => {
                        let simp = [];
                        data = data.toString().split("\n");
                        data.forEach(elem => {
                            if (elem[0] != '#' && elem != "")
                                simp.push(elem);
                        });
                        const pressure = [];
                        simp.forEach((elem) => {
                            pressure.push(cmd + '-' + elem.split(",")[3]);
                        });

                        let i = 0;
                        const id = setInterval(() => {
                            // if (pressure.length > i ) console.log(pressure[i]);
                            if (pressure.length > i) {
                                // console.log(pressure[i]);
                                port.write(pressure[i]);
                            } else {
                                console.log('exiting');
                                clearInterval(id);
                            }
                            i++;
                        }, 1000);
                    })
                } else {
                    // port.write(cmd);
                    // frame_obj.command = cmd
                    // Something we might want to send to an XBee...
                    const frame_obj = {
                        type: C.FRAME_TYPE.AT_COMMAND,
                        command: cmd,
                        commandParameter: [],
                    }
                    const cleanFrame = xbeeAPI.buildFrame(frame_obj).slice(5, -1)
                    serial_xbee.write(cleanFrame)
                    // console.log(xbeeAPI.buildFrame(frame_obj).length)
                    // serial_xbee.write(xbeeAPI.buildFrame(frame_obj))
                }
            });
            s.on('stop', async () => {
                s.disconnect();
                port.close(() => { });
            });
        } catch (error) {
            console.log(`Error with start command: ${error.message}`)
            console.log("Refresh page to retry")
        }
    })

    s.on('save-state', async (data) => {
        // console.log(data)  
        const newData = data.replaceAll("./js", "../js").replaceAll('./css', "../css").replaceAll('./lib', "../lib").replaceAll("./images", "../images")
        // console.log(newData)
        await saveState(`<!DOCTYPE html><html lang="en">${newData}</html>`)
    })

    const parser = new Readline();
    parser.on("data", (line) => {
        // if (!(socketIsAlive)) return;
        console.log(line)
        s.emit('test', line)
        // if (modeOfOperation === 0) {
        //     const data = line.split(",");   //Converting string to array
        //     let newLine;
        //     if(data[0] == '1004') {
        //         if (data[3] == 'C') {
        //             cmdMap(data[data.length - 1][0],data[data.length - 1].substring(2));
        //             data[data.length - 1] = cmd_echo;
        //             SS = data[14];
        //             newLine = data.toString() + "\n";
        //             // console.log(newLine)
        //         }
        //         else {
        //             newLine = data.toString() + "\n";
        //         }
        //         let obj = {};     //declaring object
        //         // if container telemetry data
        //         if (data[3] == 'C') {
        //             obj = parseContainer(data); // parsing array to object
        //             makeCSV(data[3], newLine); // making csv files
        //             s.emit('data', obj);    //emitting the object
        //             sendMQTT(newLine);
        //         }
        //         //if tethered payload telemetry data
        //         else if (data[3] == 'T') {
        //             // if(SS === '6' || SS === '7') {
        //                 obj = parsePayload(data) // parsing array to object
        //                 if (tpPacketCount === 0) {
        //                     s.emit('data', obj);
        //                 } else {
        //                     s.emit('tpdata',obj)
        //                 }
        //                 tpPacketCount++;
        //                 if (tpPacketCount === 4){
        //                     tpPacketCount = 0;
        //                 }

        //                 // s.emit('data', obj);    //emitting the object
        //                 makeCSV(data[3], newLine); // making csv files
        //                 sendMQTT(newLine);
        //             // }
        //         } else {
        //             console.log("Wrong Packet Type")
        //         }
        //     }
        // }
        // else if (modeOfOperation === 1) {
        //     // console.log(line);
        //     line.split("\n")
        //     // separate one container and one payload packet from the 5
        //     // .filter((elem, index) => {
        //         // if (index === 0 || index === 1) return true;
        //         // else return false;
        //     // })
        //     .forEach((elem,index) => {
        //         const data = elem.split(",");   //Converting string to array
        //         let newLine;
        //         // console.log(data);
        //         if(data[0] == '1004') {
        //             if (data[3] == 'C') {
        //                 // data[data.length - 1] = cmd_echo;
        //                 // console.log(cmd_echo);
        //                 newLine = data.toString() + "\n";
        //             }
        //             else {
        //                 newLine = elem;
        //             }
        //             let obj = {};     //declaring object
        //             //if container telemetry data
        //             if (data[3] == 'C') {
        //                 obj = parseContainer(data); // parsing array to object
        //             }
        //             //if tethered payload telemetry data
        //             else if(data[3] == 'T') {
        //                     obj = parsePayload(data); // parsing array to object
        //             }
        //             else {
        //                 console.log("Wrong Packet Type");
        //             }

        //             if (socketIsAlive) {
        //                 if (index === 0 || index === 1) {
        //                     makeCSV(data[3], newLine); // making csv files
        //                     s.emit('data', obj);    //emitting the object
        //                     sendMQTT(newLine); 
        //                 } else {
        //                     makeCSV(data[3], newLine);
        //                 }
        //             }
        //         }
        //     })
        // } else {
        //     throw new Error("Wrong Mode Of Operation");
        // }
    });
}

const cmdMap = (cmd, data) => {
    switch (cmd) {
        case '1':
            cmd_echo = 'CXON'
            break;
        case '2':
            cmd_echo = 'CXOFF'
            break;
        case '3':
            cmd_echo = `ST${data}`
            break;
        case '4':
            cmd_echo = 'TPXON'
            break;
        case '5':
            cmd_echo = 'TPXOFF'
            break;
        case '6':
            cmd_echo = 'SIMEN'
            break;
        case '7':
            cmd_echo = 'SIMAC'
            break;
        case '8':
            cmd_echo = 'SIMDIS'
            break;
        case '9':
            cmd_echo = `SIMP${data}`
            break;
        default:
            break;
    }
}
