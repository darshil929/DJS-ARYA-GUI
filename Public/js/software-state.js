// function softwareState (data) {
//     var i;
//     var stateName = document.getElementsByClassName("stateName");
//     if (data == 1) {
//         i = 0;
//         stateName[i].style.borderStyle = "3px solid #008080";
//         stateName[i].style.backgroundColor = "#008080";
//         stateName[i].style.color = "#f1f5f9";
        
//         // JUGAAD
//             stateName[i+7].style.borderStyle = "3px solid #008080";
//             stateName[i+7].style.backgroundColor = "#008080";
//     }

//     if (data == 2) {
//         i = 1;
//         stateName[i].style.borderStyle = "3px solid #008080";
//         stateName[i].style.backgroundColor = "#008080";
//         stateName[i].style.color = "#f1f5f9";
//         stateName[i-1].style.borderStyle = "1px solid #0080804a";
//         stateName[i-1].style.backgroundColor = "#0080804a";
//         stateName[i-1].style.color = "#334155";
//         // JUGAAD
//             stateName[i+7].style.borderStyle = "3px solid #008080";
//             stateName[i+7].style.backgroundColor = "#008080";
//             stateName[i+7].style.color = "#f1f5f9";
//             stateName[i+6].style.borderStyle = "1px solid #0080804a";
//             stateName[i+6].style.backgroundColor = "#0080804a";
//             stateName[i+6].style.color = "#334155";
//     }

//     if (data == 3) {
//         i = 2;
//         stateName[i].style.borderStyle = "3px solid #008080";
//         stateName[i].style.backgroundColor = "#008080";
//         stateName[i].style.color = "#f1f5f9";
//         stateName[i-1].style.borderStyle = "1px solid #0080804a";
//         stateName[i-1].style.backgroundColor = "#0080804a";
//         stateName[i-1].style.color = "#334155";
//         // JUGAAD
//             stateName[i+7].style.borderStyle = "3px solid #008080";
//             stateName[i+7].style.backgroundColor = "#008080";
//             stateName[i+7].style.color = "#f1f5f9";
//             stateName[i+6].style.borderStyle = "1px solid #0080804a";
//             stateName[i+6].style.backgroundColor = "#0080804a";
//             stateName[i+6].style.color = "#334155";
//     }

//     if (data == 4) {
//         i = 3;
//         stateName[i].style.borderStyle = "3px solid #008080";
//         stateName[i].style.backgroundColor = "#008080";
//         stateName[i].style.color = "#f1f5f9";
//         stateName[i-1].style.borderStyle = "1px solid #0080804a";
//         stateName[i-1].style.backgroundColor = "#0080804a";
//         stateName[i-1].style.color = "#334155";
//         // JUGAAD
//             stateName[i+7].style.borderStyle = "3px solid #008080";
//             stateName[i+7].style.backgroundColor = "#008080";
//             stateName[i+7].style.color = "#f1f5f9";
//             stateName[i+6].style.borderStyle = "1px solid #0080804a";
//             stateName[i+6].style.backgroundColor = "#0080804a";
//             stateName[i+6].style.color = "#334155";
//     }

//     if (data == 5) {
//         i = 4;
//         stateName[i].style.borderStyle = "3px solid #008080";
//         stateName[i].style.backgroundColor = "#008080";
//         stateName[i].style.color = "#f1f5f9";
//         stateName[i-1].style.borderStyle = "1px solid #0080804a";
//         stateName[i-1].style.backgroundColor = "#0080804a";
//         stateName[i-1].style.color = "#334155";
//         // JUGAAD
//             stateName[i+7].style.borderStyle = "3px solid #008080";
//             stateName[i+7].style.backgroundColor = "#008080";
//             stateName[i+7].style.color = "#f1f5f9";
//             stateName[i+6].style.borderStyle = "1px solid #0080804a";
//             stateName[i+6].style.backgroundColor = "#0080804a";
//             stateName[i+6].style.color = "#334155";
//     }

//     if (data == 6) {
//         i = 5;
//         stateName[i].style.borderStyle = "3px solid #008080";
//         stateName[i].style.backgroundColor = "#008080";
//         stateName[i].style.color = "#f1f5f9";
//         stateName[i-1].style.borderStyle = "1px solid #0080804a";
//         stateName[i-1].style.backgroundColor = "#0080804a";
//         stateName[i-1].style.color = "#334155";
//         // JUGAAD
//             stateName[i+7].style.borderStyle = "3px solid #008080";
//             stateName[i+7].style.backgroundColor = "#008080";
//             stateName[i+7].style.color = "#f1f5f9";
//             stateName[i+6].style.borderStyle = "1px solid #0080804a";
//             stateName[i+6].style.backgroundColor = "#0080804a";
//             stateName[i+6].style.color = "#334155";
//     }

