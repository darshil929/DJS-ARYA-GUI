let sim_enable;
let sim_activate;
const commandButtonCB = (e) => {
    e.preventDefault();
    let command = -1;
    const ch = document.querySelector('#command').value.trim();
    if(ch !== undefined) {
        if(ch === 'CMD,1033,CX,ON') {
            command = '1';
            console.log(command);
        } else if (ch === 'CMD,1033,CX,OFF') {
            command = '2';
            console.log(command);
        }  else if (ch === 'CMD,1033,SIM,ENABLE') {
            sim_enable = true;
            command = '3';
            console.log(command);
        } else if (ch === 'CMD,1033,SIM,ACTIVATE') {
            if(sim_enable) {
                sim_activate = true;
                command = '4';
                console.log(command);
            }
        } else if (ch === 'CMD,1033,SIM,DISABLE') {
            sim_enable = false;
            sim_activate = false;
            command = '5';
            console.log(command);
        } else {
            console.log("Wrong Command");
        }
;
    }
}
var el = document.getElementById('command-button');
document.querySelector('#command-button').addEventListener('click',(e)=>commandButtonCB(e));

document.querySelector('#command').addEventListener("keyup",(e)=>{
    if(e.code === "Enter") {
        commandButtonCB(e)
    }
})