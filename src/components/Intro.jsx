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
        <h1 className="intro-title">Nusselt Number Calculator</h1>
        <h2 className="intro-subtitle">This is a nusselt number calculator - exciting!</h2>
      </div>
    );
  }
};