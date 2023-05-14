import fs from "fs";
import parse from "./parse.js";

const readCSV = (socket, fileName) => {
    console.log(`Reading data from filename: ${fileName}`);
    
    const bufferData = fs.readFileSync(`./csv_files/${fileName}`)
    let data = bufferData.toString();

    data = data.split('\r\n');
    data.shift();

    let interval;
    let cntr = -1;
    interval = setInterval(() => {
        cntr++;
        if(cntr >= data.length-1) {
            clearInterval(interval);
        }

        const row = data[cntr].split(',');
        const obj = parse(row);

        socket.emit('data', obj);
    }, 1000);

    socket.on("stop", () => {
        clearInterval(interval);
    });
}

export default readCSV;