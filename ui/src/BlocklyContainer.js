import React, { Component } from 'react';
import Blockly from 'node-blockly/browser';



class BlocklyContainer extends Component {
  propTypes: {
    blocks: React.PropTypes.array.isRequired,
    tools: React.PropTypes.array.isRequired,
    onBlockXmlChanged: React.PropTypes.func,
    config: React.PropTypes.object,
    style: React.PropTypes.object
  }

  constructor() {
    super();
    this.workspace = null;
    this.toolboxEl = null;
    this.areaId = 'areaId';
    this.divId = 'divId';
    this.xmlText = '';
  }

  componentDidMount() {
    this.registerBlocks();
    this.injectBlockly();
    this.listenForResizing();
    this.workspace.addChangeListener(this.onBlocklyEvent.bind(this));
  }

  componentWillUnmount() {
    // TODO(kr)
    // remove window listener
    // stop listenening to blockly events
    // tear down Blockly
  }

  // Public method to allow XML to be pushed in.
  loadBlocksFromXmlText(xmlText, options) {
    if (options && options.clearExistingBlocks) {
      Blockly.mainWorkspace.clear();
    }
    const xml = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.domToWorkspace(xml, this.workspace);
    this.xmlText = xmlText;
  }

  registerBlocks() {
    const {blocks} = this.props;
    blocks.forEach((block) => {
      if (Blockly.Blocks[block.type]) return;
      Blockly.Blocks[block.type] = {
        init() {
          this.jsonInit(block);
        }
      };
    }, this);
  }

  injectBlockly() {
    const {config} = this.props;
    this.workspace = Blockly.inject(this.divEl, {
      toolbox: this.toolboxEl,
      ...config
    });
  }

  listenForResizing() {
    window.addEventListener('resize', this.onResize.bind(this), false);
    this.onResize();
    Blockly.svgResize(this.workspace);
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

  onBlocklyEvent(e) {
    const xml = Blockly.Xml.workspaceToDom(this.workspace);
    this.xmlText = Blockly.Xml.domToText(xml);

    if (!this.props.onBlockXmlChanged) return;
    this.props.onBlockXmlChanged(this.xmlText);
  }

  render() {
    const {style, tools} = this.props;

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
          style={{display: 'none'}}>{tools}</xml>
      </div>
    );
  }
}

BlocklyContainer.defaultProps = {
  config: {
    grid: {
      colour: '#ccc',
      spacing: 20,
      length: 3
    },
    zoom: {
      controls: true,
      wheel: true
    },
    trashcan: true
  }
};

export default BlocklyContainer;