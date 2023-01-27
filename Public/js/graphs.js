//Graph Colors
const cAltitudeColor = "rgb(255, 96, 178, 0.8)";
const tpAltitudeColor = "rgb(56,163,235)";
const cTemperatureColor = "rgb(48, 205, 205, 0.87)";
const tpTemperatureColor = "rgb(150,98,255)";
const cVoltageColor = "rgb(249, 83, 83)";
const tpVoltageColor = "rgb(255, 205, 87)";
const gyroRColor = "rgb(150,98,255)";
const gyroPColor = "rgb(255, 96, 178, 0.8)";
const gyroYColor = "rgb(56,163,235)";
const accelRColor = "rgb(150,98,255)";
const accelPColor = "rgb(64,167,236)";
const accelYColor = "rgb(255,205,87)";
const magRColor = "rgb(255, 96, 178)";
const magPColor = "rgb(150,98,255)";
const magYColor = "rgb(48, 205, 205, 0.87)";

//Graphs
const altitude=document.getElementById('altitude').getContext('2d');
const alt=new Chart(altitude, {
    type: "line",
    data: {
        labels: time,
        datasets: [{
        fill: false,     
        label: 'Altitude',
        lineTension: 0,
        // backgroundColor: "rgb(62, 149, 205, 1)", 
        backgroundColor: cAltitudeColor,    
        borderColor: cAltitudeColor,
        pointBackgroundColor:cAltitudeColor,
        // radius: 0,
        data: container_alt,
        // borderWidth:2,
        // pointRadius:1,
        },
    {
        fill: false,
        label:'TP_Altitude',
        lineTension: 0,
        // backgroundColor: "rgb(228, 68, 150, 0.8)", 
        backgroundColor : tpAltitudeColor,   
        borderColor: tpAltitudeColor,
        pointBackgroundColor:tpAltitudeColor, 
        // radius: 0,
        data: tp_alt,
        // borderWidth:2,
        // pointRadius:1,
    }]
    },
    options:{
        // scales: {
        //     y: {
        //         suggestedMin: 0,
        //         suggestedMax: 1000
        //     }
        // },
            legend: {
                display:true,
                labels: {
                    fontColor: "#dedede",
                    fontSize: 12,
                    fontFamily: 'Monaco',
                }
            },
        responsive: true,
        maintainAspectRatio: false,
        position:'left',
        align:'start',
        spanGaps: true,
        scales: {
            // y: {
            //     min:0,
            // },
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'time',
                    fontColor : '#dedede',
                    fontSize : 14
                },
                gridLines: {
                    tickColor:'#dedede',
                    color: "rgba(255,255,255,0.05)",      // color of the grid lines
                    // borderColor: "red",
                    zeroLineColor: 'rgba(255,255,255,0.3)'     // Color of the axis
                },
                ticks: {
                    fontColor: "#dedede",
                    fontSize: 14,
                    // min:0,
                    // minTicksLimit: 0, 
                },
                
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'metres',
                    fontColor : '#dedede',
                    fontSize : 14
                },
                gridLines: {
                    tickColor:'#dedede',
                    color: "rgba(255,255,255,0.05)",      // color of the grid lines
                    zeroLineColor: 'rgba(255,255,255,0.3)'     // Color of the axis
                },
                ticks: {
                    fontColor: "#dedede",
                    fontSize: 14,
                    suggestedMin: 0,
                },
            }],   
        },

    }
});

const temperature=document.getElementById('temperature').getContext('2d');
const temp = new Chart(temperature, {
    type: "line",
    data: {
            labels: time, 
            datasets: [{
            fill: false,     
            label: 'Temperature',
            lineTension: 0,
            // backgroundColor: "rgba(87, 192, 236, 1)",
            backgroundColor: cTemperatureColor,
            borderColor: cTemperatureColor,
            pointBackgroundColor: cTemperatureColor,
            data: container_temp,
            // borderWidth:2,
            // pointRadius:1,
            },
        {
            fill: false,
            label:'TP_Temperature',
            lineTension: 0,
            // backgroundColor: "rgb(255, 96, 178, 0.8)",
            backgroundColor: tpTemperatureColor,    
            borderColor: tpTemperatureColor,
            data: tp_temp,
            pointBackgroundColor: tpTemperatureColor,
            // borderWidth:2,
            // pointRadius:1,
        }]
        },
    // options: {
    //     legend: {display: false},
    //     scales: {
    //     yAxes: [{ticks: {min: 0, max:20}}],  
    //     },
    // },
    options:{
        legend: {
            display:true,
            labels: {
                fontColor: "#dedede",
                fontSize: 12,
                fontFamily: 'Monaco',
            }
        },
    responsive: true,
    maintainAspectRatio: false,
    position:'left',
    align:'start',
    spanGaps: true,
    scales: {
        xAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'time',
                fontColor : '#dedede',
                fontSize : 14
            },
            gridLines: {
                tickColor:'#dedede',
                color: "rgba(255,255,255,0.05)",      // color of the grid lines
                // borderColor: "red",
                zeroLineColor: 'rgba(255,255,255,0.3)'     // Color of the axis
            },
            ticks: {
                fontColor: "#dedede",
                fontSize: 14,
            },
        }],
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: '°C',
                fontColor : '#dedede',
                fontSize : 14
            },
            gridLines: {
                tickColor:'#dedede',
                color: "rgba(255,255,255,0.05)",      // color of the grid lines
                zeroLineColor: 'rgba(255,255,255,0.3)'     // Color of the axis
            },
            ticks: {
                fontColor: "#dedede",
                fontSize: 14,
            },
        }]
    }
}
});

