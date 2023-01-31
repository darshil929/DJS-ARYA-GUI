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


io.on('connection', (socket) => {
    console.log(`User Connected:` + socket.id);


// Convert Entire Data in Array
    const fileContent = fs.readFileSync('trial.csv').toString();
    // const data = [];

    // fs.readFile("C:/Users/Darshil Thakkar/Desktop/DJS ARYA GUI/Trial/trial.csv", (err, data) => {
    //     if (err) throw err;
    //     console.log(data);
    //   });

    // console.log(fileContent);

    const myArray = fileContent.split('\r\n');

    // const arr1 = myArray[0].split(',');
    // console.log(arr1);
    // var arr1_To_Obj = {
    //     teamId : arr1[0],
    //     missionTime : arr1[1],
    //     temperature : Number(arr1[9])
    // }
    // console.log(typeof arr1_To_Obj.temperature);
    // console.log(arr1_To_Obj);

    const rowCSV = [];
    var i = 0;
    const csvToGUI = setInterval(emitCSV, 1000);
    function emitCSV() {
        if(i == myArray.length) {
            clearInterval(csvToGUI);
            // console.log('CSV data ENDED!');
        } else {
            // console.log(myArray[i]);

            makeCSV(myArray[i]);

            // console.log(`Row ${i} sent to Judge`);

            const rowConverter = myArray[i].split(',');
            // console.log(rowConverter);
            var arr_To_Obj = {
                teamId : Number(rowConverter[0]),
                missionTime : rowConverter[1],
                packetCount : Number(rowConverter[2]),
                mode : rowConverter[3],
                state : rowConverter[4],
                altitude : Number(rowConverter[5]).toFixed(1),
                hsDeployed : rowConverter[6],
                pcDeployed : rowConverter[7],
                mastRaised : rowConverter[8],
                temperature : Number(rowConverter[9]).toFixed(1),
                voltage : Number(rowConverter[10]).toFixed(1),
                pressure : Number(rowConverter[11]).toFixed(1),
                gpsTime : rowConverter[12],
                gpsAltitude : Number(rowConverter[13]).toFixed(1),
                gpsLatitude : Number(rowConverter[14]).toFixed(4),
                gpsLongitude : Number(rowConverter[15]).toFixed(4),
                gpsSats : Number(rowConverter[16]),
                tiltX : Number(rowConverter[17]).toFixed(2),
                tiltY : Number(rowConverter[18]).toFixed(2),        
                cmdEcho : rowConverter[19]
            }
            


            rowCSV.push(arr_To_Obj);
            // console.log(rowCSV);

            socket.emit('trial.csv', rowCSV[i]);
            i++;
        }
    }
});