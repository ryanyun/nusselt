// External Dependencies
import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

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

  render() {
    return (
      <div className="calculator">
        <p>Start by selecting a flow type</p>
        <Tabs>
          <Tab label="External">
            <div>
              <p>Here is external flow</p>
            </div>
          </Tab>
          <Tab label="Internal">
            <div>
              <p>Here is internal flow</p>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
};