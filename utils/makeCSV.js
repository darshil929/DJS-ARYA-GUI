import fs from 'fs';

const date = new Date();
const folderName = "csv_files"
let fileName = `Flight_${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.csv`;


if (!fs.existsSync(folderName)) {
    // create the folder
    fs.mkdirSync(folderName);
}

const header = "TEAM_ID,MISSION_TIME,PACKET_COUNT,ALTITUDE,AIR_SPEED,TEMPERATURE,VOLTAGE,PRESSURE,GPS_TIME,GPS_ALTITUDE,GPS_LATITUDE,GPS_LONGITUDE,GPS_SATS,TILT_X,TILT_Y,ROT_Z\n"

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

export default makeCSV;