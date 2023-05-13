/* LIBRARIES */
import dotenv from 'dotenv';
import { SerialPort } from 'serialport';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import axios from 'axios';
import events from './utils/events.js';
import Port from './utils/port.js';
import commandMap from './utils/commandMap.js';
dotenv.config();

// const BAUDRATE = Number(process.env.BAUDRATE) || 9600
// const SERIAL_PORT = process.env.SERIAL_PORT || "COM3"

/* Ping Tile Server */
const pingTile = async () => {
    try {
        const res = await axios.get('http://localhost:5001');
        console.log(`${res.data.msg}`)
    } catch (error) {
        console.log(error.message)
        console.log("Tile server not found")
    }
}
pingTile();

/* Express Setup */
const HTTP_PORT = process.env.HTTP_PORT || 5000;

const app = express();
app.use(cors());
app.use(express.static("public"));

const server = app.listen(HTTP_PORT, () => {
    console.log(`Server is UP on port ${HTTP_PORT}`);
});

/* Available COM Ports */
app.get('/com',async (req, res) => {
    try {
        const result = await SerialPort.list();
        const coms = result.map((com)=>{
            return com.path
        })
        return res.status(200).json(coms)
    } catch (error) {
        console.log(error.message)
    }
});

/* Socket Setup */
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

io.on('connection', (socket) => {
    console.log(`Connected: ${socket.id}`);
    const port = new Port();

    socket.on('start', ({com, baud}) => {
        console.log("start");

        port.initialisation(com, baud, false, true);
        port.write(commandMap("start"));
        port.events(socket);

        socket.on('baud', (baud) => {
            baud = parseInt(baud);
            port.updateBaudRate(baud);
        });
    
        events(port, socket);
    });

    socket.on('disconnect', () => {
        console.log(`Disconnected: ${socket.id}`);
        console.log(`Total sockets after disconnection: ${io.engine.clientsCount}`);

        if (port.isPortALive()) {
            port.check();
        }

        port.updateSocketLife();
    });
})