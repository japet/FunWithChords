const audioCtx = new AudioContext();
const oscillators = {};
const gains = [];

// create an array to store the frequency input elements
const frequencyInputs = [];
const volumeSliders = [];

const pianoKeys = document.querySelectorAll('.key');

// create a function to add an oscillator
function addOscillator(note) {
    //create an oscillator
    const oscillator = audioCtx.createOscillator();
    const noteName = note.getAttribute("note")
    //pull freq from Tonal, set oscillator to that value
    oscillator.frequency.value = Tonal.Note.freq(note.getAttribute("note"));
    //oscillator.connect(audioCtx.destination);
    
    //create a gain control (volume), and set it to 10%
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.1; //set to almost silent to ramp up to avoid clip
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    //gainNode.gain.exponentialRampToValueAtTime(0.1, audioCtx.currentTime+0.05); //ramp up volume to avoid clipping

    // create an input element for frequency
    //const frequencyInput = document.createElement("input");
    //frequencyInput.type = "number";
    //frequencyInput.min = 20;
    //frequencyInput.max = 20000;
    //frequencyInput.value = freq;

    //create a gain element for 
    //const volumeSlider = document.createElement("input");
    //volumeSlider.type = "range";
   // volumeSlider.step = "0.02";
    //volumeSlider.min = 0;
   // volumeSlider.max = 1;
    //volumeSlider.value = 0.2;

    // add the frequency input element to the array
    //frequencyInputs.push(frequencyInput);
    //volumeSliders.push(volumeSlider);

    // add the frequency input element to the DOM
    //document.body.appendChild(frequencyInput);
    //document.body.appendChild(volumeSlider);
    //document.body.appendChild(document.createElement("br"));

    // listen for changes to the input value
    //frequencyInput.addEventListener("change", (event) => {
    //    oscillator.frequency.value = event.target.value;
   // });

   // volumeSlider.addEventListener("change", (event) => {
    //    gainNode.gain.value = event.target.value;
   // });

    // add the oscillator to the array
    oscillators[note.getAttribute("note")] = oscillator;
    //gains.push(gainNode);
    //note.setAttribute("oscillatorIndex", oscillators.length - 1);
    //console.log("adding");
    //console.log(note.getAttribute("oscillatorIndex"));
    //test.start();
    oscillator.start();
    console.log(oscillators);
}

function removeOscillator(note) {
    const noteName = note.getAttribute("note");
    const oscillator = oscillators[noteName];
    //const volume = gains[index];
    //volume.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime +1);
    oscillator.stop();
    oscillator.disconnect();
    delete oscillators[noteName];
    //note.removeAttribute("oscillatorIndex");
    //console.log(oscillators);
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
    if(!this.classList.contains("selected")){
        this.classList.add("selected");
        addOscillator(this);
    }else{
        this.classList.remove("selected");
        removeOscillator(this);
        console.log(oscillators);
    }
    checkChord();
    console.log(Tonal.Note.freq(this.getAttribute("note")));
}

function checkChord(){
    let divs = document.querySelectorAll('.selected');
    let array = [];
    
    //extract notes from the key divs
    divs.forEach((div)=> {
        array.push(div.getAttribute("note"));
    });

    //console.log(Tonal.Chord.detect(array));
    document.getElementById("chordDisplay").innerHTML = Tonal.Chord.detect(array);
    document.getElementById("noteDisplay").innerHTML = array;
}