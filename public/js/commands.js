let sim_enable;
let sim_activate;
const commandButtonCB = (e) => {
    e.preventDefault();
    let command = '0';
    const ch = document.querySelector('#command').value.trim();
    if(ch !== undefined) {
        if(ch === 'CMD,1033,CX,ON') {
            command = '1';
        } else if (ch === 'CMD,1033,CX,OFF') {
            command = '2';
        }  else if (ch === 'CMD,1033,SIM,ENABLE') {
            sim_enable = true;
            command = '4';
        } else if (ch === 'CMD,1033,SIM,ACTIVATE') {
            if(sim_enable) {
                sim_activate = true;
                command = '5';}
        // } else if (ch === 'CMD,1033,SIM,DISABLE') {
        //     sim_enable = false;
        //     sim_activate = false;
        //     command = '5';
        } else if (ch === 'CAL') {
            command = '0';
        } else if (ch === 'Packet Count Reset') {
            command = '7';
        } else if (ch === 'Heat Shield Start') {
            command = 'a';
        } else if (ch === 'Heat Shield Stop') {
            command = 'A';
        } else if (ch === 'Flag Servo') {
            command = 'c';
        } else if (ch === 'Parachute Servo') {
            command = 'b';
        } else {
            console.log("Wrong Command");
        }
        console.log(command);
    }
}
var el = document.getElementById('command-button');
document.querySelector('#command-button').addEventListener('click',(e)=>commandButtonCB(e));

document.querySelector('#command').addEventListener("keyup",(e)=>{
    if(e.code === "Enter") {
        commandButtonCB(e)
    }
})