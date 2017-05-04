import React from 'react';

const blocks = [{
  "type": "scenario",
  "message0": "scenario %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "children",
      "check": "phases"
    }
  ],
  "colour": 230,
  "tooltip": "A scenario",
  "helpUrl": ""
}, {
  "type": "phase",
  "message0": "phase %1 %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "phase_type",
      "options": [
        [ "Context", "context" ],
        [ "Anticipate", "anticipate" ],
        [ "Try it!", "try" ],
        [ "Reflect", "reflect" ],
        [ "Transition", "transition" ]
      ]
    },
    {
      "type": "input_statement",
      "name": "children",
      "check": "scene"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 144,
}, {
  "type": "scene",
  "message0": "scene %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "children",
      "check": "scene"
    },
    {
      "type": "input_value",
      "name": "text",
      "check": "String"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "A scene in the classroom",
  "helpUrl": ""
}, {
  "type": "text_representation_inline",
  "message0": "text %1",
  "args0": [{
    "type": "field_input",
    "name": "text",
    "text": ""
  }],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 182
}, {
  "type": "text_representation",
  "message0": "text %1",
  "args0": [{
    "type": "input_value",
    "name": "text",
    "check": "String"
  }],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 182
}, {
  "type": "text"
}, {
  "type": "image_representation",
  "message0": "image url %1",
  "args0": [{
    "type": "input_value",
    "name": "url",
    "check": "String"
  }],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 182
}, {
  "type": "video_representation",
  "message0": "video url %1",
  "args0": [{
    "type": "input_value",
    "name": "text",
    "check": "String"
  }],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 182
}, {
  "type": "audio_response",
  "message0": "speak",
  "previousStatement": null,
  "nextStatement": null,
  "colour": 308
}, {
  "type": "text_response",
  "message0": "type",
  "previousStatement": null,
  "nextStatement": null,
  "colour": 308
}];


function makeBlock(block) {
  const {type} = block;
  return <block key={type} type={type}></block>;
}

function makeLabel(text) {
  return <label key={text} ref={node => node && node.setAttribute('text', text)} />;
}

const tools = [].concat(
  blocks.slice(0,3).map(makeBlock),
  makeLabel('Representations:'),
  blocks.slice(3,8).map(makeBlock),
  makeLabel('Approximations:'),
  blocks.slice(8).map(makeBlock)
);


export {blocks, tools};