/* LIBRARIES */
require('dotenv').config();
const { SerialPort } = require('serialport');
const xbee_api = require('xbee-api');
const xbee = require('xbee');
const fs = require('fs'); 
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const makeCSV = require('./utils/makeCSV.js');
const parse = require('./utils/parse.js');

/* XBEE Setup */
const C = xbee_api.constants

const BAUDRATE = Number(process.env.BAUDRATE) || 9600
const SERIAL_PORT = process.env.SERIAL_PORT || "COM3"

const xbeeAPI = new xbee_api.XBeeAPI({
    api_mode: 1
})

const port = new SerialPort({
    path: SERIAL_PORT,
    parser: xbee.packetParser(),
    baudRate: BAUDRATE,
    autoOpen: false
})

port.on('open', () => {
    portIsAlive = true
    port.flush()
    console.log(`Port opened at ${port.path} at ${port.settings.baudRate} baudrate`)
})

port.on('error', (error) => {
    console.log(`Error with opening COM port: ${error}`)
})

port.open();

/* Express Setup */
const HTTP_PORT = process.env.HTTP_PORT || 5000;

app.use(cors());
app.use(express.static("public"));

server.listen(HTTP_PORT, () => {
    console.log(`Server is UP on port ${HTTP_PORT}`);
});

/* Socket Setup */
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

let simFlag = 0;
io.on('connection', (socket) => {
    console.log(`Connected: ${socket.id}`);
    let socketIsAlive = true;

    socket.on('disconnect', () => {
        console.log(`Disconnected: ${socket.id}`);
        socketIsAlive = false;
    });

    let packet = "";

    port.on("data", (data) => {
        if (socketIsAlive) {
            if (data.toString() === '\n') {
                console.log(packet);

                makeCSV(packet + "\n");
                const dataArr = packet.split(",");
                const dataObj = parse(dataArr);
                socket.emit('data', dataObj);
                packet = "";
            }
            else {
                packet += data.toString();
            }
        }
    });

    socket.on('start', () => {
        console.log("start");

        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: "1",
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        port.write(test);
    })

    socket.on('stop', () => {
        console.log("stop");

        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: "2",
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        port.write(test);
    });

    socket.on('hs-start', () => {
        console.log("heat shield start");

        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: "3",
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        port.write(test);
    });

    socket.on('hs-stop', () => {
        console.log("heat shield stop");
        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: "4",
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        port.write(test);
    });

    socket.on('hs-close', () => {
        console.log("heat shield close");
        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: "5",
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        port.write(test);
    });

    socket.on('ps', () => {
        console.log("parachute in stowed");

        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: "6",
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        port.write(test);
    });

    socket.on('po', () => {
        console.log("parachute opens");

        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: "7",
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        port.write(test);
    });

    socket.on('set-time', (data) => {
        console.log(`set-time: ${data}`);

        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: `b-${data}-`,
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        port.write(test);
    });

    socket.on('sim-enable', () => {
        console.log('sim-enable');
        simFlag = 1;
        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: "e",
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        port.write(test);
    });

    socket.on('sim-disable', () => {
        console.log("sim-disable");
        simFlag = 0;
        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: "d",
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        port.write(test);
    })

    socket.on('sim-activate', () => {
        if (simFlag == 1) {
            console.log("sim-activate");

            fs.readFile('simp.txt', async (error, data) => {
                let simp = [];
                data = data.toString().split("\r\n");
                // console.log(data);
                data.forEach(elem => {
                    if (elem[0] != '#' && elem != '')
                        simp.push(elem);
                });

                const pressure = [];
                simp.forEach((elem) => {
                    pressure.push("6" + '-' + elem.split(",")[3] + '-');
                });

                let i = 0;
                const id = setInterval(() => {
                if (pressure.length > i ) console.log(pressure[i]);
                    if (simFlag == 1) {
                        if (pressure.length > i) {
                            console.log(pressure[i]);
                        }
                    } else {
                        clearInterval(id);
                    }
                    i++;
                }, 1000);
            })

            const frame_obj = {
                type: C.FRAME_TYPE.AT_COMMAND,
                command: "6",
                commandParameter: [],
            }

            const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
            port.write(test);
        }
        else {
            console.log('SIM DISABLED!');
        }
    }
    );


    socket.on('simp', (data) => {
        console.log(`simp: ${data}`);

        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: `6-${data}-`,
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        port.write(test);
    });

    socket.on('cal', () => {
        console.log("cal");

        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: "a",
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        port.write(test);
    })

    socket.on('pcr', () => {
        console.log("packet count reset");

        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: "p",
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        port.write(test);
    });

    socket.on('fs', () => {
        console.log("flag in stowed");

        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: "8",
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        port.write(test);
    });

    socket.on('fu', () => {
        console.log("flag upright");

        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: "9",
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        port.write(test);
    });

    socket.on('custom', (data) => {
        data = data.join("");
        // console.log("custom-" + data);
        console.log(data);

        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: data,
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        port.write(test);
    });
})