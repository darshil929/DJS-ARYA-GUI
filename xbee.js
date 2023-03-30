
/*********** Libraries ***********/
// Environment variables   
require('dotenv').config()

// Hardware Interface
const { SerialPort }  = require('serialport');
const xbee_api = require('xbee-api');
const xbee = require('xbee')

// HTTP Server
const express = require('express')
const cors = require('cors')

// SocketIO
const socket = require('socket.io')

// API Request
const axios = require('axios')

// Inbuilt Libraries
const fs = require('fs')
const path = require('path')


// Library Functions
// const { makeCSV } = require('./lib/file')
// const { parsePacket } = require('./lib/parse');
const { log } = require('console');


/************ XBEE Setup ************/

const C = xbee_api.constants

const BAUDRATE = Number(process.env.BAUDRATE) || 9600
const SERIAL_PORT = process.env.SERIAL_PORT || "COM3"

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

port.open()

/* !!!!! REFACTOR !!!! */

// const frame_obj = {
//     type: C.FRAME_TYPE.AT_COMMAND,
//     command: "1",
//     commandParameter: [],
// }

// const test = xbeeAPI.buildFrame(frame_obj).slice(5,-1)
// port.write(test)

/* !!!!! REFACTOR !!!! */

/************ Express Setup ************/

const HTTP_PORT = process.env.HTTP_PORT || 5000

const app = express()
app.use(cors())
app.use(express.static('public'))
const server = app.listen(HTTP_PORT, () => {
    console.log("Listening at port " + HTTP_PORT)
});


/************ Socket Setup ************/

const io = socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    },
})
io.sockets.on('connection', connect)

function connect(s) {
    console.log(`Socket id: ${s.id} [Connected]`)
    let socketIsAlive = true

    s.on('disconnect', () => {
        console.log(`Socket id: ${s.id} [Disconnected]`)
        socketIsAlive = false;
    })

    let packet = ""

    port.on("data", (data) => {
        if (socketIsAlive) {
            if (data.toString() === '\n') {

                // console.log(packet)

                makeCSV(packet + "\n")
                const dataArr = packet.split(",")
                const dataObj = new parsePacket(dataArr)
                s.emit('packet', dataObj)
                packet = ""
            }
            else {
                packet += data.toString()
            }
        }
    })

    s.on('start', () => {

        // console.log("start")

        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: "1",
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1)
        port.write(test)
    })

    s.on('stop', () => {

        // console.log("stop")

        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: "2",
            commandParameter: [],
        }

        const test = xbeeAPI.buildFrame(frame_obj).slice(5, -1)
        port.write(test)
    })

//     /*************** Dev Testing *****************/

//     // const dataArr = [
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//     // ]

//     // const sendData = (i) => {
//     //     const tempDataArr = dataArr[i]
//     //     const dataObj = new parsePacket(tempDataArr)
//     //     makeCSV(tempDataArr.toString()+"\n")
//     //     s.emit('packet', dataObj)
//     //     setTimeout(()=>{
//     //         sendData(i+1)
//     //     }, 1000)
//     // }

//     // setTimeout(()=>{
//     //     sendData(0)
//     // }, 0)

//     /*************** Dev Testing *****************/
}