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
    
    //create a gain control (volume), and set it to 10%
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.1; 
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // add the oscillator to an object that can be referenced note name
    oscillators[note.getAttribute("note")] = oscillator;
    oscillator.start();
}

function removeOscillator(note) {
    const noteName = note.getAttribute("note");
    const oscillator = oscillators[noteName];
    oscillator.stop();
    oscillator.disconnect();
    delete oscillators[noteName];
}

// listen for the play button to be clicked
function play() {
    audioCtx.resume();
}

// listen for the pause button to be clicked
function pause() {
    audioCtx.suspend();
}

//add event listeners on all the piano keys to know when they are pressed
pianoKeys.forEach(pianoKey => {
    pianoKey.addEventListener("click", keypress);
});

//on key press
function keypress(){
    if(!this.classList.contains("selected")){
        this.classList.add("selected");
        addOscillator(this);
    }else{
        this.classList.remove("selected");
        removeOscillator(this);
    }
    checkChord(); //check if the set of currently selected notes are a chord
}

function checkChord(){
    let divs = document.querySelectorAll('.selected');
    let array = [];
    
    //extract notes from the key divs
    divs.forEach((div)=> {
        array.push(div.getAttribute("note"));
    });

    const chord = Tonal.Chord.detect(array);
    document.getElementById("chordDisplay").innerHTML = chord;
    document.getElementById("noteDisplay").innerHTML = array;
}