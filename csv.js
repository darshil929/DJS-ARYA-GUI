/* LIBRARIES */
import dotenv from 'dotenv';
import { SerialPort } from 'serialport';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import axios from 'axios';
import readCSV from './utils/readCSV.js';
import prompt_sync from "prompt-sync";
const prompt = prompt_sync();
dotenv.config();

/* Prompt from User */
const FILENAME = prompt('Enter Filename: ');
console.log("");

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

    socket.on('start', () => {
        console.log("start");

        if(FILENAME.split(".")[1] === "csv") {
            readCSV(socket, FILENAME);
        } else {
            console.log("Not a csv file")
        }
    });

    socket.on('disconnect', () => {
        console.log(`Disconnected: ${socket.id}`);
        console.log(`Total sockets after disconnection: ${io.engine.clientsCount}`);
    });
})