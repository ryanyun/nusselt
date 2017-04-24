// External Dependencies
import React from 'react';

export default class Intro extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="intro">
        <h1 className="intro-title">Nusselt Number Calculator</h1>
        <h2 className="intro-subtitle">This is a nusselt number calculator - exciting! Select a flow type below.</h2>
      </div>
    );
  }
};