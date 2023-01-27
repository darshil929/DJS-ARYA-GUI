function parseContainer(data){
    const obj = {}
    obj.id = parseInt(data[0]);                         //int
    obj.mtime = data[1];                                //string
    obj.pc = parseInt(data[2]);                         //int
    obj.pt = data[3];                                   //string //C or T
    obj.mode = data[4];                                 //string //F or S
    obj.released = data[5];                             //string //R or N
    obj.alt = parseFloat(data[6]).toFixed(1);;           //double
    obj.temp = parseFloat(data[7]).toFixed(1);          //double
    obj.volt = parseFloat(data[8]).toFixed(2);          //double
    obj.gpstime = data[9];                              //string
    obj.gpslat = parseFloat(data[10]).toFixed(4);       //double
    obj.gpslong = parseFloat(data[11]).toFixed(4);      //double
    obj.gpsalt = parseFloat(data[12]).toFixed(1);       //double
    obj.gpssats = parseInt(data[13]);                   //int
    obj.ss = parseInt(data[14]);                        //int
    obj.cmd = data[15];                                 //string
    return obj;
}

function parsePayload(data){
    const obj = {}
    obj.id = parseInt(data[0]);                         //int
    obj.mtime = data[1];                                //string
    obj.pc = parseInt(data[2]);                         //int
    obj.pt = data[3];                                   //string
    obj.alt = parseFloat(data[4]).toFixed(1);           //double
    obj.temp = parseFloat(data[5]).toFixed(1);         //double
    obj.volt = parseFloat(data[6]).toFixed(2);          //double
    obj.gyroR = parseFloat(data[7]).toFixed(6);         //double
    obj.gyroP = parseFloat(data[8]).toFixed(6);         //double
    obj.gyroY = parseFloat(data[9]).toFixed(6);         //double
    obj.accelR = parseFloat(data[10]).toFixed(6);       //double
    obj.accelP = parseFloat(data[11]).toFixed(6);       //double
    obj.accelY = parseFloat(data[12]).toFixed(6);       //double
    obj.magR = parseFloat(data[13]) .toFixed(6);        //double
    obj.magP = parseFloat(data[14]).toFixed(6);         //double
    obj.magY = parseFloat(data[15]).toFixed(6);         //double
    obj.pe = parseFloat(data[16]).toFixed(1);           //double
    obj.ss = parseInt(data[17]);                        //int
    return obj;
}


module.exports = {
    parseContainer,
    parsePayload
}
