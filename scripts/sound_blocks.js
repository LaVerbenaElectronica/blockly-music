/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: 'play_sound',
    message0: 'Play %1',
    args0: [
      {
        type: 'field_dropdown',
        name: 'VALUE',
        options: [
          ['C4', 'sounds/c4.m4a'],
          ['D4', 'sounds/d4.m4a'],
          ['E4', 'sounds/e4.m4a'],
          ['F4', 'sounds/f4.m4a'],
          ['G4', 'sounds/g4.m4a'],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 355,
  },
  {
  type: "sample_speed",
  tooltip: "Write 1 for normal speed, 2 for double",
  helpUrl: "",
  message0: "play sample with speed %1 %2",
  args0: [
    {
      type: "field_number",
      name: "rate",
      value: 1
    },
    {
      type: "input_end_row",
      name: "speed"
    }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 285
  },                  
]);

javascript.javascriptGenerator.forBlock['play_sound'] = function (block) {
  const value = "'" + block.getFieldValue('VALUE') + "'";
  return 'MusicMaker.queueSound(' + value + ');\n';
};

javascript.javascriptGenerator.forBlock['sample_speed'] = function (block) {
  const value = "'" + block.getFieldValue('VALUE') + "'";
  return 'MusicMaker.queueSound(' + value + ');\n';
};
