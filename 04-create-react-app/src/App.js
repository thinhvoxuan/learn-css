import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import '../node_modules/grommet/scss/vanilla/index.scss';
import Button from 'grommet/components/Button';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <Button primary label="Buton" onClick={() => { console.log('aaaa') }} />
        </p>
      </div>
    );
  }
}

export default App;
