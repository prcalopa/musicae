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

exports.interleaveVelocity = function(pitches, relVels, absVel) {
  var out = ["chord"];

  for (var i = 0; i < pitches.length; i++) {
    out.push(pitches[i]);
    out.push(Math.round(relVels[i] * absVel));
  }

  return out;
}

exports.chordNames = function(pitches, modes) {
  var out = [];

  for (var i = 0; i < pitches.length; i++) {
    var name = noteNames.get(pitches[i] % 12);
    out.push(String(name).concat(modes[i]));
  }

  return out;
}
