const fs = require('fs');


// Make File

// Files Names Mission Statement
// const tpFileName = 'Flight_1004_T'
// const conFileName = 'Flight_1004_C'


// Making Date String
const today = new Date();
const date =today.getDate() +'-'+(today.getMonth()+1)+'-'+today.getFullYear();
const time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
const dateTime = date+'_'+time;

// Making File Name
const tpFileName = 'csv_files/'+dateTime+'_T.csv'
const conFileName = 'csv_files/'+dateTime+'_C.csv'

// Headers for both files
const tpFileText = 'TEAM_ID,MISSION_TIME,PACKET_COUNT,PACKET_TYPE,TP_ALTITUDE,TP_TEMP,TP_VOLTAGE,GYRO_R,GYRO_P,GYRO_Y,ACCEL_R,ACCEL_P,ACCEL_Y,MAG_R,MAG_P,MAG_Y,POINTING_ERROR,TP_SOFTWARE_STATE\n';
const conFileText = 'TEAM_ID,MISSION_TIME,PACKET_COUNT,PACKET_TYPE,MODE,TP_RELEASED,ALTITUDE,TEMPERATURE,VOLTAGE,GPS_TIME,GPS_LATITUDE,GPS_LONGITUDE,GPS_ALTITUDE,GPS_SATS,SOFTWARE_STATE,CMD_ECHO\n';

// Creating Both Files
fs.writeFile(tpFileName, tpFileText, function (err) {
    if (err){
        console.log(err)
    }else{
        console.log('T-Payload file created');
    } 
});

fs.writeFile(conFileName, conFileText, function (err) {
    if (err){
        console.log(err)
    }else{
        console.log('Container file created');
    }
});

// Function to append to files
function makeCSV(fileName,data) {
    if(fileName == 'C'){
        fs.appendFileSync(conFileName, data)
    }
    else if (fileName == 'T'){
        fs.appendFileSync(tpFileName, data)
    }
}

const saveState = async (data) => {

    const today = new Date();
    const date =today.getDate() +'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    const time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
    const dateTime = date+'_'+time;

    const fileName = './public/saveState/'+dateTime+'.html'
    fs.writeFile(fileName, data , (err) => {
        if (err){
            console.log(err)
        }else{
            console.log('Saved State at: '+dateTime);
        } 
    })
}

module.exports = {
    makeCSV,
    saveState
}
