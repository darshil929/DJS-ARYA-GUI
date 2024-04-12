function createContainerTable(myData) {
    let tr = document.createElement("tr");

    td = document.createElement('td');
    td.textContent = myData.teamId;
    tr.appendChild(td);
    document.querySelector('#csv').appendChild(tr);

    td = document.createElement('td');
    td.textContent = myData.missionTime;
    tr.appendChild(td);
    document.querySelector('#csv').appendChild(tr);

    td = document.createElement('td');
    td.textContent = myData.packetCount;
    tr.appendChild(td);
    document.querySelector('#csv').appendChild(tr);

    td = document.createElement('td');
    td.textContent = myData.altitude;
    tr.appendChild(td);
    document.querySelector('#csv').appendChild(tr);

    td = document.createElement('td');
    td.textContent = myData.airspeed;
    tr.appendChild(td);
    document.querySelector('#csv').appendChild(tr);

    td = document.createElement('td');
    td.textContent = myData.temperature;
    tr.appendChild(td);
    document.querySelector('#csv').appendChild(tr);

    td = document.createElement('td');
    td.textContent = myData.voltage;
    tr.appendChild(td);
    document.querySelector('#csv').appendChild(tr);

    td = document.createElement('td');
    td.textContent = myData.pressure;
    tr.appendChild(td);
    document.querySelector('#csv').appendChild(tr);

    td = document.createElement('td');
    td.textContent = myData.gpsTime;
    tr.appendChild(td);
    document.querySelector('#csv').appendChild(tr);

    td = document.createElement('td');
    td.textContent = myData.gpsAltitude;
    tr.appendChild(td);
    document.querySelector('#csv').appendChild(tr);

    td = document.createElement('td');
    td.textContent = myData.gpsLatitude;
    tr.appendChild(td);
    document.querySelector('#csv').appendChild(tr);

    td = document.createElement('td');
    td.textContent = myData.gpsLongitude;
    tr.appendChild(td);
    document.querySelector('#csv').appendChild(tr);

    td = document.createElement('td');
    td.textContent = myData.gpsSats;
    tr.appendChild(td);
    document.querySelector('#csv').appendChild(tr);

    td = document.createElement('td');
    td.textContent = myData.tiltX;
    tr.appendChild(td);
    document.querySelector('#csv').appendChild(tr);

    td = document.createElement('td');
    td.textContent = myData.tiltY;
    tr.appendChild(td);
    document.querySelector('#csv').appendChild(tr);

    td = document.createElement('td');
    td.textContent = myData.rotZ;
    tr.appendChild(td);
    document.querySelector('#csv').appendChild(tr);

}