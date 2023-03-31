const obj = Object.freeze({
    "CMD,1033,CX,ON": () => {
        socket.emit('start')
    },
    "CMD,1033,CX,OFF": () => {
        socket.emit('stop');
    },
    "CMD,1033,SET Time": (data) => {
        socket.emit('set-time', data);
    },
    "CMD,1033,SIM,DISABLE": () => {
        socket.emit('sim-disable');
    },
    "CMD,1033,SIM,ENABLE": () => {
        socket.emit('sim-enable');
    },
    "CMD,1033,SIM,ACTIVATE": () => {
        socket.emit('sim-activate');
    },
    "CMD,1033,SIMP": (data) => {
        socket.emit('simp', data);
    },
    "CMD,1033,CAL": () => {
        socket.emit('cal')
    },
    "CMD,1033,Packet Count Reset": () => {
        socket.emit('pcr')
    },
    "CMD,1033,Heat Shield Start":  () => {
        socket.emit('hs-start')
    },
    "CMD,1033,Heat Shield Stop":  () => {
        socket.emit('hs-stop')
    },
    "CMD,1033,Parachute Servo":  () => {
        socket.emit('ps')
    },
    "CMD,1033,Flag Servo":  () => {
        socket.emit('fs')
    },
})

let sim_enable;
let sim_activate;
const commandButton = document.querySelector('#command-button');

const commandButtonCB = (e) => {
    e.preventDefault();
    const ch = document.querySelector('#command').value.trim();
    const cmd = ch.split(',');
    if (Object.keys(obj).includes(cmd))
    {
        if(cmd[2] === 'SIMP' || cmd[2] === 'SET Time') {
            const str = cmd[0] + "," + cmd[1] + "," + cmd[2];
            obj[str](cmd[3]);
            return;
        }
        obj[ch]();
    }
    else
    {
        socket.emit('custom', cmd)
    }
}

commandButton.addEventListener('click', commandButtonCB)