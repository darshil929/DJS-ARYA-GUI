const fs = require('fs');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*"} })
// const path = require('path');
// const guiPath = path.join(__dirname, '/GUI_Main');
// console.log(path.join(__dirname, '../draft02/index_v2.html'));
// console.log(guiPath)
app.use(express.static('GUI_Main'));

server.listen(3000,() => {
    console.log(`Server is UP on port 3000`);
})


io.on('connection', (socket) => {
    console.log(`User Connected:` + socket.id);
    // socket.emit('trial.csv');
    const fileContent = fs.readFileSync('trial.csv').toString();

const myArray = fileContent.split('\r\n');

const rowCSV = [];
    var i = 0;
    const csvToGUI = setInterval(emitCSV, 3000);
    function emitCSV() {
        if(i == myArray.length) {
            clearInterval(csvToGUI);
            console.log('CSV data ENDED!');
        } else {
            console.log(myArray[i]);
            fs.appendFile('judges.csv', `${myArray[i]}\n`, (err) => {
                if (err) throw err;
                console.log(`Row ${i} sent to Judge`);
            });

                const rowConverter = myArray[i].split(',');
                var arr_To_Obj = {
                        teamId : rowConverter[0],
                        missionTime : rowConverter[1],
                        packetCount : Number(rowConverter[2]),
                        mode : rowConverter[3],
                        state : rowConverter[4],
                        altitude : Number(rowConverter[5]),
                        HS_deployed : rowConverter[6],
                        PC_deployed : rowConverter[7],
                        Mast_Raised : rowConverter[8],
                        temperature : Number(rowConverter[9]),
                        voltage : Number(rowConverter[10]),
                        GPS_Time : Number(rowConverter[11]),
                        GPS_Altitude : Number(rowConverter[12]),
                        GPS_Latitude : Number(rowConverter[13]),
                        GPS_Longitude : Number(rowConverter[14]),
                        GPS_Sats : Number(rowConverter[15]),
                        tilt_X : Number(rowConverter[16]),
                        tilt_Y : Number(rowConverter[17]),
                        CMD_ECHO : rowConverter[18]
                    }
                rowCSV.push(arr_To_Obj);
                console.log(rowCSV);

            socket.emit('trial.csv', rowCSV[i]);
            i++;
        }
    }
});

// Read the CSV file (ALL AT ONCE)
    //     // fs.readFileSync('trial.csv');
    //     // console.log(fs.readFileSync('trial.csv')); // will return buffer data
    // const data = fs.readFile('trial.csv', (err, data) => {
    //     if (err) throw err;
    //     console.log(data.toString());
    // });




// var i = 0;
// setInterval(() => {
//     if(i == myArray.length) {
//         console.log('hello'); //clear interval
//         return;
//     }
//     console.log(myArray[i]);
//     fs.appendFile('judges.csv', `${myArray[i]}\n`, (err) => {
//         if (err) throw err;
//         console.log(`Row ${i} sent to Judge`);
//     });
//     i++;
// }, 2000);