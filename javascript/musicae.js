autowatch=1;

inlets=1;
outlets=2;

var utils = require("musicae-utils");
// player

// Scale degrees absolute pitch value
var scalePitchClasses;
// Scale chord modes
var scaleChordModes;
// Chord partials velocities
var velocities = [1.0,1.0,1.0,1.0];
// Chord extension
var add7th = 0;

// Constants (initialized in init function)
// Mono and Poly player
var chords = new Dict("chord-pitches");
var chordsInScale = new Dict("chords-in-scale-dict");
var noteNames = new Dict("note-names-dict");
var whiteKeysMap = new Dict("white-keys-map-dict");
// Scale
var modeIntervals = new Dict("mode-intervals");
var intervalSemitones = new Dict("interval-semitones");
var noteSemitones = new Dict("note-semitones");

function init() {

  chords.import_json("chords.json");
  chordsInScale.import_json("chords-in-scale.json");
  noteNames.import_json("note-names.json");
  whiteKeysMap.import_json("white-keys-map.json");
  modeIntervals.import_json("modal.json");
  intervalSemitones.import_json("interval.json");
  noteSemitones.import_json("notes.json");

  post("Chord player object initialized");
  post();
}

function loadbang() {
  init();
}

function setScale(rootName, mode) {
  const root = noteSemitones.get(rootName);

  const intervals = modeIntervals.get(mode);

  var scale = [];

  intervals.forEach(function(item){
    const st = intervalSemitones.get(item);
    scale.push(st+root);
  });

  scalePitchClasses = scale;
  scaleChordModes = chordsInScale.get(mode);

  const names = utils.chordNames(scalePitchClasses,scaleChordModes);

  outlet(1,names);
}

function playNote(inputPitch, velocity)
{
  // As the calculations are done in [0-11] range (1oct) we should keep the
  // offset to retain octave from the input note
  const noteOffset = Math.floor(inputPitch/12)*12;

  // Map the input pitch to the closest in CMaj(the white keys)
  // Using this plugin the keys represent a DEGREE and not their pitch value.
  // For instance, C will always be the 1st degree/root of the chosen scale.
  const degree = whiteKeysMap.get(inputPitch % 12);

  const pitch = scalePitchClasses[degree]+noteOffset;

  // Create note with pitch and velocity values
  const noteWithVel = ["chord", pitch, velocity];

  post(noteWithVel);
  post();
  outlet(0,noteWithVel);
}

function playChord(inputPitch, velocity)
{
  // As the calculations are done in [0-11] range (1oct) we should keep the
  // offset to retain octave from the input note
  const noteOffset = Math.floor(inputPitch/12)*12;

  // Map the input pitch to the closest in CMaj(the white keys)
  // Using this plugin the keys represent a DEGREE and not their pitch value.
  // For instance, C will always be the 1st degree/root of the chosen scale.
  const degree = whiteKeysMap.get(inputPitch % 12);

  // Current chord mode to retrieve (M,m,dim,...)
  const currentChordMode = scaleChordModes[degree];

  // Array with chord partial pitches
  const currentChordPartials = chords.get(currentChordMode);

  // Extend chord
  if (add7th == 1) {
    utils.addSeventh(currentChordPartials, currentChordMode);
  }

  // Chord root in absolute pitch value
  const currentChordRoot = scalePitchClasses[degree];

  // Add root pitch value and note offset to chord partials to build chord
  const chord = utils.addConstant(currentChordPartials, currentChordRoot+noteOffset);

  // Create array interleaving pitch/velocity values
  const chordWithVel = utils.interleaveVelocity(chord, velocities, velocity);

  post(chordWithVel);
  post();
  outlet(0,chordWithVel);
}

function setAdd7th(flag) {
  add7th = flag;
}

function setVelocities(){
  if (arguments.length != 4) {
    error("You must input a list of 4 velocity values")
  }
  else {
    velocities = arrayfromargs("setVelocities", arguments).slice(1);
  }
}
