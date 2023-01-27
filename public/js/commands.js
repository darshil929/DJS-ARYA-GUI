// let simp;
let val;

const commandButtonCB = (e) => {
    e.preventDefault();
    let command = -1;
    const ch = document.querySelector('#command').value.trim();
    if(ch !== undefined) {
        // console.log(ch);
        // console.log(ch.substring(0,14));
        if(ch === 'CMD,1004,CX,ON') {
            command = '1';
        } else if (ch === 'CMD,1004,CX,OFF') {
            command = '2';
        } else if (ch.substring(0,12) === 'CMD,1004,ST,') {
            command = '3-' + ch.substring(12);
        } else if (ch === 'CMD,1004,TPX,ON') {
            command = '4';
        } else if (ch === 'CMD,1004,TPX,OFF') {
            command = '5';
        } else if (ch === 'CMD,1004,SIM,ENABLE') {
            sim_enable = true;
            command = '6';
        } else if (ch === 'CMD,1004,SIM,ACTIVATE') {
            if(sim_enable) {
                sim_activate = true;
                command = '7';
            }
        } else if (ch === 'CMD,1004,SIM,DISABLE') {
            sim_enable = false;
            sim_activate = false;
            command = '8';
        } else if (ch.substring(0,14) === 'CMD,1004,SIMP,') {
            command = '9-'+ch.substring(14);
        } else {
            console.log("Sorry! Wrong Command");
        }
        if( command != -1) writeOnSerial(command)
        document.querySelector('#command').value = "";
    }
}

document.querySelector('#command-button').addEventListener('click',(e)=>commandButtonCB(e));

document.querySelector('#command').addEventListener("keyup",(e)=>{
    if(e.code === "Enter") {
        commandButtonCB(e)
    }
})

// document.querySelector("#command-button").addEventListener('click', command_send)

// const enumCmd = {
//     setTime: "ST",
//     simMode: "SIM",
//     simPres: "SIMP",
//     conTel: "CX",
//     tpTel: "TPX"
// }

// function command_send() {
//     const command = (document.querySelector("#command").value).trim();
//     document.querySelector("#command").value = "";
//     const arrCmd = command.split(',');
//     switch (arrCmd[2]) {
//         case enumCmd.setTime:
//             setTimeVerify(arrCmd);
//             break;
//         case enumCmd.simMode:
//             simModeVerify(arrCmd);
//             break;
//         case enumCmd.simPres:
//             simPresVerify(arrCmd);
//             break;
//         case enumCmd.conTel:
//             conTelVerify(arrCmd);
//             break;
//         case enumCmd.tpTel:
//             tpTelVerify(arrCmd);
//             break;
//         default:
//             console.log("Invalid Command");
//             break;
//     }
// }

// function setTimeVerify(arrCmd) {
//     console.log("set time : " + arrCmd.toString());
//     writeOnSerial(arrCmd.toString());
// }

// function simModeVerify(arrCmd) {
//     switch (arrCmd[3]) {
//         case "ENABLE":
//             console.log("enable simulation mode : "+arrCmd.toString());
//             writeOnSerial(arrCmd.toString());
//             break;
//         case "ACTIVATE":
//             console.log("activate simulation mode : "+arrCmd.toString());
//             writeOnSerial(arrCmd.toString());
//             break;
//         case "DISABLE":
//             console.log("disable simulation mode : "+arrCmd.toString());
//             writeOnSerial(arrCmd.toString());
//             break;
//         default:
//             console.log("Invalid Command");
//             break;
//     }
// }
// function simPresVerify(arrCmd) {
//     console.log("send simulated pressure : " + arrCmd.toString());
//     writeOnSerial(arrCmd.toString());
// }
// function conTelVerify(arrCmd) {
//     switch (arrCmd[3]) {
//         case "ON":
//             console.log("container telemetry on : "+arrCmd.toString());
//             writeOnSerial(arrCmd.toString());
//             break;
//         case "OFF":
//             console.log("container telemetry off : "+arrCmd.toString());
//             writeOnSerial(arrCmd.toString());
//             break;
//         default:
//             console.log("Invalid Command");
//             break;
//     }
// }
// function tpTelVerify(arrCmd) {
//     switch (arrCmd[3]) {
//         case "ON":
//             console.log("payload telemetry on : "+arrCmd.toString());
//             writeOnSerial(arrCmd.toString());
//             break;
//         case "OFF":
//             console.log("payload telemetry off : "+arrCmd.toString());
//             writeOnSerial(arrCmd.toString());
//             break;
//         default:
//             console.log("Invalid Command");
//             break;
//     }
// }
