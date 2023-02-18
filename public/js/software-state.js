const state = Array.from(document.querySelectorAll(".stateName"));
const transition_ss = (x) => {
    x = x + 1;
    state[x-1].classList.add("currentSS");
    if(x > 1) {
        state[x-2].classList.remove("currentSS");
        state[x-2].classList.add("prevSS");
    }
};

const ssDivs = Array.from(document.querySelectorAll(".ss-arrow"));
function randomState(index) {
    if(index > 1 && index < 7) {
        ssDivs[index-2].classList.remove('open');
        ssDivs[index-2].classList.add('close');

        ssDivs[index+1].classList.remove('close');
        ssDivs[index+1].classList.remove('open');
    }
}