// External Dependencies
import React from 'react';

// Components
import Navbar from '../components/Navbar.jsx';
import Intro from '../components/Intro.jsx';
import Calculator from '../components/Calculator.jsx';

export default class Landing extends React.Component {
  render() {
    return (
      <div className="landing">
        <Navbar />
        <Intro />
        <Calculator />
        <footer className="footer">
          &copy; 2017 Robert Faddoul, Cristian Lacey, <a className="subtleLink" href="http://ryanyun.nyc" target="_blank">Ryan Yun</a> &middot; Developed for <a className="subtleLink" href="http://cooper.edu/engineering/people/george-w-sidebotham" target="_blank">Professor George Sidebotham</a> at <a className="subtleLink" href="http://cooper.edu" target="_blank">The Cooper Union</a>
        </footer>
      </div>
    );
  }
};
