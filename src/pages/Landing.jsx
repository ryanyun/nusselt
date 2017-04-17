// External Dependencies
import React from 'react';

// Components
import Navbar from '../components/Navbar.jsx';
import Intro from '../components/Intro.jsx';
import Calculator from '../components/Calculator.jsx';

export default class Landing extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Intro />
        <Calculator />
      </div>
    );
  }
};
