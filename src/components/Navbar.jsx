// External Dependencies
import React from 'react';
import AppBar from 'material-ui/lib/app-bar';

export default class Navbar extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <AppBar className="navbar" style={{boxShadow: 'none', position: 'fixed'}}/>
    );
  }
};