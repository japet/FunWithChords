const audioCtx = new AudioContext();
const oscillators = [];

// create an array to store the frequency input elements
const frequencyInputs = [];
const volumeSliders = [];

// create a function to add an oscillator
function addOscillator() {
    // create an oscillator node
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    //oscillator.connect(audioCtx.destination);
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

    volumeSlider.addEventListener("input", (event) => {
        gainNode.gain.value = event.target.value;
    });

    // add the oscillator to the array
    oscillators.push(oscillator);
    oscillator.start();
}

// listen for the play button to be clicked
function play() {
    // start all oscillators in the array
    audioCtx.resume();
   // for (const oscillator of oscillators) {
  //      console.log(oscillator.state === "running");
   //     oscillator.start();
   //     console.log(oscillator.state === "running");
   // }
   // console.log(oscillators);
   // console.log(audioCtx);
}

// listen for the pause button to be clicked
function pause() {
    // stop all oscillators in the array
    audioCtx.suspend();

    //for (const oscillator of oscillators) {
    //    console.log(oscillator.state === "running");
    //    oscillator.stop();
    //    console.log(oscillator.state === "running");
    //}
    //console.log(oscillators);
    //console.log(audioCtx);
}

