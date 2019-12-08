# Musicae
## Music creation tools

### Use in Ableton Live
M4L devices are located in ~/Documents/Max/Packages/musicae/devices

#### Devices
- musicae.mono
- musicae.chord

### Description

Play, improvise and compose music using *scale agnostic* midi sequences.

#### What does *scale agnostic* MIDI sequence mean?

##### **Only** play the **white keys** to play any scale.

Musicae is a simple approach to abstract MIDI notes to higher lever entities representing **note/chord degree** values. Meaning, incoming pitch values don't represent anymore their actual absolute pitch, but the **note/chord degree** they represent in the CMajor scale. 

**musicae.mono** map incoming MIDI note(s) to note degree(s) in the modal scale.

**musicae.chord** map incoming MIDI notes to chord degrees in the modal scale. (yes, you play chords just playing a single note)

More advantages about encoding sequences based on **note/chord degree**  (and not absolute pitch values) are:
- (re)play a sequence as it is played in any scale, while it was recorded in CMajor.
- easily re-use your MIDI sequences across projects.
- program/play sequences without actually thinking *which notes or chords should I play to be in tune*.

#### Mapping Pipeline

1. Map incoming MIDI note pitch to closest (lower) note in C Major (i.e. white keys) 
2. Map resulting pitches to their *degree* in C Major. 
3. Map *degree* to selected note/chord in scale determined by **root** note and its **mode**.




