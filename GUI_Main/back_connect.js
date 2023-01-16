const socket = io('http://localhost:3000')
socket.on('connection',() => {
})
socket.on('trial.csv', (myData) => {
    console.log(myData.voltage);
})