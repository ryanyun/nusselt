// External Dependencies
import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import AppBar from 'material-ui/lib/app-bar';

export default class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      leftNavOpen: false
    };
  }

  toggleLeftNav() {
    this.setState({
      leftNavOpen: !this.state.leftNavOpen
    });
  }

  render() {
    return (
      <div>
        <LeftNav className="leftNav" width={300} openRight={true} open={this.state.leftNavOpen}>
          <p>This project is open sourced under the MIT License. Feel free to contribute on Github! This project was built using <a href="https://github.com/callemall/material-ui" target="_blank">Material-UI</a> React Components.</p>
          <a className="menuItemLink" href="https://github.com/ryanyun/nusselt" target="_blank"><MenuItem primaryText="Source Code"></MenuItem></a>
          <a className="menuItemLink" href="https://github.com/ryanyun/nusselt/master/LICENSE" target="_blank"><MenuItem primaryText="License"></MenuItem></a>
          <a className="menuItemLink" href="http://ryanyun.nyc" target="_blank"><MenuItem primaryText="Developed by Ryan Yun"></MenuItem></a>
        </LeftNav>
        <AppBar className="navbar" style={{boxShadow: 'none', position: 'fixed'}} onLeftIconButtonTouchTap={this.toggleLeftNav.bind(this)} />
      </div>
    );
  }
};