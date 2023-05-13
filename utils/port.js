import { SerialPort } from 'serialport';
import xbee_api from 'xbee-api';
import xbee from 'xbee';
import makeCSV from "./makeCSV.js";
import parse from "./parse.js";

/* XBEE Setup */
const C = xbee_api.constants;
const xbeeAPI = new xbee_api.XBeeAPI({
    api_mode: 1
});

class Port {
    constructor() {
        this.socketIsAlive = true;
        this.portIsAlive = false;
    }

    initialisation(com, baud, portIsAlive, socketIsAlive) {
         // Initialising Port
         this.port = new SerialPort({
            path: com,
            parser: xbee.packetParser(),
            baudRate: parseInt(baud),
            autoOpen: false
        });
    }

    events(socket) {
        let packet = "";

        this.port.open();
        
        this.port.on('open', () => {
            this.portIsAlive = true;
            this.port.flush()
            console.log(`Port opened at ${this.port.path} at ${this.port.settings.baudRate} baudrate`)
        })
        
        this.port.on('error', (error) => {
            console.log(`Error with opening COM port: ${error}`)
        })

        this.port.on("data", (data) => {
            if (this.socketIsAlive) {
                if (data.toString() === '\n') {
                    console.log(packet);
    
                    makeCSV(packet + "\n");
                    // makeCSV(packet);
                    const dataArr = packet.split(",");
                    const dataObj = parse(dataArr);
                    socket.emit('data', dataObj);
                    packet = "";
                }
                else {
                    packet += data.toString();
                }
            }
        });
    }

    write(data) {
        if(data === "2")  {
            this.port.close(() => { });
            if(this.port.isOpen) {
                console.log("Port is still Open");
            } else {
                console.log("Port is Closed");
            }
        }

        const frame_obj = {
            type: C.FRAME_TYPE.AT_COMMAND,
            command: data,
            commandParameter: [],
        }
        
        const packet = xbeeAPI.buildFrame(frame_obj).slice(5, -1);
        this.port.write(packet);
    }

    check() {
        if (this.port.isOpen) {
            this.port.close(() => {});
            this.portIsAlive = false;
        }
    }

    isPortALive() {
        return this.portIsAlive;
    }

    updateSocketLife() {
        this.socketIsAlive = false;
    }

    updateBaudRate(baud) {
        console.log(baud);
        this.port.update({ baudRate: baud });
        console.log(`Port baudrate changed to ${this.port.settings.baudRate}`);
    }
}

export default Port;