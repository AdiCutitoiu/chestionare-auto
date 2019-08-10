import React, { Component } from 'react';
import Chestionar from './src/views/Chestionar';
import questions from './src/questions'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Chestionar question={questions[0]}/>
    );
  }
}
