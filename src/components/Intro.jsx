// External Dependencies
import React, {Component} from 'react';

export default class Intro extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="intro">
        <h1 className="intro-title">Nusselt Number Calculator</h1>
        <h2 className="intro-subtitle">A nusselt number is equal to the dimensionless temperature gradient at a surface.<br />It provides a measure of the convection heat transfer occuring at a surface.<br /><br />To begin, select a flow type below.</h2>
      </div>
    );
  }
};