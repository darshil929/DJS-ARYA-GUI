const fs = require('fs');

const date = new Date();
    const folderName = "csv_files"
    let fileName = `Flight_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.csv`;


    if (!fs.existsSync(folderName)) {
        // create the folder
        fs.mkdirSync(folderName);
    }

    const header = `TEAM_ID,MISSION_TIME,PACKET_COUNT,MODE,STATE,ALTITUDE,HS_DEPLOYED,PC_DEPLOYED,MAST_RAISED,TEMPERATURE,VOLTAGE,PRESSURE,GPS_TIME,GPS_ALTITUDE,GPS_LATITUDE,GPS_LONGITUDE,GPS_SATS,TILT_X,TILT_Y,CMD_ECHO`

    fs.writeFile(`./${folderName}/${fileName}`, `${header}\n`, (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
    console.log(`New File Created!`);
const makeCSV = (data) => {
    fs.appendFile(`./${folderName}/${fileName}`, `${data}\n`, (err) => {
        if (err) throw err;
    });
}

module.exports = makeCSV;