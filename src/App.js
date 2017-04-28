import React, { Component } from 'react';
import Clipboard from 'clipboard';
import BlocklyContainer from './BlocklyContainer.js';
import {blocks, tools} from './TeacherMomentsBlocks.js';
import './App.css';
import 'whatwg-fetch';


class App extends Component {
  // TODO(kr) clarify data for XML in BlocksContainer,
  // change to imperative method to make explicit it's
  // uncontrolled but XML can be set from the output.
  constructor() {
    super();
    this.clipboard = null;
    this.copyEl = null;
    this.blockly = null;
    this.state = {
      xmlText: null
    };
  }

  componentDidMount() {
    // Bind clipboard listener to copy text in state
    this.clipboard = new Clipboard(this.copyEl, {
      text: this.onCopyToClipboardText.bind(this)
    });

    // Drop error silently
    fetch('/samples/5.xml')
      .then(response => response.text())
      .then(this.loadXmlText.bind(this))
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  loadXmlText(xmlText) {
    this.blockly.loadBlocksFromXmlText(xmlText, {
      clearExistingBlocks: true
    });
  }

  onCopyToClipboardText(trigger) { 
    const {xmlText} = this.state;
    return xmlText;
  }

  onLoadClicked() {
    const xmlText = window.prompt('Paste XML');
    this.loadXmlText(xmlText);
  }

  onBlockXmlChanged(xmlText) {
    this.setState({xmlText});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="App-header-text">Drag some blocks to make a new scenario!</div>
          <button className="App-header-button" ref={(el) => this.copyEl = el} >Copy XML to clipboard</button>
          <button className="App-header-button" onClick={this.onLoadClicked.bind(this)}>Load XML</button>
        </div>
        <div className="App-blocks">
          <BlocklyContainer
            ref={(blockly) => { this.blockly = blockly; }}
            blocks={blocks}
            tools={tools}
            onBlockXmlChanged={this.onBlockXmlChanged.bind(this)} />
        </div>
      </div>
    );
  }
}

export default App;
