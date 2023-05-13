import fs from 'fs';
import commandMap from './commandMap.js';

let simFlag = 0;
const events = (port, socket) => {
    const pressure = [];
    fs.readFile('simp.txt', async (error, data) => {
        if(error) {
            return console.log(error.message);
        }

        let simp = [];
        data = data.toString().split("\r\n");
        // console.log(data);
        data.forEach(elem => {
            if (elem[0] != '#' && elem != '')
                simp.push(elem);
        });

        // const pressure = [];
        simp.forEach((elem) => {
            pressure.push(elem.split(",")[3]);
        });
    });

    socket.on('stop', () => {
        console.log("stop");

        port.write(commandMap("stop"));
    });

    socket.on('hs-open', () => {
        console.log("heat shield open");

        port.write(commandMap("hs-open"));
    });

    socket.on('hs-stop', () => {
        console.log("heat shield stop");
        
        port.write(commandMap("hs-stop"));
    });

    socket.on('hs-close', () => {
        console.log("heat shield close");
        
        port.write(commandMap("hs-close"));
    });

    socket.on('ps', () => {
        console.log("parachute in stowed");

        port.write(commandMap("ps"));
    });

    socket.on('po', () => {
        console.log("parachute opens");

        port.write(commandMap("po"));
    });

    socket.on('fs', () => {
        console.log("flag in stowed");

        port.write(commandMap("fs"));
    });

    socket.on('fu', () => {
        console.log("flag upright");

        port.write(commandMap("fu"));
    });

    socket.on('cal', () => {
        console.log("cal");

        port.write(commandMap("cal"))
    });

    socket.on('set-time', (data) => {
        console.log(`set-time: ${data}`);

        port.write(commandMap("set-time", data));
    });

    socket.on('camera', () => {
        console.log("camera");
        
        port.write(commandMap("camera"));
    });

    socket.on('sim-disable', () => {
        console.log("sim-disable");
        simFlag = 0;
        
        port.write(commandMap("sim-disable"));
    });

    socket.on('sim-enable', () => {
        console.log('sim-enable');
        simFlag = 1;
        
        port.write(commandMap("sim-enable"));
    });

    socket.on('sim-activate', () => {
        if (simFlag == 1) {
            console.log("sim-activate");
            port.write(commandMap("sim-activate"));

            let i = 0;
            const id = setInterval(() => {
                if (simFlag == 1) {
                    if (pressure.length > i) {
                        console.log(pressure[i]);

                        port.write(commandMap("simp", pressure[i]));
                    }
                } else {
                    clearInterval(id);
                }
                i++;
            }, 1000);
        }
        else {
            console.log('SIM DISABLED!');
        }
    }
    );

    socket.on('simp', (data) => {
        console.log(`simp: ${data}`);

        port.write(commandMap("simp", data));
    });

    socket.on('pcr', () => {
        console.log("packet count reset");

        port.write(commandMap("pcr"));
    });

    socket.on('ssr', () => {
        console.log("software state reset");

        port.write(commandMap("ssr"));
    });

    socket.on('custom', (data) => {
        data = data.join("");
        // console.log("custom-" + data);
        console.log(data);

        port.write(data)
    });
}

export default events;