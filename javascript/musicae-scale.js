autowatch=1;

inlets=1;
outlets=1;

var modeIntervals;
var intervalSemitones;
var noteSemitones;

function init(){
  modeIntervals = new Dict("mode-intervals");
  modeIntervals.import_json("modal.json");

  intervalSemitones = new Dict("interval-semitones");
  intervalSemitones.import_json("interval.json");

  noteSemitones = new Dict("note-semitones");
  noteSemitones.import_json("notes.json");
}

function loadbang(){
  init();
}

function set(rootName, mode){

  const root = noteSemitones.get(rootName);

  const intervals = modeIntervals.get(mode);

  var scale = [mode];

  intervals.forEach(function(item){
    const st = intervalSemitones.get(item);
    scale.push(st+root);
  });

  outlet(0, scale);
}
