import React, { Component } from 'react';
import logo from './logo.svg';
import Output from './output';
import Circle from './circle';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
      <Output />
      <Circle />
      </div>
    );
  }
}

export default App;
