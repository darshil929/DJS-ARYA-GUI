const parse = (data) => {
    const obj = {
        teamId : data[0],
        missionTime : data[1],
        packetCount : Number(data[2]),
        mode : data[3],
        state : data[4],
        state : Number(data[4]),
        altitude : Number(data[5]).toFixed(1),
        hsDeployed : data[6],
        pcDeployed : data[7],
        mastRaised : data[8],
        temperature : Number(data[9]).toFixed(1),
        voltage : Number(data[10]).toFixed(1),
        pressure : Number(data[11]).toFixed(1),
        gpsTime : data[12],
        gpsAltitude : Number(data[13]).toFixed(1),
        gpsLatitude : Number(data[14]).toFixed(4),
        gpsLongitude : Number(data[15]).toFixed(4),
        gpsSats : Number(data[16]),
        tiltX : Number(data[17]).toFixed(2),
        tiltY : Number(data[18]).toFixed(2),        
        cmdEcho : data[19]
    }

    return obj;
}

module.exports = parse;