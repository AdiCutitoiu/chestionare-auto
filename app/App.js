import React, { Component } from 'react';
import Chestionar from './src/views/Chestionar';
import questions from './src/questions'

export default class App extends Component {
  render() {
    return (
      <Chestionar questions={questions}/>
    );
  }
}
