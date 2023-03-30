
/* LIBRARIES */
const fs = require('fs');
const { SerialPort }  = require('serialport');
const xbee_api = require('xbee-api');
const xbee = require('xbee');
// const fs = require('fs'); 
const express = require('express');
const app = express();
const server = require('http').createServer(app);
// const path = require('path');
const cors = require('cors');
const makeCSV = require('./utils/makeCSV.js');
const parse = require('./utils/parse.js');

/* XBEE Setup */
const C = xbee_api.constants

const BAUDRATE = Number(process.env.BAUDRATE) || 9600
const SERIAL_PORT = process.env.SERIAL_PORT || "COM5"

// const serialport = new SerialPort({ path: SERIAL_PORT, baudRate: 9600 })
// serialport.write('ROBOT POWER ON')

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

// fs.readFile('./simp/sample_pressure.txt', async (error, data) => {
//     let simp = [];
//     data = String(data).split("\n");
//     data.forEach(elem => {
//         if (elem[0] != '#' && elem != "")
//             simp.push(elem);
//     });
//     const pressure = [];
//     simp.forEach((elem) => {
//         pressure.push("6" + '-' + elem.split(",")[3]);
//     });

//     let i = 0;
//     const id = setInterval(() => {
//         // if (pressure.length > i ) console.log(pressure[i]);
//         if (pressure.length > i) {
//             console.log(pressure[i]);
//             port.write(pressure[i]);
//         } else {
//             console.log('exiting');
//             clearInterval(id);
//         }
//         i++;
//     }, 1000);
// })

/* Socket Setup */
const io = require('socket.io')(server, { 
    cors: { 
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    } 
});

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
                socket.emit('packet', dataObj);
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

    socket.on('set-time', (data) => {
        console.log(`set-time: ${data}`);

        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: `3-${data}`,
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        port.write(test);
    });

    socket.on('sim-enable', () => {
        console.log('sim-enable');

        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: "4",
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        port.write(test);
    });

    socket.on('sim-disable', () => {
        console.log("sim-disable");

        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: "7",
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        port.write(test);
    })

    socket.on('sim-activate', () => {
        console.log("sim-activate");
        fs.readFile('./simp/sample_pressure.txt', (err, data) => {
            let simpArray = [];
            eachLine = String(data).split("\n");
            eachLine.forEach(item => {
                if (item[0] != '#' && item != "")
                    simpArray.push(item);
            });
            let pressure = [];
            simpArray.forEach((item) => {
                pressure.push("6" + '-' + item.split(",")[3]);
            });
        
            let i = 0;
            const id = setInterval(() => {
                if (pressure.length > i) {
                    console.log(pressure[i]);
                    port.write(pressure[i]);
                } else {
                    console.log('exiting');
                    clearInterval(id);
                }
                i++;
            }, 1000);
        })
        // const frame_obj = {
        //     type: C.FRAME_TYPE.AT_COMMAND,
        //     command: "5",
        //     commandParameter: [],
        // }

        // const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        
        // port.write(test);
    })
    
    socket.on('simp', (data) => {
        console.log(`simp: ${data}`);

        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: `6-${data}`,
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        console.log(test.length);
        port.write(test);
    });
    
    socket.on('cal', () => {
        console.log("cal");

        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: "0",
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        port.write(test);
    })
    
    socket.on('pcr', () => {
        console.log("packet count reset");

        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: "8",
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        port.write(test);
    });

    socket.on('hs-start', () => {
        console.log("heat shield start");

        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: "a",
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        port.write(test);
    });

    socket.on('hs-stop', () => {
        console.log("heat shield stop");
        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: "A",
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        port.write(test);
    });
    
    socket.on('ps', () => {
        console.log("parachute servo");

        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: "b",
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        port.write(test);
    });
    
    socket.on('fs', () => {
        console.log("flag servo");

        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: "c",
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        port.write(test);
    });
})

// // Something we might want to send to an XBee...
// const frame_obj = {
//     type: C.FRAME_TYPE.AT_COMMAND,
//     command: "2",
//     commandParameter: [],
// }
// const test = xbeeAPI.buildFrame(frame_obj).slice(5,-1)
// console.log(test.length)
// serial_xbee.write(test)

// console.log(xbeeAPI.buildFrame(frame_obj))
// <Buffer 7e 00 04 08 01 4e 49 5f>

// function connect(s) {

//     console.log(`Socket id: ${s.id} [Connected]`);
//     let socketIsAlive = true;
//     let portIsAlive = false;

//     // s.on('disconnect', () => {
//     //     console.log(`Socket id: ${s.id} [Disconnected]`);
//     //     console.log(`Total sockets after disconnection: ${io.engine.clientsCount}`);
//     //     // console.log(port)
//     //     if(portIsAlive){
//     //         if(port.isOpen){
//     //             console.log(port.isOpen);
//     //             port.close();
//     //             console.log(port.isOpen);
//     //         }}
//     //         socketIsAlive = false;
//     //     })

//     // s.on('cmd', (cmd) => {
//     //     const arrCmd = cmd.split(',');
//     //     cmd_echo = arrCmd[2] + "_" + arrCmd[3];
//     //     port.write(cmd_echo);
//     // });

