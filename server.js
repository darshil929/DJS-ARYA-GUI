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


io.on('connection', (socket) => {
    console.log(`Connected: ${socket.id}`);
    let interval;
    socket.on('click', (command) => {
        if(command === 'start') {
            console.log(command)
        
                // makeCSV(data[cntr]);
                // const row = data[cntr].split(',');
                // const obj = parse(row);

                // socket.emit('data', obj);
           
        } else if(command === 'stop') {
            clearInterval(interval);
        }
        socket.on('disconnect', () => {
            console.log(`Disconnected: ${socket.id}`)
        });
    })
})