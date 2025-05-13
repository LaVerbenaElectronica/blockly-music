
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
          },
          {
            "kind": "block",
            "type": "wait",
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
          },
          {
            kind: 'block',
            type: 'pop',
          }
        ],
      },
      {
        kind: "category",
        name: "volumen",
        colour: "75",
        contents: [
          {
            kind: 'block',
            type: 'sound_wave_vol',
          }
        ],
      },
      {
        kind: "category",
        name: "harmonics",
        colour: "315",
        contents: [
          {
            kind: 'block',
            type: 'poly_note',
          }
        ],
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


  // Create the definition of every custom Block.
  Blockly.Blocks['controls_repeat_ext'] = {
    init: function () {
		this.appendEndRowInput()
			.appendField('for each')
			.appendField('item')
			.appendField(new Blockly.FieldVariable(), "times");
		this.appendStatementInput('DO')
			.appendField('do');
		this.appendDummyInput()
			.appendField('end');
    } 
};

  Blockly.Blocks['wait'] = {
    init: function () {
        this.setPreviousStatement(true);
        this.appendDummyInput()
            .appendField("wait")
            .appendField(new Blockly.FieldNumber(1, 0, 10, 0.1), "wait");
        this.setNextStatement(true, null);
    } 
};


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
      this.appendDummyInput()
          .appendField("release")
          .appendField(new Blockly.FieldNumber(1, 0, 10, 0.1), "release");
      this.setNextStatement(true, null);
  } 
};

Blockly.Blocks['pop'] = {
  init: function () {
      this.setPreviousStatement(true);
      this.appendDummyInput()
          .appendField("pop")
          .appendField(new Blockly.FieldDropdown([["burp", "d1"], ["pap", "e2"], ["piu", "f3"], ["fiuuh", "g4"]]), "note");
      this.setNextStatement(true, null);
  } 
};

Blockly.Blocks['sound_wave_vol'] = {
  init: function () {
      this.setPreviousStatement(true);
      this.appendDummyInput()
          .appendField("note")
          .appendField(new Blockly.FieldDropdown([["c4", "c4"], ["d4", "d4"], ["e4", "e4"], ["f4", "f4"], ["g4", "g4"]]), "note")
          .appendField("wave")
          .appendField(new Blockly.FieldDropdown([["sine", "sine"], ["square", "square"], ["triangle", "triangle"], ["sawtooth", "sawtooth"]]), "wavetype")
          .appendField("dur")
          .appendField(new Blockly.FieldNumber(1, 0, 10, 0.1), "dur")
          .appendField("vol")
          .appendField(new Blockly.FieldNumber(1, 0, 2, 0.01), "vol");
      this.setNextStatement(true, null);
  } 
};

Blockly.Blocks['poly_note'] = {
  init: function () {
      this.setPreviousStatement(true);
      this.appendDummyInput()
          .appendField("poly note")
          .appendField(new Blockly.FieldDropdown([["c4", "261"], ["d4", "293"], ["e4", "329"], ["f4", "349"], ["g4", "391"]]), "note")
          .appendField("kind")
          .appendField(new Blockly.FieldDropdown([["harmonic", "harm"], ["inharmonic", "inharm"]]), "kind")
      this.setNextStatement(true, null);
  } 
};




//********************   Implementation of every custom Block. ***********************************//
//*********************************************************************************************** */
Blockly.JavaScript['controls_repeat_ext'] = function (block) {
  const times = block.getFieldValue('times');
  const code = ``;
  return code;
};

Blockly.JavaScript['wait'] = function (block) {
  const wait = block.getFieldValue('wait');
  timeDur = timeDur + wait;
  const code = `const loop = new Tone.Loop(function(time) {synth}, "2n").start(0);`;
  return code;
};

Blockly.JavaScript['sound_wave'] = function (block) {
  const note = block.getFieldValue('note');
  const waveType = block.getFieldValue('wavetype');
  const dur = 1;
  const code = `const synth` + num + ` = new Tone.Synth().toDestination();
  synth` + num + `.set({oscillator: {type: '${waveType}'}});
  synth` + num + `.triggerAttackRelease('${note}', `+ dur + `, now + ` + timeDur + `);`;
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
  num++;
  return code;
};

Blockly.JavaScript['sound_wave_envelope'] = function (block) {
  const note = block.getFieldValue('note');
  const waveType = block.getFieldValue('wavetype');
  const attack = block.getFieldValue('attack');
  const release = block.getFieldValue('release');
  const dur = 1;
  const code = `const synth` + num + ` = new Tone.Synth().toDestination();
  synth` + num + `.set({oscillator: {type: '${waveType}'}});
  synth` + num + `.set({envelope: {attack: '${attack}', decay: 0.15, sustain: '${dur}', release: '${release}'}});
  synth` + num + `.triggerAttackRelease('${note}', `+ (attack + dur + release) + `, now + ` + timeDur + `);`;
  num++;
  return code;
};


Blockly.JavaScript['pop'] = function (block) {
  const note = block.getFieldValue('note');
  const dur = 1;
  const code = `const synth` + num + ` = new Tone.MembraneSynth().toDestination();
  synth` + num + `.triggerAttackRelease('${note}', `+ dur + `, now + ` + timeDur + `);`;
  num++;
  return code;
};

Blockly.JavaScript['sound_wave_vol'] = function (block) {
  const note = block.getFieldValue('note');
  const waveType = block.getFieldValue('wavetype');
  const vol = block.getFieldValue('vol');
  const dur = block.getFieldValue('dur');
  const code = `const synth` + num + ` = new Tone.Synth().toDestination();
  synth` + num + `.set({oscillator: {type: '${waveType}'}});
  synth` + num + `.triggerAttackRelease('${note}', `+ dur + `, now + ` + timeDur + `, '${vol}');`;
  num++;
  return code;
};


Blockly.JavaScript['poly_note'] = function (block) {
  const note = block.getFieldValue('note');
  const kind = block.getFieldValue('kind');
  const waveType = "sine";
  const dur = 1;
  let code = `const synth` + num + ` = new Tone.PolySynth().toDestination();
  synth` + num + `.set({oscillator: {type: '${waveType}'}});
  synth0.set({envelope: {attack: 1, decay: 0.15, sustain: 1, release: 1}});`;
  if (kind == 'harm') {
    code = code + `synth` + num + `.triggerAttackRelease(['${note}', '${note}' * 2, '${note}' * 3, '${note}' * 4], `+ dur + `, now + ` + timeDur + `, 0.5);`;
  }
  else {
    code = code + `synth` + num + `.triggerAttackRelease(['${note}', '${note}' * 2.76, '${note}' * 5.40, '${note}' * 8.93], `+ dur + `, now + ` + timeDur + `, 0.5);`;
  }  
  num++;
  return code;
};