//     s.on('start', async ({ com, baud }) => {
//         try {
//             // console.log(com,baud)
//             const port = new SerialPort(com, {
//                 baudRate: parseInt(baud),
//                 autoOpen: false,
//                 // parser: xbeeAPI.rawParser()
//             });

//             // xbeeAPI.on("frame_object", function (frame) {
//             //     console.log(">>", frame);
//             // });

//             s.on('disconnect', () => {
//                 console.log(`Socket id: ${s.id} [Disconnected]`);
//                 console.log(`Total sockets after disconnection: ${io.engine.clientsCount}`);
//                 // console.log(port)
//                 if (portIsAlive) {
//                     if (port.isOpen) {
//                         port.close();
//                     }
//                 }
//                 socketIsAlive = false;
//             });
//             port.on('open', () => {
//                 portIsAlive = true;
//                 port.flush();
//                 console.log(`Port opened at ${port.path} at ${port.settings.baudRate} baudrate`);
//             });

//             port.on('error', (error) => {
//                 console.log(`Error with opening COM port: ${error}`);
//             });

//             port.open();
//             port.pipe(parser);

//             s.on('baud', (baud) => {
//                 baud = parseInt(baud);
//                 port.update({ baudRate: baud });
//                 console.log(`Port baudrate changed to ${port.settings.baudRate}`);
//             })

//             s.on('cmd', (cmd) => {
//                 if (cmd === '9') {
//                     fs.readFile('./test_pressure.txt', async (error, data) => {
//                         let simp = [];
//                         data = data.toString().split("\n");
//                         data.forEach(elem => {
//                             if (elem[0] != '#' && elem != "")
//                                 simp.push(elem);
//                         });
//                         const pressure = [];
//                         simp.forEach((elem) => {
//                             pressure.push(cmd + '-' + elem.split(",")[3]);
//                         });

//                         let i = 0;
//                         const id = setInterval(() => {
//                             // if (pressure.length > i ) console.log(pressure[i]);
//                             if (pressure.length > i) {
//                                 // console.log(pressure[i]);
//                                 port.write(pressure[i]);
//                             } else {
//                                 console.log('exiting');
//                                 clearInterval(id);
//                             }
//                             i++;
//                         }, 1000);
//                     })
//                 } else {
//                     // port.write(cmd);
//                     // frame_obj.command = cmd
//                     // Something we might want to send to an XBee...
//                     const frame_obj = {
//                         type: C.FRAME_TYPE.AT_COMMAND,
//                         command: cmd,
//                         commandParameter: [],
//                     }
//                     const cleanFrame = xbeeAPI.buildFrame(frame_obj).slice(5, -1)
//                     serial_xbee.write(cleanFrame)
//                     // console.log(xbeeAPI.buildFrame(frame_obj).length)
//                     // serial_xbee.write(xbeeAPI.buildFrame(frame_obj))
//                 }
//             });
//             s.on('stop', async () => {
//                 s.disconnect();
//                 port.close(() => { });
//             });
//         } catch (error) {
//             console.log(`Error with start command: ${error.message}`)
//             console.log("Refresh page to retry")
//         }
//     })

//     s.on('save-state', async (data) => {
//         // console.log(data)  
//         const newData = data.replaceAll("./js", "../js").replaceAll('./css', "../css").replaceAll('./lib', "../lib").replaceAll("./images", "../images")
//         // console.log(newData)
//         await saveState(`<!DOCTYPE html><html lang="en">${newData}</html>`)
//     })

//     const parser = new Readline();
//     parser.on("data", (line) => {
//         // if (!(socketIsAlive)) return;
//         console.log(line)
//         s.emit('test', line)
//     });
// }

// const cmdMap = (cmd, data) => {
//     switch (cmd) {
//         case '0':
//             cmd_echo = 'CAL'
//             break;
//         case '1':
//             cmd_echo = 'CXON'
//             break;
//         case '2':
//             cmd_echo = 'CXOFF'
//             break;
//         case '3':
//             cmd_echo = `ST${data}`
//             break;
//         case '4':
//             cmd_echo = 'SIMP-ENABLE'
//             break;
//         case '5':
//             cmd_echo = 'SIMP-ACTIVATE'
//             break;
//         case '6':
//             cmd_echo = `SIMP${data}`
//             break;
//         case '7':
//             cmd_echo = 'SIM DISABLE'
//             break;
//         case '8':
//             cmd_echo = 'Packet Count Reset'
//             break;
//         case 'a':
//             cmd_echo = 'Heat Shield Start'
//             break;
//         case 'A':
//             cmd_echo = 'Heat Shield Stop'
//             break;
//         case 'b':
//             cmd_echo = 'Parachute Servo'
//             break;
//         case 'c':
//             cmd_echo = 'Flag Servo'
//             break;

//         default:
//             break;
//     }
// }

// const serial_xbee = new SerialPort("COM4", {
//     parser: xbee.packetParser()
// }, () => {
//     // console.log(serial_xbee);
// });

// let packet = ""

// serial_xbee.on("data", function (data) {
//     if (data.toString() === '\n') {
//         console.log(packet)
//         packet = ""
//     }
//     else {
//         packet += data.toString()
//     }
// });