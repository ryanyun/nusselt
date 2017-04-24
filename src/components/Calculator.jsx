// External Dependencies
import _ from 'lodash';
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
    this.state = {
      flowType: "",
      parameters: {}
    };
  }

  componentDidMount() {
    this.calculatorListener = this.onCalculatorChange.bind(this);
    CalculatorStore.addChangeListener(this.calculatorListener);
  }

  componentWillUnmount() {
    CalculatorStore.removeChangeListener(this.calculatorListener);
  }

  onCalculatorChange() {
    this.state = {
      flowType: "",
      parameters: {}
    };
  }

  isOrientable() {
    let p = this.state.parameters;
    return (p.convection == "free" && (p.geometry == "plate" || p.geometry == "cylinder"));
  }

  updateFlow(v) {
    this.setState({
      flowType: v,
      parameters: {}
    });
  }

  updateParameters(k, v) {
    if (this.isOrientable() && (v == "forced" || v == "sphere")) {
      delete this.state.parameters.orientation;
    };
    var newParameters = _.extend({}, this.state.parameters);
    newParameters[k] = v;
    this.setState({
      flowType: this.state.flowType,
      parameters: newParameters
    });
  }

  renderOrientation() {
    if (this.isOrientable()) {
      return (
        <div>
          <SelectField value={this.state.parameters.orientation} onChange={(e, i, v) => {this.updateParameters('orientation', v)}} floatingLabelText="Orientation">
            <MenuItem value="vertical" primaryText="Vertical"></MenuItem>
            <MenuItem value="horizontal" primaryText="Horizontal"></MenuItem>
          </SelectField>
        </div>
      )
    }
  }

  renderExternalForm() {
    return (
      <div className="calculator-flowForm">
        <SelectField value={this.state.parameters.convection} onChange={(e, i, v) => {this.updateParameters('convection', v)}} floatingLabelText="Convection Type">
          <MenuItem value="free" primaryText="Free"></MenuItem>
          <MenuItem value="forced" primaryText="Forced"></MenuItem>
        </SelectField><br />
        <SelectField value={this.state.parameters.geometry} onChange={(e, i, v) => {this.updateParameters('geometry', v)}} floatingLabelText="Geometry">
          <MenuItem value="plate" primaryText="Plate"></MenuItem>
          <MenuItem value="cylinder" primaryText="Cylinder"></MenuItem>
          <MenuItem value="sphere" primaryText="Sphere"></MenuItem>
        </SelectField><br />
        {this.renderOrientation()}
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
        <Tabs value={this.state.flowType} onChange={(v) => {this.updateFlow(v)}}>
          <Tab label="External Flow" value="external">{this.renderExternalForm()}</Tab>
          <Tab label="Internal Flow" value="internal">{this.renderInternalForm()}</Tab>
        </Tabs>
      </div>
    );
  }
};