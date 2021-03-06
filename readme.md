# Musicae

### Description

Play, improvise and compose music using *scale agnostic* midi sequences.

#### What does *scale agnostic* MIDI sequence mean?

##### **Only** play the **white keys** to play any scale.

Musicae is a simple approach to abstract MIDI notes to higher lever entities representing **note/chord degree** values. Meaning, incoming pitch values don't represent anymore their actual absolute pitch, but the **note/chord degree** they represent in the chosen scale.

**MONO** map incoming MIDI note(s) to note degree(s) in the modal scale.

**POLY** map incoming MIDI notes to chord degrees in the modal scale. (yes, you play chords just playing a single note)

More advantages about encoding sequences based on **note/chord degree**  (and not absolute pitch values) are:
- (re)play a sequence as it is played in any scale.
- easily re-use your MIDI sequences across projects.
- program/play sequences without actually thinking *which notes or chords should I play to be in tune*.

#### Mapping Pipeline

1. Map incoming MIDI note pitch to closest (lower) note in C Major (i.e. white keys)
2. Map resulting pitches to their *degree* in C Major.
3. Map *degree* to selected note/chord in scale determined by **root** note and its **mode**.

#### MIDI Export/Import

Input MIDI notes are interpreted, so in order to export MIDI files with mapping applied you can use a MIDI Channel in Live dedicated to receive input MIDI notes and output the remapped notes/chords. Then, record them and save to MIDI file.

### Install
1. Cloning repository

Open terminal and navigate to Max Packages folder

`cd ~/Documents/Max\ 8/Packages⁩`

Clone this repository

`git clone <this_repo_url>`

2. Download zip

Copy the downloaded zip to Max Packages folder

### Use in Ableton Live
M4L devices are located in ~/Documents/Max/Packages/musicae/devices
