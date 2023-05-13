const obj = Object.freeze({
    "CMD,1033,CX,ON": () => {
        const com = document.querySelector('#com').value;
        const baud = document.querySelector('#baudRate').value;
        socket.emit('start', { com, baud });
    },
    "CMD,1033,CX,OFF": () => {
        socket.emit('stop');
    },
    "CMD,1033,Heat Shield opens":  () => {
        socket.emit('hs-open')
    },
    "CMD,1033,Heat Shield Stop":  () => {
        socket.emit('hs-stop')
    },
    "CMD,1033,Heat Shield close":  () => {
        socket.emit('hs-close')
    },
    "CMD,1033,Parachute in Stowed":  () => {
        socket.emit('ps')
    },
    "CMD,1033,Parachute Open":  () => {
        socket.emit('po')
    },
    "CMD,1033,Flag In Stowed":  () => {
        socket.emit('fs')
    },
    "CMD,1033,Flag Upright":  () => {
        socket.emit('fu')
    },
    "CMD,1033,CAL": () => {
        socket.emit('cal')
    },
    "CMD,1033,SET Time": (data) => {
        socket.emit('set-time', data);
    },
    "CMD,1033,Camera": () => {
        socket.emit('camera')
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
    "CMD,1033,Packet Count Reset": () => {
        socket.emit('pcr')
    },
    "CMD,1033,Software State Reset": () => {
        socket.emit('ssr')
    },
})

let sim_enable;
let sim_activate;

// const command = document.querySelector('#command');
const commandButton = document.querySelector('#command-button');

const commandButtonCB = () => {
    const ch = document.querySelector('#command').value.trim();
    const cmd = ch.split(',');

    if (Object.keys(obj).includes(ch)) {
        if(cmd[2] === 'SIMP' || cmd[2] === 'SET Time') {
            const str = cmd[0] + "," + cmd[1] + "," + cmd[2];
            console.log(str);
            obj[str](cmd[3]);
            return;
        }
        obj[ch]();
    }
    else {
        socket.emit('custom', cmd)
    }

    command.value = '';
}

commandButton.addEventListener('click', commandButtonCB)