const voltage=document.getElementById('voltage').getContext('2d');
const volt = new Chart(voltage, {
    type: "line",
    data: {
            labels: time,
            datasets: [{
            fill: false,     
            label: 'Voltage',
            lineTension:0,
            // backgroundColor: "rgb(87, 192, 236, 1)",
            backgroundColor: cVoltageColor,    
            borderColor: cVoltageColor,
            pointBackgroundColor: cVoltageColor,
            data: container_volt,
        //  borderWidth:2,
        //  pointRadius:2,
            },
        {
            fill: false,
            label:'TP_Voltage',
            lineTension:0,
            // backgroundColor: "rgb(87, 192, 236, 1)", 
            backgroundColor: tpVoltageColor,   
            borderColor: tpVoltageColor,
            pointBackgroundColor:tpVoltageColor,
            data: tp_volt,
        //  borderWidth:2,
        //  pointRadius:2,
        },
    ]
        },
    // options: {
    //     legend: {display: false},
    //     scales: {
    //     yAxes: [{ticks: {min: 0, max:20}}],  
    //     },
    // },
    options:{
        legend: {
            display:true,
            labels: {
                fontColor: "#dedede",
                fontSize: 12,
                fontFamily: 'Monaco',
            }
        },
    responsive: true,
    maintainAspectRatio: false,
    position:'left',
    align:'start',
    spanGaps: true,
    scales: {
        xAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'time',
                fontColor : '#dedede',
                fontSize : 14
            },
            gridLines: {
                tickColor:'#dedede',
                color: "rgba(255,255,255,0.05)",      // color of the grid lines
                // borderColor: "red",
                zeroLineColor: 'rgba(255,255,255,0.3)'     // Color of the axis
            },
            ticks: {
                fontColor: "#dedede",
                fontSize: 14,
            },
        }],
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'volts',
                fontColor : '#dedede',
                fontSize : 14
            },
            gridLines: {
                tickColor:'#dedede',
                color: "rgba(255,255,255,0.05)",      // color of the grid lines
                zeroLineColor: 'rgba(255,255,255,0.3)'     // Color of the axis
            },
            ticks: {
                fontColor: "#dedede",
                fontSize: 14,
            },
        }]
    }}
}); 

const GYRO=document.getElementById('gyro').getContext('2d');
const gyro = new Chart(GYRO, {
    type: "line",
    data: { 
        labels: lastThreeTime,
        datasets: [{
        fill: false,     
        label:'GYRO_R',
        lineTension:0,
        // backgroundColor: "rgb(87, 192, 236, 1)",  
        backgroundColor: gyroRColor,  
        borderColor: gyroRColor,
        pointBackgroundColor: gyroRColor,
        data: gyro_r, 
        // borderWidth:2,
        // pointRadius:2,
        },
        {
        fill: false,
        label:'GYRO_P',
        lineTension:0,
        // backgroundColor: "rgba(87, 192, 236, 1)",    
        // borderColor: "rgb(117, 181, 74)",
        // pointBackgroundColor:"rgb(117, 181, 74)",
        // backgroundColor: "rgba(87, 192, 236, 1)",
        backgroundColor: gyroPColor,    
        borderColor: gyroPColor,
        pointBackgroundColor:gyroPColor,
        data: gyro_p, 
        // borderWidth:2,
        // pointRadius:2,
    },
    {
        fill: false,
        label:'GYRO_Y',
        lineTension:0,
        // backgroundColor: "rgba(87, 192, 236, 1)", 
        backgroundColor: gyroYColor,   
        borderColor: gyroYColor,
        pointBackgroundColor:gyroYColor,
        data: gyro_y,
        // borderWidth:2,
        // pointRadius:2,
    },
    ]
    },
    // options: {
    //     legend: {display: false},
    //     scales: {
    //     yAxes: [{ticks: {min: 0, max:20}}],  
    //     },
    // },
    options:{
        legend: {
            display:true,
            labels: {
                fontColor: "#dedede",
                fontSize: 12,
                fontFamily: 'Monaco',
            }
        },
    responsive: true,
    maintainAspectRatio: false,
    position:'left',
    align:'start',
    scales: {
        xAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'time',
                fontColor : '#dedede',
                fontSize : 14
            },
            gridLines: {
                tickColor:'#dedede',
                color: "rgba(255,255,255,0.05)",      // color of the grid lines
                // borderColor: "red",
                zeroLineColor: 'rgba(255,255,255,0.3)'     // Color of the axis
            },
            ticks: {
                fontColor: "#dedede",
                fontSize: 14,
            },
        }],
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: '°/sec',
                fontColor : '#dedede',
                fontSize : 14
            },
            gridLines: {
                tickColor:'#dedede',
                color: "rgba(255,255,255,0.05)",      // color of the grid lines
                zeroLineColor: 'rgba(255,255,255,0.3)'     // Color of the axis
            },
            ticks: {
                fontColor: "#dedede",
                fontSize: 14,
            },
        }]
    }}
});

