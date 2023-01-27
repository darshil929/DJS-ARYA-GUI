// Socket
const socket = io.connect('http://localhost:5000/');

function writeOnSerial(cmd){
    socket.emit('cmd',cmd)
}

function changeBaudRate (baud) {
    socket.emit('baud', baud);
}

window.onbeforeunload = ()=>{
    socket.disconnect();
}