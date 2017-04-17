// External Dependencies
import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

export default class Intro extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="intro">
        <p className="intro-title">Nusselt Number Calculator</p>
        <p className="intro-subtitle">insert intro text here</p>
      </div>
    );
  }
};