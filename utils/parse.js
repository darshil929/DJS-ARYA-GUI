const parse = (data) => {
    const obj = {
        teamId: data[0],
        missionTime: data[1],
        packetCount: Number(data[2]),
        // mode: data[3],
        // state: data[4],
        // state: Number(data[4]),
        altitude: Number(data[3]).toFixed(1),
        airspeed: data[4],
        // pcDeployed: data[7],
        // mastRaised: data[8],
        temperature: Number(data[5]).toFixed(1),
        voltage: Number(data[6]).toFixed(1),
        pressure: Number(data[7]).toFixed(1),
        gpsTime: data[8],
        gpsAltitude: Number(data[9]).toFixed(1),
        gpsLatitude: Number(data[10]).toFixed(4),
        gpsLongitude: Number(data[11]).toFixed(4),
        gpsSats: Number(data[12]),
        tiltX: Number(data[13]).toFixed(2),
        tiltY: Number(data[14]).toFixed(2),
        rotZ: data[15]
    }

    return obj;
}

export default parse;