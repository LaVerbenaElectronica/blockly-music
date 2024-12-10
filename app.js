
const playBTN = document.getElementById("play-btn");
let timeDur = 0; //it controls the duration of the notes
let num = 0; //it controls the number of synths on a given play.

// Generate JavaScript code and run it
async function runCode() {

  await Tone.start();

  // convert workspace to text code
  Blockly.JavaScript.addReservedWords('code');
  const code = Blockly.JavaScript.workspaceToCode(workspace);

  // test adding Tone synth trigger
  wrapCode = `const now = Tone.now();` + code

  console.log(wrapCode);
  // evaluate code
  try {
      eval(wrapCode);
  } catch (e) {
      alert(e);
  }
}

playBTN.addEventListener("click", () => {
  timeDur = 0;
  num = 0;
  runCode();
})

const toolbox = {
    kind: 'categoryToolbox',
    contents: [
      {
        kind: "category",
        name: "control",
        colour: "212",
        contents: [
          {
            kind: 'block',
            type: 'controls_repeat_ext',
            inputs: {
              TIMES: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 5,
                  },
                },
              },
            },
          },
          {
            "kind": "block",
            "type": "math_number",
            "fields": {
              "NUM": 1
            }
          }
        ],
      },
      {
        kind: "category",
        name: "wave",
        colour: "0",
        contents: [
          {
            kind: 'block',
            type: 'sound_wave',
          }
        ],
      },
      {
        kind: "category",
        name: "duration",
        colour: "43",
        contents: [
          {
            kind: 'block',
            type: 'sound_wave_dur',
          }
        ]
      },
      {
        kind: "category",
        name: "envelope",
        colour: "61",
        contents: [
          {
            kind: 'block',
            type: 'sound_wave_envelope',
          }
        ],
      },
      {
        kind: "category",
        name: "release",
        colour: "75",
        contents: [],
      },
      {
        kind: "category",
        name: "harmonics",
        colour: "315",
        contents: [],
      },
      {
        kind: "category",
        name: "filtering",
        colour: "357",
        contents: [],
      },
      {
        kind: "category",
        name: "modulation",
        colour: "110",
        contents: [],
      },
      {
        kind: "category",
        name: "speed",
        colour: "204",
        contents: [],
      },
      {
        kind: "category",
        name: "effects",
        colour: "159",
        contents: [],
      }
    ],
  };

  const workspace = Blockly.inject('blocklyDiv', {
    toolbox: toolbox,
    scrollbars: false,
    horizontalLayout: false,
    toolboxPosition: 'start',
  });


  // Create the definition.
Blockly.Blocks['sound_wave'] = {
    init: function () {
        this.setPreviousStatement(true);
        this.appendDummyInput()
            .appendField("note")
            .appendField(new Blockly.FieldDropdown([["c4", "c4"], ["d4", "d4"], ["e4", "e4"], ["f4", "f4"], ["g4", "g4"]]), "note")
            .appendField("wave")
            .appendField(new Blockly.FieldDropdown([["sine", "sine"], ["square", "square"], ["triangle", "triangle"], ["sawtooth", "sawtooth"]]), "wavetype");
        this.setNextStatement(true, null);
    } 
};

Blockly.Blocks['sound_wave_dur'] = {
  init: function () {
      this.setPreviousStatement(true);
      this.appendDummyInput()
          .appendField("note")
          .appendField(new Blockly.FieldDropdown([["c4", "c4"], ["d4", "d4"], ["e4", "e4"], ["f4", "f4"], ["g4", "g4"]]), "note")
          .appendField("wave")
          .appendField(new Blockly.FieldDropdown([["sine", "sine"], ["square", "square"], ["triangle", "triangle"], ["sawtooth", "sawtooth"]]), "wavetype")
          .appendField("dur")
          .appendField(new Blockly.FieldNumber(1, 0, 10, 0.1), "dur");
      this.setNextStatement(true, null);
  } 
};

Blockly.Blocks['sound_wave_envelope'] = {
  init: function () {
      this.setPreviousStatement(true);
      this.appendDummyInput()
          .appendField("note")
          .appendField(new Blockly.FieldDropdown([["c4", "c4"], ["d4", "d4"], ["e4", "e4"], ["f4", "f4"], ["g4", "g4"]]), "note")
          .appendField("wave")
          .appendField(new Blockly.FieldDropdown([["sine", "sine"], ["square", "square"], ["triangle", "triangle"], ["sawtooth", "sawtooth"]]), "wavetype");
      this.appendDummyInput()
          .appendField("attack")
          .appendField(new Blockly.FieldNumber(1, 0, 10, 0.1), "attack");
      this.setNextStatement(true, null);
  } 
};

Blockly.JavaScript['sound_wave'] = function (block) {
  const note = block.getFieldValue('note');
  const waveType = block.getFieldValue('wavetype');
  const dur = 1;
  const code = `const synth` + num + ` = new Tone.Synth().toDestination();
  synth` + num + `.set({oscillator: {type: '${waveType}'}});
  synth` + num + `.triggerAttackRelease('${note}', `+ dur + `, now + ` + timeDur + `);`;
  timeDur = timeDur + dur;
  num++;
  return code;
};

Blockly.JavaScript['sound_wave_dur'] = function (block) {
  const note = block.getFieldValue('note');
  const waveType = block.getFieldValue('wavetype');
  const dur = block.getFieldValue('dur');
  const code = `const synth` + num + ` = new Tone.Synth().toDestination();
  synth` + num + `.set({oscillator: {type: '${waveType}'}});
  synth` + num + `.triggerAttackRelease('${note}', `+ dur + `, now + ` + timeDur + `);`;
  timeDur = timeDur + dur;
  num++;
  return code;
};

Blockly.JavaScript['sound_wave_envelope'] = function (block) {
  const note = block.getFieldValue('note');
  const waveType = block.getFieldValue('wavetype');
  const attack = block.getFieldValue('attack');
  const dur = 1;
  const code = `const synth` + num + ` = new Tone.Synth().toDestination();
  synth` + num + `.set({oscillator: {type: '${waveType}'}});
  synth` + num + `.set({envelope: {attack: '${attack}', decay: 0.15, sustain: 1, release: 5}});
  synth` + num + `.triggerAttackRelease('${note}', `+ dur + `, now + ` + timeDur + `);`;
  timeDur = timeDur + dur;
  num++;
  return code;
};

