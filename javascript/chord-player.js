autowatch=1;

inlets=1;
outlets=2;

/// Variables
// Scale degrees absolute pitch value
var scalePitchClasses;
// Scale chord modes
var chordDegrees;
// Chord partials velocities
var velocities = [1.0,1.0,1.0,1.0];
// Chord extension
var add7th = 0;

/// Constant (initialized in init function)
var chords;
var chordsInScale;
var noteNames;
var whiteKeysMap;

function init() {

  // Maps chord mode to the chord partial semitones values from chord root note
  chords = new Dict("chord-pitches");
  chords.import_json("chords.json");

  chordsInScale = new Dict("chords-in-scale-dict");
  chordsInScale.import_json("chords-in-scale.json");

  noteNames = new Dict("note-names-dict");
  noteNames.import_json("note-names.json");

  whiteKeysMap = new Dict("white-keys-map-dict");
  whiteKeysMap.import_json("white-keys-map.json");

  post("Chord player object initialized");
  post();
}

function loadbang() {
  init();
}

function setScale() {
  var input = arrayfromargs("setScale", arguments);
  var mode = input[1];
  var pitchClasses = input.slice(2);

  scalePitchClasses = pitchClasses;
  chordDegrees = chordsInScale.get(mode);

  var names = chordNames(scalePitchClasses,chordDegrees);

  outlet(1,names);
}

function playChord(inputPitch, velocity)
{
  // As the calculations are done in [0-11] range (1oct) we should keep the
  // offset to retain octave from the input note
  var noteOffset = Math.floor(inputPitch/12)*12;

  // Map the input pitch to the closest in CMaj(the white keys)
  // Using this plugin the keys represent a DEGREE and not their pitch value.
  // For instance, C will always be the 1st degree/root of the chosen scale.
  var degree = whiteKeysMap.get(inputPitch % 12);

  // Current chord mode to retrieve (M,m,dim,...)
  const currentChordMode = chordDegrees[degree];

  // Array with chord partial pitches
  var currentChordPartials = chords.get(currentChordMode);

  // Extend chord
  if (add7th == 1) {
    currentChord = addSeventh(currentChordPartials, currentChordMode);
  }

  // Chord root in absolute pitch value
  const currentChordRoot = scalePitchClasses[degree];

  // Add root pitch value and note offset to chord partials to build chord
  const chord = addConstant(currentChordPartials, currentChordRoot+noteOffset);

  // Create array interleaving pitch/velocity values
  var chordWithVel = interleaveVelocity(chord, velocities, velocity);

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
    post(velocities);
    post();
  }
}

function addSeventh(chord, mode) {
  var seventhPitch;
  if (mode == "m" && mode == "dim"){
    seventhPitch = 10;
  } else if("M") {
    seventhPitch = 11;
  }
  chord.push(seventhPitch);
  return chord;
}

function addConstant(array, constant) {
  const out = [];
  array.forEach(function(item){
    out.push(item + constant);
  });
  return out;
}

function interleaveVelocity(pitches, relVels, absVel) {
  var out = ["chord"];

  for (var i = 0; i < pitches.length; i++) {
    out.push(pitches[i]);
    out.push(Math.round(relVels[i] * absVel));
  }

  return out;
}

function chordNames(pitches, modes) {
  var out = [];

  for (var i = 0; i < pitches.length; i++) {
    var name = noteNames.get(pitches[i] % 12);
    out.push(String(name).concat(modes[i]));
  }

  return out;
}
