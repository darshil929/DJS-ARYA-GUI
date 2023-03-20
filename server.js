const fs = require('fs'); 
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*"} })
const path = require('path');
const makeCSV = require('./utils/makeCSV.js');
const parse = require('./utils/parse.js');

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

                makeCSV(data[cntr]);
                const row = data[cntr].split(',');
                const obj = parse(row);

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