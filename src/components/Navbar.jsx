// External Dependencies
import React from 'react';
import Divider from 'material-ui/lib/divider';
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
          <MenuItem 
onTouchTap={this.toggleLeftNav.bind(this)} primaryText="CLOSE" style={{textAlign: "right", color: "rgb(0, 188, 212)", fontSize: "12px"}}></MenuItem>
          <p>This nusselt number calculator was developed by <a href="http://ryanyun.nyc" target="_blank">Ryan Yun</a> for Professor <a href="http://cooper.edu/engineering/people/george-w-sidebotham" target="_blank">George Sidebotham</a> at <a href="http://cooper.edu" target="_blank">The Cooper Union</a>.</p>
          <p>This project is open sourced under the MIT License. Feel free to contribute on Github! This project was built using <a href="https://github.com/callemall/material-ui" target="_blank">Material-UI</a> <a href="https://facebook.github.io/react/" target="_blank">React</a> Components.</p>
          <Divider />
          <a href="https://github.com/ryanyun/nusselt" target="_blank"><MenuItem primaryText="Source Code"></MenuItem></a>
          <Divider />
          <a href="https://github.com/ryanyun/nusselt/blob/master/LICENSE" target="_blank"><MenuItem primaryText="License"></MenuItem></a>
          <Divider />
          <a href="http://ryanyun.nyc" target="_blank"><MenuItem primaryText="&copy; 2017 Ryan Yun"></MenuItem></a>
          <Divider />
        </LeftNav>
        <AppBar className="navbar" style={{boxShadow: 'none', position: 'fixed'}} onLeftIconButtonTouchTap={this.toggleLeftNav.bind(this)} />
      </div>
    );
  }
};