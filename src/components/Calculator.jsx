// External Dependencies
import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import SelectField from 'material-ui/lib/SelectField';
import MenuItem from 'material-ui/lib/menus/menu-item';

// Actions
import CalculatorActions from '../actions/CalculatorActions.js';

// Stores
import CalculatorStore from '../stores/CalculatorStore.js';

export default class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.calculatorListener = this.onCalculatorChange.bind(this);
    CalculatorStore.addChangeListener(this.calculatorListener);
  }

  componentWillUnmount() {
    CalculatorStore.removeChangeListener(this.calculatorListener);
  }

  onCalculatorChange() {
    this.setState({});
  }

  renderExternalForm() {
    return (
      <div className="calculator-flowForm">
        <SelectField floatingLabelText="Convection Type">
          <MenuItem value="free" primaryText="Free"></MenuItem>
          <MenuItem value="forced" primaryText="Forced"></MenuItem>
        </SelectField><br />
        <SelectField floatingLabelText="Geometry">
          <MenuItem value="plate" primaryText="Plate"></MenuItem>
          <MenuItem value="cylinder" primaryText="Cylinder"></MenuItem>
          <MenuItem value="sphere" primaryText="Sphere"></MenuItem>
        </SelectField>
      </div>
    )
  }
  
  renderInternalForm() {
    return (
      <div className="calculator-flowForm">
      </div>
    )
  }

  render() {
    return (
      <div className="calculator">
        <Tabs>
          <Tab label="External Flow">{this.renderExternalForm()}</Tab>
          <Tab label="Internal Flow">{this.renderInternalForm()}</Tab>
        </Tabs>
      </div>
    );
  }
};