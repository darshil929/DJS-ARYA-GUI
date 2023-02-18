// Run the GUI on Server

const fs = require('fs'); 
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*"} })
const path = require('path');
const makeCSV = require('./utils/makeCSV.js');

app.use(express.static("public"));

server.listen(3000,() => {
    console.log(`Server is UP on port 3000`);
})
let data;
try {
    const bufferData = fs.readFileSync('./test.csv')
    data = bufferData.toString();
} catch (error) {
    console.log(error)
}

data = data.split('\r\n');
data.shift();

// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000",
//     }
// });

io.on('connection', (socket) => {
    console.log(`Connected: ${socket.id}`);
    let interval;
    socket.on('click', (command) => {
        if(command === 'start') {
            console.log(command)
            let cntr = -1;
            interval = setInterval(() => {
                cntr++;
                if(cntr >= data.length-1) {
                    clearInterval(interval);
                }

                const row = data[cntr].split(',');
                const obj = {
                    teamId : row[0],
                    missionTime : row[1],
                    packetCount : Number(row[2]),
                    mode : row[3],
                    state : Number(row[4]),
                    altitude : Number(row[5]).toFixed(1),
                    hsDeployed : row[6],
                    pcDeployed : row[7],
                    mastRaised : row[8],
                    temperature : Number(row[9]).toFixed(1),
                    voltage : Number(row[10]).toFixed(1),
                    pressure : Number(row[11]).toFixed(1),
                    gpsTime : row[12],
                    gpsAltitude : Number(row[13]).toFixed(1),
                    gpsLatitude : Number(row[14]).toFixed(4),
                    gpsLongitude : Number(row[15]).toFixed(4),
                    gpsSats : Number(row[16]),
                    tiltX : Number(row[17]).toFixed(2),
                    tiltY : Number(row[18]).toFixed(2),        
                    cmdEcho : row[19]
                }

                socket.emit('data', obj);
            }, 1000);
        } else if(command === 'stop') {
            clearInterval(interval);
        }
        socket.on('disconnect', () => {
            console.log(`Disconnected: ${socket.id}`)
        });
    })
})