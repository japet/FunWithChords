const audioCtx = new AudioContext();
const oscillators = {};
const gains = [];

// create an array to store the frequency input elements
const frequencyInputs = [];
const volumeSliders = [];

const pianoKeys = document.querySelectorAll('.key');

// create a function to add an oscillator
function selectNote(note) {
    //create an oscillator
    const oscillator = audioCtx.createOscillator();
    const noteName = note.getAttribute("note")
    const freq = Tonal.Note.freq(noteName);

    //pull freq from Tonal, set oscillator to that value
    oscillator.frequency.value = freq;//Tonal.Note.freq(note.getAttribute("note"));
    
    //create a gain control (volume), and set it to 10%
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.1; 
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // add the oscillator to an object that can be referenced note name
    oscillators[note.getAttribute("note")] = oscillator;
    oscillator.start();

    //create note info block/card
    let newDiv = document.createElement("div");
    newDiv.classList.add("noteCard");
    newDiv.setAttribute("noteName", noteName);
    newDiv.innerHTML = "Note: "+noteName+"<br> Freq:"+freq.toFixed(2);
    //add it in an existing div
    let parentDiv = document.querySelector("#noteBox");
    parentDiv.appendChild(newDiv);
}

// listen for the play button to be clicked
function play() {
    audioCtx.resume();
}

const piano1 = document.querySelector('#piano1');

piano1.addEventListener('key-strike', (event) => {
    const note = event.detail;
    const freq = Tonal.Note.freq(note);
    console.log("strike: "+event.detail);
    playOscillator(note);
    checkChord(document.querySelector('#piano1'));
    //create note info block/card
    let newDiv = document.createElement("div");
    newDiv.classList.add("noteCard");
    newDiv.setAttribute("noteName", note);
    newDiv.innerHTML = "Note: "+note+"<br> Freq:"+freq.toFixed(2);
    //add it in an existing div
    let parentDiv = document.querySelector("#noteBox");
    parentDiv.appendChild(newDiv);
});

function playOscillator(note){
    if(!oscillators[note]){
        const freq = Tonal.Note.freq(note);
        oscillators[note] = audioCtx.createOscillator();
        oscillators[note].frequency.value = freq;
        gains[note] = audioCtx.createGain();
        oscillators[note].connect(gains[note]);
        gains[note].connect(audioCtx.destination);
        oscillators[note].start(0)
    }
    gains[note].gain.value = 0.1;
}

piano1.addEventListener('key-release', (event) => {
    const note = event.detail;
    console.log("release: "+event.detail);
    stopOscillator(note);
    let noteBlock = document.querySelector("[noteName="+note+"]");
    noteBlock.remove();
    checkChord(document.querySelector('#piano1'));
});

function stopOscillator(note){
    if(oscillators[note]){
        gains[note].gain.value = 0;
    }
}

// listen for the pause button to be clicked
function pause() {
    audioCtx.suspend();
}

function checkChord(piano){
    const array1 = piano.activeNotes;
    const chordSymbol = Tonal.Chord.detect(array1);
    //console.log("check chord"+chord);
    document.getElementById("chordDisplay").innerHTML = chordSymbol;
}