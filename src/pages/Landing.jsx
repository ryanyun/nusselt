// External Dependencies
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Components
import Navbar from '../components/Navbar.jsx';
import Intro from '../components/Intro.jsx';
import Calculator from '../components/Calculator.jsx';

export default class Landing extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="landing">
          <Navbar />
          <Intro />
          <Calculator />
        </div>
      </MuiThemeProvider>
    );
  }
};
