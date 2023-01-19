const audioCtx = new AudioContext();
const oscillators = [];

// create an array to store the frequency input elements
const frequencyInputs = [];
const volumeSliders = [];

const pianoKeys = document.querySelectorAll('.key');

// create a function to add an oscillator
function addOscillator() {
    // create an oscillator node
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.2;
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // create an input element for frequency
    const frequencyInput = document.createElement("input");
    frequencyInput.type = "number";
    frequencyInput.min = 20;
    frequencyInput.max = 20000;
    frequencyInput.value = 440;

    //create a gain element for 
    const volumeSlider = document.createElement("input");
    volumeSlider.type = "range";
    volumeSlider.step = "0.02";
    volumeSlider.min = 0;
    volumeSlider.max = 1;
    volumeSlider.value = 0.2;

    // add the frequency input element to the array
    frequencyInputs.push(frequencyInput);
    volumeSliders.push(volumeSlider);

    // add the frequency input element to the DOM
    document.body.appendChild(frequencyInput);
    document.body.appendChild(volumeSlider);
    document.body.appendChild(document.createElement("br"));

    // listen for changes to the input value
    frequencyInput.addEventListener("change", (event) => {
        oscillator.frequency.value = event.target.value;
    });

    volumeSlider.addEventListener("change", (event) => {
        gainNode.gain.value = event.target.value;
    });

    // add the oscillator to the array
    oscillators.push(oscillator);
    oscillator.start();
}

// listen for the play button to be clicked
function play() {
    audioCtx.resume();
}

// listen for the pause button to be clicked
function pause() {
    audioCtx.suspend();
}

pianoKeys.forEach(pianoKey => {
    pianoKey.addEventListener("click", keypress);
});

function keypress(){
    console.log(this);
    console.log("clicked!");
    if(!this.classList.contains("selected")){
        this.classList.add("selected");
        this.classList.remove("unselected");
    }else{
        this.classList.remove("selected");
        this.classList.add("unselected");
    }
}