// Create 3D Model

const timeDelta = 0.25;


/** ---------------------------- DevTools ------------------------------ **/
p5.disableFriendlyErrors = true;


const prev = {
    x: 0,
    y: 90,
    z: 0,
}

function updateValues(dataObj) {
    prev.x += parseFloat(dataObj.gyroP) * timeDelta;
    prev.y += parseFloat(dataObj.gyroY) * timeDelta;
    prev.z += parseFloat(dataObj.gyroR) * timeDelta;
}

/**----------------- Blue Box ------------------------------- **/
// const sketch = function (p) {
//     p.setup = function () {
//         p.createCanvas(700, 700, p.WEBGL);
//         p.angleMode(p.DEGREES);
//         // fft = new p5.fft();
//     }
//     p.draw = function () {
//         // background('rgb(175, 176, 187)');
//         p.background('rgba(39,39,44,255)');       //og
//         // background(('#3c96c3');
//         // background('rgb(108, 132, 203)');
//         // fill('rgb(20,85,149)');
//         // fill('rgba(66, 66, 77, 0.774)')
//         p.fill('rgba(110, 153, 255, 0.8)');       //og
//         // fill('rgba(130, 180, 255, 0.91)')

//         p.rotateX(prev.x);
//         p.rotateY(prev.y);
//         p.rotateZ(prev.z);
//         // angle += 0.07;
//         p.box(86 * 3, 120 * 3, 68 * 3);
//         p.noLoop()
//         // console.log('hello')
//     }
// }

/**----------------------- Obj Model--------------------- **/

let firstModelLoad = true;

let payloadModel;

const sketch = function (p) {

    p.preload = function() {
        payloadModel = p.loadModel('model/model.obj', true, ()=>{
            console.log("Model Loaded Succesfully")
        },()=>{
            console.log("Failed To Load Model")
        }, '.obj')
    }

    p.setup = function () {
        c = p.createCanvas(700, 700, p.WEBGL);
        p.angleMode(p.DEGREES);
    }
    p.draw = function () {

        p.scale(2.2,-2.2,2.2); // -> important to fix mirror inversion

        /** ------------------ Lights ---------------------- **/
        // p.directionalLight(0,0,0,0,0,1);
        // p.directionalLight(255,255,255,0,0,1);
        // p.directionalLight(255,255,255,p.mouseX,0,1);
        // p.directionalLight(255,255,255,1,1,1);
        p.directionalLight(220,220,220,1,1,-1);// -> my choice
        p.ambientLight(100);// -> my choice
        // p.pointLight(255,0,0,0,0,100);

        /** ----------------- Material -------------------------- **/
        p.background(0);
        p.noStroke();
        // p.normalMaterial();
        p.specularMaterial(255);// -> my choice
        
        
        /**    -------------- Movement ----------- **/

        // p.rotateX(p.mouseX);
        // p.rotateY(p.mouseY);
        // p.rotateZ(p.mouseX+p.mouseY);
        p.orbitControl();
        // p.noLoop()

        p.model(payloadModel);
    }
}

const container = document.querySelector('#canvas-container')

const myCanvas = new p5(sketch, container);

//updating 3d model
function create3dModel(dataObj) {
    updateValues(dataObj);
    myCanvas.redraw();
}

// Creating 3D Model Table
function createModelTable(dataObj) {
    document.querySelector('#roll-gyro').textContent = dataObj.gyroR
    document.querySelector('#roll-accel').textContent = dataObj.accelR
    document.querySelector('#pitch-gyro').textContent = dataObj.gyroP
    document.querySelector('#pitch-accel').textContent = dataObj.accelP
    document.querySelector('#yaw-gyro').textContent = dataObj.gyroY
    document.querySelector('#yaw-accel').textContent = dataObj.accelY
}