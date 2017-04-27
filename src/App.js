import React, { Component } from 'react';
import BlocklyContainer from './BlocklyContainer.js';
import TeacherMomentsBlocks from './TeacherMomentsBlocks.js';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      blocks: '...',
      xmlText: null
    };
  }

  onLoadClicked() {
    const xmlText = window.prompt('Paste XML');
    this.setState({xmlText});
  }
  onChange(blocks) {
    this.setState({blocks});
  }

  render() {
    const {blocks, xmlText} = this.state;

    return (
      <div className="App">
        <div className="App-header">
          Drag some blocks to make a new scenario!
        </div>
        <div className="App-blocks">
          <BlocklyContainer
            xmlText={xmlText}
            blocks={TeacherMomentsBlocks}
            onChange={this.onChange.bind(this)} />
        </div>
        <pre className="App-xml">
          <button className="App-load-xml" onClick={this.onLoadClicked.bind(this)}>Load</button>
          {blocks}
        </pre>
      </div>
    );
  }
}

export default App;