const ACCEL=document.getElementById('accelerometer').getContext('2d');
const accel = new Chart(ACCEL, {
    type: "line",
    data: { 
        labels: lastThreeTime,
        datasets: [{
        fill: false,     
        label:'ACCEL_R',
        lineTension:0,
        // backgroundColor: "rgb(87, 192, 236, 1)",  
        backgroundColor: accelRColor,  
        borderColor: accelRColor,
        pointBackgroundColor:accelRColor,
        data: accel_r,
        // borderWidth:2,
        // pointRadius:2,
        },
        {
        fill: false,
        label:'ACCEL_P',
        lineTension:0,
        // backgroundColor: "rgb(87, 192, 236, 1)",   
        backgroundColor: accelPColor, 
        borderColor: accelPColor,
        pointBackgroundColor:accelPColor,
        data: accel_p, 
        // borderWidth:2,
        // pointRadius:2,
    },
    {
        fill: false,
        label:'ACCEL_Y',
        lineTension:0,
        // backgroundColor: "rgb(87, 192, 236, 1)",
        backgroundColor: accelYColor,    
        borderColor: accelYColor,
        pointBackgroundColor:accelYColor,
        data: accel_y,
        // borderWidth:2,
        // pointRadius:2,
    },
    ]
    },
    options:{
        legend: {
            display:true,
            labels: {
                fontColor: "#dedede",
                fontSize: 12,
                fontFamily: 'Monaco',
            }
        },
    responsive: true,
    maintainAspectRatio: false,
    position:'left',
    align:'start',
    scales: {
        xAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'time',
                fontColor : '#dedede',
                fontSize : 14
            },
            gridLines: {
                tickColor:'#dedede',
                color: "rgba(255,255,255,0.05)",      // color of the grid lines
                // borderColor: "red",
                zeroLineColor: 'rgba(255,255,255,0.3)'     // Color of the axis
            },
            ticks: {
                fontColor: "#dedede",
                fontSize: 14,
            },
        }],
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'metres/sec^2',
                fontColor : '#dedede',
                fontSize : 14
            },
            gridLines: {
                tickColor:'#dedede',
                color: "rgba(255,255,255,0.05)",      // color of the grid lines
                zeroLineColor: 'rgba(255,255,255,0.3)'     // Color of the axis
            },
            ticks: {
                fontColor: "#dedede",
                fontSize: 14,
            },
        }]
    }}
});

const MAG=document.getElementById('magnetometer').getContext('2d');
const mag = new Chart(MAG, {
    type: "line",
    data: {
        labels: lastThreeTime,
        datasets: [{
        fill: false,     
        label:'MAG_R',
        lineTension:0,
        // backgroundColor: "rgb(87, 192, 236, 1)",  
        backgroundColor: magRColor,  
        borderColor: magRColor,
        pointBackgroundColor: magRColor,
        data: mag_r,
        // borderWidth:2,
        // pointRadius:2,
        }, 
        {
        fill: false,
        label:'MAG_P',
        lineTension:0,
        // backgroundColor: "rgba(87, 192, 236, 1)",  
        backgroundColor: magPColor,  
        borderColor: magPColor,
        pointBackgroundColor:magPColor,
        data: mag_p,
        // borderWidth:2,
        // pointRadius:2,
    },
    { 
        fill: false,
        label:'MAG_Y',
        lineTension:0,
        // backgroundColor: "rgba(87, 192, 236, 1)",
        backgroundColor: magYColor,    
        borderColor: magYColor,
        pointBackgroundColor:magYColor,
        data: mag_y,
        // borderWidth:2,
        // pointRadius:2,
    }, 
    ]
    },
    options:{
        legend: {
            display:true,
            labels: {
                fontColor: "#dedede",
                fontSize: 12,
                fontFamily: 'Monaco',
            }
        },
    responsive: true,
    maintainAspectRatio: false,
    position:'left',
    align:'start',
    scales: {
        xAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'time',
                fontColor : '#dedede',
                fontSize : 14
            },
            gridLines: {
                tickColor:'#dedede',
                color: "rgba(255,255,255,0.05)",      // color of the grid lines
                // borderColor: "red",
                zeroLineColor: 'rgba(255,255,255,0.3)'     // Color of the axis
            },
            ticks: {
                fontColor: "#dedede",
                fontSize: 14,
            },
        }],
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'G',
                fontColor : '#dedede',
                fontSize : 14
            },
            gridLines: {
                tickColor:'#dedede',
                color: "rgba(255,255,255,0.05)",      // color of the grid lines
                zeroLineColor: 'rgba(255,255,255,0.3)'     // Color of the axis
            },
            ticks: {
                fontColor: "#dedede",
                fontSize: 14,
            },
        }]
    }}
});