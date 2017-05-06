// External Dependencies
import _ from 'lodash';
import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import SelectField from 'material-ui/lib/SelectField';
import TextField from 'material-ui/lib/text-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      flowType: "",
      parameters: {},
      quantities: {}
    };
  }

  isOrientable() {
    let p = this.state.parameters;
    return (p.convection == "free" && (p.geometry == "plate" || p.geometry == "cylinder"));
  }

  isUniform() {
    let p = this.state.parameters;
    return (p.convection == "free" && p.geometry == "plate");
  }

  updateFlow(v) {
    if (v == "external" || v == "internal") {
      this.setState({
        flowType: v,
        parameters: {},
        quantities: {}
      });
    };
  }

  updateParameters(k, v) {
    if (this.isOrientable() && (v == "forced" || v == "sphere")) {
      delete this.state.parameters.orientation;
    };
    if (this.isUniform() && (v == "forced" || v == "sphere" || v == "cylinder")) {
      delete this.state.parameters.uniform;
    };
    var newParameters = _.extend({}, this.state.parameters);
    newParameters[k] = v;
    this.setState({
      flowType: this.state.flowType,
      parameters: newParameters,
      quantities: this.state.quantities
    });
  }

  updateQuantities(k, v) {
    var newQuantities = _.extend({}, this.state.quantities);
    newQuantities[k] = v;
    this.setState({
      flowType: this.state.flowType,
      parameters: this.state.parameters,
      quantities: newQuantities
    });
  }

  renderOrientation() {
    if (this.isOrientable()) {
      return (
        <div>
          <SelectField fullWidth={true} value={this.state.parameters.orientation} onChange={(e, i, v) => {this.updateParameters('orientation', v)}} floatingLabelText="Orientation">
            <MenuItem value="vertical" primaryText="Vertical"></MenuItem>
            <MenuItem value="horizontal" primaryText="Horizontal"></MenuItem>
          </SelectField><br />
        </div>
      )
    }
  }

  renderUniform() {
    if (this.isUniform()) {
      return (
        <div>
          <SelectField fullWidth={true} value={this.state.parameters.uniform} onChange={(e, i, v) => {this.updateParameters('uniform', v)}} floatingLabelText="Free Plate Uniform Quantity">
            <MenuItem value="temp" primaryText="Constant Temperature"></MenuItem>
            <MenuItem value="flux" primaryText="Constant Heat Flux"></MenuItem>
          </SelectField><br />
        </div>
      )
    }
  }

  renderFreeForm() {
    return (
      <div>
        <TextField fullWidth={true} hintText="Hint Text" floatingLabelText="Floating Label Text" />
      </div>
    )
  }

  renderForcedForm() {
    return (
      <div>
        <TextField fullWidth={true} hintText="Hint Text" floatingLabelText="Floating Label Text" />
      </div>
    )
  }
  
  renderLaminarUniformField() {
    let q = this.state.quantities;
    if (q.rho && q.v && q.d && q.mu && ((q.rho * q.v * q.d / q.mu) < 3000)) {
      
      return (
        <div>
          <SelectField fullWidth={true} value={this.state.parameters.uniform} onChange={(e, i, v) => {this.updateParameters('uniform', v)}} floatingLabelText="Uniform Quantity">
            <MenuItem value="temp" primaryText="Constant Temperature"></MenuItem>
            <MenuItem value="flux" primaryText="Constant Heat Flux"></MenuItem>
          </SelectField>
        </div>
      )
    }
  }

  renderInternalResults() {
    let q = this.state.quantities;
    if (q.mu && q.rho && q.k && q.cp && q.d && q.v) {
      let fmu = parseFloat(q.mu);
      let frho = parseFloat(q.rho);
      let fk = parseFloat(q.k);
      let fcp = parseFloat(q.cp);
      let fd = parseFloat(q.d);
      let fv = parseFloat(q.v);
      let Re = frho * fv * fd / fmu;
      let Pr = fcp * fmu / fk;
      let ff; let Nu; let h;
      if (Re <= 3000 && Re > 0 && this.state.parameters.uniform) { // if laminar
        ff = 64 / Re;
        switch (this.state.parameters.uniform) {
          case "flux": // if uniform heat flux
            Nu = 4.36;
            break;
          case "temp": // if uniform surface temp
            Nu = 3.66;
            break;
        }
      } else if (Re > 3000 && Re <= 5000000) { // if turbulent
        if (Re < 20000) {
          ff = 0.316 * Math.pow(Re, -0.25);
        } else {
          ff = 0.184 * Math.pow(Re, -0.2);
        }
        Nu = ((ff/8)*(Re-1000)*Pr)/(1+12.7*(Math.pow(ff/8,0.25))*((Math.pow(Pr,2/3))-1));
      } else {
        return (<p className="error">Your Reynolds Number is {Re} &lt; 3000. Please select uniform quantity below.</p>)
      }
      h = Nu * fk / fd;
      return (
        <div className="results">
          <p>Reynolds Number: <span className="result">{Re.toFixed(2)}</span></p>
          <p>Prandtl Number: <span className="result">{Pr.toFixed(2)}</span></p>
          <p>Friction Factor: <span className="result">{ff.toFixed(2)}</span></p>
          <p>Nusselt Number: <span className="result">{Nu.toFixed(2)}</span></p>
          <p>Convection Coefficient: <span className="result">{h.toFixed(2)}</span></p>
        </div>
      )
    }
  }

  renderExternalForm() {
    return (
      <div className="calculator-flowForm">
        <SelectField fullWidth={true} value={this.state.parameters.convection} onChange={(e, i, v) => {this.updateParameters('convection', v)}} floatingLabelText="Convection Type">
          <MenuItem value="free" primaryText="Free"></MenuItem>
          <MenuItem value="forced" primaryText="Forced"></MenuItem>
        </SelectField><br />
        <SelectField fullWidth={true} value={this.state.parameters.geometry} onChange={(e, i, v) => {this.updateParameters('geometry', v)}} floatingLabelText="Geometry">
          <MenuItem value="plate" primaryText="Plate"></MenuItem>
          <MenuItem value="cylinder" primaryText="Cylinder"></MenuItem>
          <MenuItem value="sphere" primaryText="Sphere"></MenuItem>
        </SelectField><br />
        {this.renderOrientation()}
        {this.renderUniform()}
        {this.renderFreeForm()}
        {this.renderForcedForm()}
      </div>
    )
  }

  renderInternalForm() {
    return (
      <div className="calculator-flowForm">
        {this.renderInternalResults()}
        <TextField fullWidth={true} value={this.state.quantities.rho} onChange={(e) => {this.updateQuantities('rho', e.target.value)}} floatingLabelText="Density" hintText="kg/m^3" />
        <TextField fullWidth={true} value={this.state.quantities.v} onChange={(e) => {this.updateQuantities('v', e.target.value)}} floatingLabelText="Fluid Velocity" hintText="m/s" />
        <TextField fullWidth={true} value={this.state.quantities.d} onChange={(e) => {this.updateQuantities('d', e.target.value)}} floatingLabelText="Diameter" hintText="m" />
        <TextField fullWidth={true} value={this.state.quantities.mu} onChange={(e) => {this.updateQuantities('mu', e.target.value)}} floatingLabelText="Dynamic Viscosity" hintText="kg/s/m" />
        <TextField fullWidth={true} value={this.state.quantities.cp} onChange={(e) => {this.updateQuantities('cp', e.target.value)}} floatingLabelText="Specific Heat Capacity" hintText="J/kg/K" />
        <TextField fullWidth={true} value={this.state.quantities.k} onChange={(e) => {this.updateQuantities('k', e.target.value)}} floatingLabelText="Thermal Conductivity" hintText="W/m/K" />
        {this.renderLaminarUniformField()}
      </div>
    )
  }

  render() {
    return (
      <div className="calculator">
        <Tabs value={this.state.flowType} onChange={(v) => {this.updateFlow(v)}} inkBarStyle={{backgroundColor: "#343d46"}}>
          <Tab label="External Flow" value="external">{this.renderExternalForm()}</Tab>
          <Tab label="Internal Flow" value="internal">{this.renderInternalForm()}</Tab>
        </Tabs>
      </div>
    );
  }
};