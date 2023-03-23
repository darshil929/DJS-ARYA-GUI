let stateValue;
let x_coordinate;
let y_coordinate;


function setValues (myData) {
    stateValue = myData.state;
    x_coordinate = myData.tiltX;
    y_coordinate = myData.tiltY;
}

let firstModelLoad = true;

let probeModel1;
let probeModel2;
let probeModel3;

const sketch = function (p) {

    p.preload = function () {
        probeModel1 = p.loadModel('model/model-60.obj', true, () => {
            console.log("Model1 Loaded Succesfully")
        }, () => {
            console.log("Failed To Load Model1")
        }, '.obj')

        probeModel2 = p.loadModel('model/model-180.obj', true, () => {
            console.log("Model2 Loaded Succesfully")
        }, () => {
            console.log("Failed To Load Model2")
        }, '.obj')

        probeModel3 = p.loadModel('model/model-stowed.obj', true, () => {
            console.log("Model3 Loaded Succesfully")
        }, () => {
            console.log("Failed To Load Model3")
        }, '.obj')
    }

    p.setup = function () {
        c = p.createCanvas(800, 500, p.WEBGL);
        // p.angleMode(p.DEGREES);
    }

    p.draw = function () {
        p.background('#E1EBEE');
        p.pointLight(0, 0, 1000, 0, 0, 1500)
        // p.rectMode(CENTER);
        p.ambientMaterial(255);
        p.rotateX(Number(x_coordinate).toFixed(2));
        p.rotateY(Number(y_coordinate).toFixed(2));
        // p.rotateX(p.mouseX);
        // p.rotateY(p.mouseY);
        // p.rotateZ(p.mouseX + p.mouseY);
        p.noStroke();
        // noLoop();
        // p.model(probeModel1)
        if(stateValue > 0 && stateValue < 5) {
            p.model(probeModel1);
        }
        else if(stateValue == 5) {
            p.model(probeModel2);
        }
        else if(stateValue > 5) {
            p.model(probeModel3);
        }
    }
}

const container = document.querySelector('#model')

const myCanvas = new p5(sketch, container);

function create3dModel(myData) {
    setValues(myData);
    myCanvas.redraw();
}




