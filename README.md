# FunWithChords

A small browser experiment combining a `web-piano` custom element with Web Audio
tones and Tonal chord detection. There is no package install or build step.

## Local preview

From this repository, with Python 3 installed:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open <http://127.0.0.1:8000/> and stop the server with Ctrl-C. Serve only this
checkout; do not put private files in its directory.

`index.html` loads Tonal from jsDelivr without a pinned version, so chord/audio
behavior is not a fully offline or reproducible dependency baseline. The custom
element calls `navigator.requestMIDIAccess()` without a feature check. Use a
browser with Web MIDI, Web Audio, custom elements and Shadow DOM support; a
browser without Web MIDI may fail during element initialization. MIDI hardware
is optional, and browser/device permission remains a manual choice.

## Manual acceptance check

1. Start at low speaker volume. Open the browser console and verify both keyboards
   render without errors. Click **resume** if audio is suspended.
2. Focus the second keyboard (green indicator). Press `a`, `d`, and `g`; check
   highlighted keys, note cards, sound and the chord display.
3. Release keys and move focus away: selected notes should clear and tones stop.
   Try mouse press/release and the **mute**/**resume** buttons.
4. If explicitly testing MIDI hardware, verify note on/off and focus behavior.
   Record browser/version and any errors; this checklist is not a claim of a pass.

For an inexpensive syntax check, if Node is installed:

```sh
node --check webPiano.js
node --check tones.js
```

There is no automated browser suite. Before further development, prioritize an
unsupported-Web-MIDI fallback, reproducible Tonal loading, and tests for note
release when focus changes or a pointer leaves a key. Hosting ownership and the
current deployed state have not been verified; local preview does not deploy.
