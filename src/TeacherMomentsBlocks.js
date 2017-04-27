export default [{
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
  "type": "context",
  "message0": "context %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "children",
      "check": "scene"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 144,
  "tooltip": "The initial context",
  "helpUrl": ""
}, {
  "type": "anticipate",
  "message0": "anticipate %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "children",
      "check": "scene"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 144
}, {
  "type": "reflect",
  "message0": "reflect %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "children",
      "check": "scene"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 144
}, {
  "type": "scenes",
  "message0": "scenes %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "children",
      "check": "scene"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "The scenes in the classroom",
  "helpUrl": ""
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
  "type": "text_representation",
  "message0": "text %1",
  "args0": [{
    "type": "input_value",
    "name": "text",
    "check": "String"
  }],
  "previousStatement": null,
  "nextStatement": null
}, {
  "type": "image_representation",
  "message0": "image url %1",
  "args0": [{
    "type": "input_value",
    "name": "url",
    "check": "String"
  }],
  "previousStatement": null,
  "nextStatement": null
}, {
  "type": "video_representation",
  "message0": "video url %1",
  "args0": [{
    "type": "input_value",
    "name": "text",
    "check": "String"
  }],
  "previousStatement": null,
  "nextStatement": null
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
}, {
  "type": "text"
}];