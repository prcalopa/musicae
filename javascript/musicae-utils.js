exports.MAX_NOTES_IN_CHORD = 4;

exports.addSeventh = function(chord, mode) {
  if (mode == "m" && mode == "dim"){
    chord.push(10);
  } else if("M") {
    chord.push(11);
  }

}

exports.addConstant = function(array, constant) {
  const out = [];
  array.forEach(function(item){
    out.push(item + constant);
  });
  return out;
}

exports.makeNotes = function(pitches, relVels, absVel) {
  var out = ["chord"];

  for (var i = 0; i < pitches.length; i++) {
    out.push(pitches[i]);
    out.push(Math.round(relVels[i] * absVel));
  }

  return out;
}

exports.applyRandomVelocity = function(chord, mode, velRandRange) {
  // input must be an array like ["chord",pitch0,vel0,pitch1,vel1,...]
  var noteList = chord.slice(1);

  var noteNum = 0;
  for (var i = 1; i < noteList.length; i=i+2) {

    const rnd = Math.floor(Math.random() * velRandRange[noteNum]);

    if(mode[noteNum] === "add"){
      chord[i+1] = clamp(noteList[i] + rnd, 0, 127);
    }
    else if (mode[noteNum] === "sub") {
      chord[i+1] = clamp(noteList[i] - rnd, 0, 127);
    }
    else if (mode[noteNum] === "bi") {
      const rndSign = Math.floor(Math.random() * 2);

      if(rndSign>0){
        chord[i+1] = clamp(noteList[i] + rnd, 0, 127);
      }
      else{
        chord[i+1] = clamp(noteList[i] - rnd, 0, 127);
      }
    }

    noteNum ++;
  }

  return chord;
}

exports.chordNames = function(pitches, modes) {
  var out = [];

  for (var i = 0; i < pitches.length; i++) {
    var name = noteNames.get(pitches[i] % 12);
    out.push(String(name).concat(modes[i]));
  }

  return out;
}

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}
