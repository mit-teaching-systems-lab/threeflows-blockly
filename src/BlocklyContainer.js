import React, { Component } from 'react';
import Blockly from 'node-blockly/browser';



class BlocklyContainer extends Component {
  propTypes: {
    blocks: React.PropTypes.array.isRequired,
    style: React.PropTypes.object
  }

  constructor() {
    super();
    this.workspace = null;
    this.toolboxEl = null;
    this.areaId = 'areaId';
    this.divId = 'divId';
  }

  componentDidMount() {
    // Register blocks
    const {blocks} = this.props;
    blocks.forEach((block) => {
      if (Blockly.Blocks[block.type]) return;
      Blockly.Blocks[block.type] = {
        init() {
          this.jsonInit(block);
        }
      };
    }, this);

    // Inject Blockly UI
    var blocklyDiv = this.divEl;
    this.workspace = Blockly.inject(blocklyDiv, {
      toolbox: this.toolboxEl,
      grid: {
        colour: '#ccc',
        spacing: 20,
        length: 3
      },
      zoom: {
        controls: true,
        wheel: false
      },
      trashcan: true
    });

    // Set up resizing
    window.addEventListener('resize', this.onResize.bind(this), false);
    this.onResize();
    Blockly.svgResize(this.workspace);

    // Listen for changes
    this.workspace.addChangeListener(this.onBlocklyEvent.bind(this));
  }

  componentWillUnmount() {
    // TODO(kr)
  }

  componentWillReceiveProps(nextProps, nextState) {
    const {xmlText} = this.props;
    if (nextProps.xmlText && nextProps.xmlText !== xmlText) {
      this.loadBlocks(nextProps.xmlText);
    }
  }

  loadBlocks(xmlText) {
    const xml = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.domToWorkspace(xml, this.workspace);
  }

  onBlocklyEvent(e) {
    const xml = Blockly.Xml.workspaceToDom(this.workspace);
    const xmlText = Blockly.Xml.domToText(xml);
    this.props.onChange(xmlText);
  }

  onResize() {
    var blocklyArea = this.areaEl;
    var blocklyDiv = this.divEl;

    // Compute the absolute coordinates and dimensions of blocklyArea.
    var element = blocklyArea;
    var x = 0;
    var y = 0;
    do {
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.offsetParent;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
  }

  render() {
    const {style, blocks} = this.props;

    return (
      <div
        className="Blockly"
        style={{width: '100%', height: '100%', ...style}}>
        <div
          id={this.areaId}
          ref={(el) => { this.areaEl = el; }}
          style={{width: '100%', height: '100%'}} />
        <div
          id={this.divId}
          ref={(el) => { this.divEl = el; }}
          style={{position: 'absolute'}} />
        <xml
          ref={(el) => { this.toolboxEl = el; }}
          className="BlocklyToolbox"
          style={{display: 'none'}}>
          {blocks.map(block => {
            const {type} = block;
            return <block key={type} type={type}></block>
          })}
        </xml>
      </div>
    );
  }
}

export default BlocklyContainer;