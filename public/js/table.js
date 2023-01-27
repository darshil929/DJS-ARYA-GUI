// Creating Container CSV Table
function createContainerTable(dataObj) {
    let tr = document.createElement("tr");
    // var css = 'tr:hover { transform: scale(1.05); }';

    td = document.createElement('td');
    td.textContent = dataObj.id;
    tr.appendChild(td);
    document.querySelector('#con').appendChild(tr);

    td = document.createElement('td');
    td.textContent = dataObj.mtime;
    tr.appendChild(td);
    document.querySelector('#con').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.pc;
    tr.appendChild(td);
    document.querySelector('#con').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.pt;
    tr.appendChild(td);
    document.querySelector('#con').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.mode;
    tr.appendChild(td);
    document.querySelector('#con').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.released;
    tr.appendChild(td);
    document.querySelector('#con').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.alt;
    tr.appendChild(td);
    document.querySelector('#con').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.temp;
    tr.appendChild(td);
    document.querySelector('#con').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.volt;
    tr.appendChild(td);
    document.querySelector('#con').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.gpstime;
    tr.appendChild(td);
    document.querySelector('#con').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.gpslat;
    tr.appendChild(td);
    document.querySelector('#con').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.gpslong;
    tr.appendChild(td);
    document.querySelector('#con').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.gpsalt;
    tr.appendChild(td);
    document.querySelector('#con').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.gpssats;
    tr.appendChild(td);
    document.querySelector('#con').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.ss;
    tr.appendChild(td);
    document.querySelector('#con').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.cmd;
    tr.appendChild(td);
    document.querySelector('#con').appendChild(tr);

    tr.style.transition = 'all .2s ease-in-out';
    // tr.style.cssText = css;
    tr.style.transform = 'scale(1.05);';
    // console.log(tr.style);
}



// Creating Tethered Payload CSV Table
function createTPTable(dataObj) {
    let tr = document.createElement("tr");

    td = document.createElement('td');
    td.textContent = dataObj.id;
    tr.appendChild(td);
    document.querySelector('#pl').appendChild(tr);

    td = document.createElement('td');
    td.textContent = dataObj.mtime;
    tr.appendChild(td);
    document.querySelector('#pl').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.pc;
    tr.appendChild(td);
    document.querySelector('#pl').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.pt;
    tr.appendChild(td);
    document.querySelector('#pl').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.alt;
    tr.appendChild(td);
    document.querySelector('#pl').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.temp;
    tr.appendChild(td);
    document.querySelector('#pl').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.volt;
    tr.appendChild(td);
    document.querySelector('#pl').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.gyroR;
    tr.appendChild(td);
    document.querySelector('#pl').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.gyroP;
    tr.appendChild(td);
    document.querySelector('#pl').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.gyroY;
    tr.appendChild(td);
    document.querySelector('#pl').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.accelR;
    tr.appendChild(td);
    document.querySelector('#pl').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.accelP;
    tr.appendChild(td);
    document.querySelector('#pl').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.accelY;
    tr.appendChild(td);
    document.querySelector('#pl').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.magR;
    tr.appendChild(td);
    document.querySelector('#pl').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.magP;
    tr.appendChild(td);
    document.querySelector('#pl').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.magY;
    tr.appendChild(td);
    document.querySelector('#pl').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.pe;
    tr.appendChild(td);
    document.querySelector('#pl').appendChild(tr);
    
    td = document.createElement('td');
    td.textContent = dataObj.ss;
    tr.appendChild(td);
    document.querySelector('#pl').appendChild(tr);
}