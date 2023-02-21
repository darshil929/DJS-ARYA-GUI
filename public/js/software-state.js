// Counter
let cntr = 0;

// Arrows
let states = Array.from(document.getElementsByClassName('ss-arrow'));
states = states.reverse();

let l = states.length - 1;

// Container Software State
let transitions = Array.from(document.getElementsByClassName('transition'));
transitions = transitions.reverse();

function setStateToPrevious(x) {
    x.style = "border-style: 1px solid #0080804a";
    x.style.backgroundColor = '#0080804a';
    x.style.color = '#334155';
}

function setStateToCurrent(x) {
    x.style = "border-style: 1px solid #008080";
    x.style.backgroundColor = '#008080';
    x.style.color = '#f1f5f9';
}

function setStateToTransparent(x) {
    x.style = "border-style: 1px solid #008080";
    x.style.backgroundColor = '#E1EBEE';
    x.style.color = '#334155';
}

function toClose() {
    states.forEach(state => {
        if(state.classList[1] === 'open') {
            state.classList.remove("open");
            state.classList.add("close");
        }
    });
}

function change(x) {
    if(x === 7 || x === 6 || x === 5) {
        toClose();

        for(let i = 7; i >= 5; i--) {
            states[i].classList.remove("close");
            states[i].classList.add("open");
        }
    } else if (x >= 0) {
        toClose();

        for(let i = x; i <= x+2; i++) {
            states[i].classList.remove("close");
            states[i].classList.add("open");
        }
    } 
}

function forSSEqualToZero(x) {
    if(cntr%2 === 0 ) {
        change(l);
    }

    for(let i = 0; i < x; i++) {
        setStateToTransparent(transitions[i]);
        // transitions[i].style = "box-shadow: 0 3px 10px rgba(255,255,255,0)"; 
        // transitions[i].style.backgroundColor = "transparent";
    }

    setStateToCurrent(transitions[x]);
    // transitions[x].style = "box-shadow: 0 0px 20px rgba(255,255,255,0.4)"; 
    // transitions[x].style.backgroundColor = "rgb(62,149,205)";

    transitions[x].style.transition = "1s";
}

function forRandomSS(x) {
    for(let i = 7; i > x; i--) {
        setStateToPrevious(transitions[i])
        // transitions[i].style = "box-shadow: 0 3px 10px rgba(255,255,255,0)"; 
        // transitions[i].style.backgroundColor = "rgba(62,149,205,0.5)";
    }
    for(let i = 0; i < x-1; i++) {
        setStateToTransparent(transitions[i])
        // transitions[i].style = "box-shadow: 0 3px 10px rgba(255,255,255,0)"; 
        // transitions[i].style.backgroundColor = "transparent";
    }
}

function trans(x, y, l) {
    if(cntr%2 === 0) {
        change(l);
    }

    setStateToPrevious(transitions[x])
    // transitions[x].style = "box-shadow: 0 3px 10px rgba(255,255,255,0)"; 
    // transitions[x].style.backgroundColor = "rgba(62,149,205,0.5)";

    setStateToCurrent(transitions[y])
    // transitions[y].style = "box-shadow: 0 0px 20px rgba(255,255,255,0.4)"; 
    // transitions[y].style.backgroundColor = "rgb(62,149,205)";

    forRandomSS(x);    
    
    transitions[y].style.transition = "1s";
    
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

// Icon
const iconUp = document.querySelector("#iconUp");
const iconDown = document.querySelector("#iconDown");

function oddCounter() {
    states.forEach(state => {
        if(state.classList[1] === 'close') {
            state.classList.remove("close");
            state.classList.add("open");
        } else if(state.classList[1] === 'open') {
            state.classList.remove("open");
            state.classList.add("open");
        }
    });
}

function evenCounter() {
    change(l);
}

iconUp.addEventListener('click', (e) => {
    e.preventDefault();
    cntr++;
    iconUp.classList.add('close');
    iconDown.classList.remove('close');
    evenCounter();
});

iconDown.addEventListener('click', (e) => {
    e.preventDefault();
    cntr++;
    iconDown.classList.add('close');
    iconUp.classList.remove('close');
    oddCounter();
});


/*          Test         */
// let c = 1;
// const interval = setInterval(() => {
//     if(c > 6) {
//         clearInterval(interval);
//     }

//     transition_ss(c);
//     c++;
// }, 2000);