import React, { Component } from 'react';
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
    this.state = {
      defaultXmlText: null,
      xmlText: null
    };
  }

  componentDidMount() {
    // Drop error silently
    fetch('/samples/5.xml')
      .then(response => response.text())
      .then(this.onSampleReceived.bind(this))
  }

  onSampleReceived(defaultXmlText) {
    this.setState({defaultXmlText});
  }

  onLoadClicked() {
    const defaultXmlText = window.prompt('Paste XML');
    this.setState({defaultXmlText});
  }
  onBlockXmlChanged(xmlText) {
    this.setState({xmlText});
  }

  render() {
    const {defaultXmlText, xmlText} = this.state;

    return (
      <div className="App">
        <div className="App-header">
          Drag some blocks to make a new scenario!
        </div>
        <div className="App-blocks">
          <BlocklyContainer
            xmlText={defaultXmlText}
            blocks={blocks}
            tools={tools}
            onBlockXmlChanged={this.onBlockXmlChanged.bind(this)} />
        </div>
        <pre className="App-xml">
          <button className="App-load-xml" onClick={this.onLoadClicked.bind(this)}>Load</button>
          {xmlText}
        </pre>
      </div>
    );
  }
}

export default App;
