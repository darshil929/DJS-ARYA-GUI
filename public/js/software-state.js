/*                  RANDOM SOFTWARE STATE                    */
// Counter
let cntr = 0;

// Arrows
const ss_arrows = document.getElementsByClassName('ss_arrow');
let l ;

// Container Software State
const transition = document.getElementsByClassName('transition');

function toClose() {
    Array.from(ss_arrows).forEach(i => {
        if(i.classList[1] === 'open') {
            i.classList.remove("open");
            i.classList.add("close");
        }
    });
}

function change(x) {
    if(x === 7 || x === 6 || x === 5) {
        toClose();

        for(let i = 7; i >= 5; i--) {
            ss_arrows[i].classList.remove("close");
            ss_arrows[i].classList.add("open");
        }
    } else if (x >= 0) {
        toClose();

        for(let i = x; i <= x+2; i++) {
            ss_arrows[i].classList.remove("close");
            ss_arrows[i].classList.add("open");
        }
    } 
}

function forSSEqualToZero(x) {
    if(cntr%2 === 0 ) {
        change(l);
    }

    for(let i = 0; i < x; i++) {
        transition[i].style = "box-shadow: 0 3px 10px rgba(255,255,255,0)"; 
        transition[i].style.backgroundColor = "transparent";
    }
    transition[x].style = "box-shadow: 0 0px 20px rgba(255,255,255,0.4)"; 
    transition[x].style.backgroundColor = "rgb(62,149,205)";

    transition[x].style.transition = "1s";
}

function forRandomSS(x) {
    for(let i = 7; i > x; i--) {
        transition[i].style = "box-shadow: 0 3px 10px rgba(255,255,255,0)"; 
        transition[i].style.backgroundColor = "rgba(62,149,205,0.5)";
    }
    for(let i = 0; i < x-1; i++) {
        transition[i].style = "box-shadow: 0 3px 10px rgba(255,255,255,0)"; 
        transition[i].style.backgroundColor = "transparent";
    }
}

function trans(x, y, l) {
    if(cntr%2 === 0) {
        change(l);
    }

    transition[x].style = "box-shadow: 0 3px 10px rgba(255,255,255,0)"; 
    transition[x].style.backgroundColor = "rgba(62,149,205,0.5)";

    transition[y].style = "box-shadow: 0 0px 20px rgba(255,255,255,0.4)"; 
    transition[y].style.backgroundColor = "rgb(62,149,205)";

    forRandomSS(x);    
    
    transition[y].style.transition = "1s";
    
}

function transition_ss(m) {
    m = 7 - m;
    l = m;
    if(m < 7 && m >= 0) {
        trans(m+1, m, l);
    } else if(m == 7) {
        forSSEqualToZero(m);
    }
}


// Tethered Payload Software State
const tp_transition = document.getElementsByClassName('tp-transition');
let n = tp_ss;

function tpSSqualToZero(x) {
    for(let i = 0; i < x; i++) {
        tp_transition[i].style = "box-shadow: 0 3px 10px rgba(255,255,255,0)"; 
        tp_transition[i].style.backgroundColor = "transparent";
    }
    tp_transition[x].style = "box-shadow: 0 0px 20px rgba(255,255,255,0.4)"; 
    tp_transition[x].style.backgroundColor = "rgb(62,149,205)";

    tp_transition[x].style.transition = "1s";
}

function tpRandomSS(x) {
    for(let i = 2; i > x; i--) {
        tp_transition[i].style = "box-shadow: 0 3px 10px rgba(255,255,255,0)"; 
        tp_transition[i].style.backgroundColor = "rgba(62,149,205,0.5)";
    }
    for(let i = 0; i <= x-1; i++) {
        tp_transition[i].style = "box-shadow: 0 3px 10px rgba(255,255,255,0)"; 
        tp_transition[i].style.backgroundColor = "transparent";
    }
}

function tp_trans(x, y) {
    tp_transition[x].style = "box-shadow: 0 3px 10px rgba(255,255,255,0)"; 
    tp_transition[x].style.backgroundColor = "rgba(62,149,205,0.5)";

    tp_transition[y].style = "box-shadow: 0 0px 20px rgba(255,255,255,0.4)"; 
    tp_transition[y].style.backgroundColor = "rgb(62,149,205)";

    tpRandomSS(y);

    tp_transition[y].style.transition = "1s";
}

function tp_transition_ss(n) {
    n = 2 - n;

    if(n < 2 && n >= 0) {
        tp_trans(n+1, n);
    } else if (n === 2) {
        tpSSqualToZero(n);
    }
}

// Icon
const icon = document.querySelector(".icon");
let arr = Array.from(ss_arrows);

function oddCounter() {
    // icon.style = 'transform: rotate(180deg)';
    icon.innerHTML = '<svg width="30" height="11" viewBox="0 0 75 44" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="3.13713" y1="40.206" x2="34.9569" y2="8.38621" stroke="white" stroke-width="8"/><line x1="71.5269" y1="40.1838" x2="34.5452" y2="3.20208" stroke="white" stroke-width="8"/></svg>';
    document.getElementById('SS').style.height = "969px";
    arr.forEach(a => {
        if(a.classList[1] === 'close') {
            a.classList.remove("close");
            a.classList.add("open");
        } else if(a.classList[1] === 'open') {
            a.classList.remove("open");
            a.classList.add("open");
        }
    });
}

function evenCounter() {
    // icon.style = 'transform: rotate(180deg) !important';
    icon.innerHTML = '<svg width="30" height="11" viewBox="0 0 74 43" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="2.82843" y1="3.17157" x2="39.7394" y2="40.0825" stroke="white" stroke-width="8"/><line x1="39.1716" y1="34.9914" x2="70.9914" y2="3.17158" stroke="white" stroke-width="8"/></svg>';
    document.getElementById('SS').style.height = "420px";
    change(l);
}

function checkCounter() {
    if(cntr%2 === 0) {
        evenCounter();
    } else {
        oddCounter();
    }
}

icon.addEventListener('click', (e) => {
    e.preventDefault();
    cntr++;
    checkCounter();
});