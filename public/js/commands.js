const obj =Object.freeze({
    "CMD,1033,CX,ON":"1",
    "CMD,1033,CX,OFF": "2",
    "CMD,1033,SET Time": "3-Value-",
    "CMD,1033,SIM,DISABLE": "7",
    "CMD,1033,SIM,ENABLE": "4",
    "CMD,1033,SIM,ACTIVATE": "5",
    "CMD,1033,SIMP": "6-Value-",
    "CMD,1033,CAL": "0",
    "CMD,1033,Packet Count Reset": "8",
    "CMD,1033,Heat Shield Start": "a",
    "CMD,1033,Heat Shield Stop": "A",
    "CMD,1033,Parachute Servo": "b",
    "CMD,1033,Flag Servo": "c"
})

let sim_enable;
let sim_activate;
const commandButton = document.querySelector('#command-button');

const commandButtonCB = (e) => {
    e.preventDefault();
    // let command = '0';
    const ch = document.querySelector('#command').value.trim();
    
    let command= obj[ch]
    console.log(command)
}

commandButton.addEventListener('click', commandButtonCB)
