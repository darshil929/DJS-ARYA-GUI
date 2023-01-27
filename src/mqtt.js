const mqtt = require('mqtt');
require('dotenv').config();

if (process.env.TEAM_ID === undefined || process.env.PASSWORD === undefined) {
    console.log("Environment variables for MQTT are not defined");
}

const options = {
    username: process.env.TEAM_ID,
    password: process.env.PASSWORD
}

const mqttClient = mqtt.connect('mqtt://cansat.info:1883', options);

mqttClient.on('connect', () => {
    console.log(`MQTT Connected at ${mqttClient.options.href} on topic teams/${mqttClient.options.username}`);
})

mqttClient.on('error', function(error) {
    console.log(`MQTT ${error}`);
    mqttClient.end();
})

function sendMQTT(data) {
    if(mqttClient.connected) {
        mqttClient.publish('teams/1004',data)
    }
}

module.exports = {
    sendMQTT
}