//     if (data == 7) {
//         i = 6;
//         stateName[i].style.borderStyle = "3px solid #008080";
//         stateName[i].style.backgroundColor = "#008080";
//         stateName[i].style.color = "#f1f5f9";
//         stateName[i-1].style.borderStyle = "1px solid #0080804a";
//         stateName[i-1].style.backgroundColor = "#0080804a";
//         stateName[i-1].style.color = "#334155";
//         // JUGAAD
//             stateName[i+7].style.borderStyle = "3px solid #008080";
//             stateName[i+7].style.backgroundColor = "#008080";
//             stateName[i+7].style.color = "#f1f5f9";
//             stateName[i+6].style.borderStyle = "1px solid #0080804a";
//             stateName[i+6].style.backgroundColor = "#0080804a";
//             stateName[i+6].style.color = "#334155";
//     }

// }


// let cntr = 0;

// // Arrows
// const ss_arrows = document.getElementsByClassName('ss_arrow');
// let l ;

// // Container Software State
// const transition = document.getElementsByClassName('transition');

// function toClose() {
//     Array.from(ss_arrows).forEach(i => {
//         if(i.classList[1] === 'open') {
//             i.classList.remove("open");
//             i.classList.add("close");
//         }
//     });
// }

// function change(x) {
//     if(x === 7 || x === 6 || x === 5) {
//         toClose();

//         for(let i = 7; i >= 5; i--) {
//             ss_arrows[i].classList.remove("close");
//             ss_arrows[i].classList.add("open");
//         }
//     } else if (x >= 0) {
//         toClose();

//         for(let i = x; i <= x+2; i++) {
//             ss_arrows[i].classList.remove("close");
//             ss_arrows[i].classList.add("open");
//         }
//     } 
// }

// function forSSEqualToZero(x) {
//     if(cntr%2 === 0 ) {
//         change(l);
//     }

//     for(let i = 0; i < x; i++) {
//         transition[i].style = "box-shadow: 0 3px 10px rgba(255,255,255,0)"; 
//         transition[i].style.backgroundColor = "transparent";
//     }
//     transition[x].style = "box-shadow: 0 0px 20px rgba(255,255,255,0.4)"; 
//     transition[x].style.backgroundColor = "rgb(62,149,205)";

//     transition[x].style.transition = "1s";
// }

// function forRandomSS(x) {
//     for(let i = 7; i > x; i--) {
//         transition[i].style = "box-shadow: 0 3px 10px rgba(255,255,255,0)"; 
//         transition[i].style.backgroundColor = "rgba(62,149,205,0.5)";
//     }
//     for(let i = 0; i < x-1; i++) {
//         transition[i].style = "box-shadow: 0 3px 10px rgba(255,255,255,0)"; 
//         transition[i].style.backgroundColor = "transparent";
//     }
// }

// function trans(x, y, l) {
//     if(cntr%2 === 0) {
//         change(l);
//     }

//     transition[x].style = "box-shadow: 0 3px 10px rgba(255,255,255,0)"; 
//     transition[x].style.backgroundColor = "rgba(62,149,205,0.5)";

//     transition[y].style = "box-shadow: 0 0px 20px rgba(255,255,255,0.4)"; 
//     transition[y].style.backgroundColor = "rgb(62,149,205)";

//     forRandomSS(x);    
    
//     transition[y].style.transition = "1s";
    
// }

// function transition_ss(m) {
//     m = 7 - m;
//     l = m;
//     if(m < 7 && m >= 0) {
//         trans(m+1, m, l);
//     } else if(m == 7) {
//         forSSEqualToZero(m);
//     }
// }

const state = document.querySelectorAll(".stateName");

const transition_ss = (x) => {
    state[x-1].classList.add("currentSS");
    if(x > 1) {
        state[x-2].classList.remove("currentSS");
        state[x-2].classList.add("prevSS");
    }
};

const ssDivs = document.querySelectorAll(".ss-arrow");
const displayStates = (x) => {
    for (let i = 0; i < ssDivs.length; i++) {
      if (i >= x-3 && i < x) {
        ssDivs[i].style.display = 'block';
    } else {
        ssDivs[i].style.display = 'none';
      }
    }
};
