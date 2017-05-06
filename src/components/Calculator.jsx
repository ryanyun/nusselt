// External Dependencies
import _ from 'lodash';
import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';
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
    return (p.convection == "free" && p.geometry == "plate");
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
    let p = this.state.parameters;
    let q = this.state.quantities;
    if (this.isOrientable() && (v == "forced" || v == "sphere")) { delete p.orientation; };
    if (this.isUniform() && (v == "forced" || v == "sphere" || v == "cylinder")) { delete p.uniform; };
    if (p.convection && k == "convection" && v != p.convection) {
      q = {};
    };
    if (p.geometry && k == "geometry") {  q = {}; };
    var newParameters = _.extend({}, p);
    newParameters[k] = v;
    this.setState({
      flowType: this.state.flowType,
      parameters: newParameters,
      quantities: q
    });
  }

  checkQuantities(k, v) {
    let q = this.state.quantities;
    if (isNaN(v) && isNaN(q[k])) {
      this.updateQuantities(k, "");
    } else if (isNaN(v) && !isNaN(q[k])) {
      this.updateQuantities(k, q[k]);
    } else {
      this.updateQuantities(k, v);
    }
  }

  updateQuantities(k, v) {
    let p = this.state.parameters;
    let q = this.state.quantities;
    var newQuantities = _.extend({}, q);
    newQuantities[k] = v;
    this.setState({
      flowType: this.state.flowType,
      parameters: p,
      quantities: newQuantities
    });
  }

  clearCalculator() {
    this.setState({
      flowType: this.state.flowType,
      parameters: {},
      quantities: {}
    });
  }

  renderClearCalculator() {
    if (this.state.flowType) {
      return (
        <div className="calculator-flowForm-clear">
          <RaisedButton label="Clear All" secondary={true} onClick={this.clearCalculator.bind(this)} />
        </div>
      )
    }
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
          <SelectField fullWidth={true} value={this.state.parameters.uniform} onChange={(e, i, v) => {this.updateParameters('uniform', v)}} floatingLabelText="Uniform Quantity">
            <MenuItem value="temp" primaryText="Constant Temperature"></MenuItem>
            <MenuItem value="flux" primaryText="Constant Heat Flux"></MenuItem>
          </SelectField><br />
        </div>
      )
    }
  }

  renderGeometrySpecificParameters() {
    if (this.state.parameters.geometry == "plate") {
      return (
        <div></div>
      )
    } else if (this.state.parameters.geometry == "cylinder") {
      return (
        <div>
          <TextField fullWidth={true} value={this.state.quantities.d} onChange={(e) => {this.checkQuantities('d', e.target.value)}} floatingLabelText="Diameter" hintText="m" />
          <TextField fullWidth={true} value={this.state.quantities.mu} onChange={(e) => {this.checkQuantities('mu', e.target.value)}} floatingLabelText="Fluid Dynamic Viscosity" hintText="kg/s/m" />
        </div>
      )
    } else if (this.state.parameters.geometry == "sphere") {
      return (
        <div>
          <TextField fullWidth={true} value={this.state.quantities.d} onChange={(e) => {this.checkQuantities('d', e.target.value)}} floatingLabelText="Diameter" hintText="m" />
          <TextField fullWidth={true} value={this.state.quantities.kv} onChange={(e) => {this.checkQuantities('kv', e.target.value)}} floatingLabelText="Fluid Kinematic Viscosity" hintText="m^2/s" />
        </div>
      )
    }
  }

  renderFreeForm() {
    let p = this.state.parameters;
    let q = this.state.quantities;
    if (p.convection == "free" && p.geometry) {
      return (
        <div>
          <TextField fullWidth={true} value={q.d} onChange={(e) => {this.checkQuantities('d', e.target.value)}} floatingLabelText="Diameter" hintText="m" />
          <TextField fullWidth={true} value={q.rho} onChange={(e) => {this.checkQuantities('rho', e.target.value)}} floatingLabelText="Fluid Density" hintText="kg/m^3" />
          <TextField fullWidth={true} value={q.mu} onChange={(e) => {this.checkQuantities('mu', e.target.value)}} floatingLabelText="Fluid Dynamic Viscosity" hintText="kg/s/m" />
          <TextField fullWidth={true} value={q.cp} onChange={(e) => {this.checkQuantities('cp', e.target.value)}} floatingLabelText="Fluid Specific Heat Capacity" hintText="J/kg/K" />
          <TextField fullWidth={true} value={q.k} onChange={(e) => {this.checkQuantities('k', e.target.value)}} floatingLabelText="Fluid Thermal Conductivity" hintText="W/m/K" />
          <TextField fullWidth={true} value={q.beta} onChange={(e) => {this.checkQuantities('beta', e.target.value)}} floatingLabelText="Fluid Coefficient of Thermal Expansion" hintText="1/K" />
          <TextField fullWidth={true} value={q.tinf} onChange={(e) => {this.checkQuantities('tinf', e.target.value)}} floatingLabelText="Ambient Temperature" hintText="K" />
          <TextField fullWidth={true} value={q.ts} onChange={(e) => {this.checkQuantities('ts', e.target.value)}} floatingLabelText="Outer Surface Temperature" hintText="K" />
        </div>
      )
    }
  }

  renderForcedForm() {
    let p = this.state.parameters;
    let q = this.state.quantities;
    if (p.convection == "forced" && p.geometry) {
      return (
        <div>
          {this.renderGeometrySpecificParameters()}
          <TextField fullWidth={true} value={q.rho} onChange={(e) => {this.checkQuantities('rho', e.target.value)}} floatingLabelText="Fluid Density" hintText="kg/m^3" />
          <TextField fullWidth={true} value={q.v} onChange={(e) => {this.checkQuantities('v', e.target.value)}} floatingLabelText="Fluid Velocity" hintText="m/s" />
          <TextField fullWidth={true} value={q.cp} onChange={(e) => {this.checkQuantities('cp', e.target.value)}} floatingLabelText="Fluid Specific Heat Capacity" hintText="J/kg/K" />
          <TextField fullWidth={true} value={q.k} onChange={(e) => {this.checkQuantities('k', e.target.value)}} floatingLabelText="Fluid Thermal Conductivity" hintText="W/m/K" />
        </div>
      )
    }
  }

  renderExternalFreeResults() {
    let p = this.state.parameters;
    let q = this.state.quantities;
    if (this.state.parameters.convection == "free" && q.rho && q.k && q.cp && q.d && q.beta && q.tinf && q.ts && q.mu) {
      let frho = parseFloat(q.rho);
      let fk = parseFloat(q.k);
      let fcp = parseFloat(q.cp);
      let fd = parseFloat(q.d);
      let fv = parseFloat(q.v);
      let fbeta = parseFloat(q.beta);
      let ftinf = parseFloat(q.tinf);
      let fts = parseFloat(q.ts);
      let fmu = parseFloat(q.mu);
      let Ra; let Pr; let N; let C; let Nu; let h;
      const $g = 9.81;
      switch (p.geometry) {
        case "cylinder":
          Pr = fcp * fmu / fk;
          Ra = $g * fbeta * Math.pow(fd, 3) * Pr * (fts - ftinf) / Math.pow(fmu / frho, 2);
          if (Ra >= -10000000000 && Ra < -100) {
            C = 0.675; N = 0.058;
          } else if (Ra >= -100 && Ra < 100) {
            C = 1.02; N = 0.148;
          } else if (Ra >= 100 && Ra < 10000) {
            C = 0.85; N = 0.188;
          } else if (Ra >= 10000 && Ra < 10000000) {
            C = 0.48; N = 0.25;
          } else if (Ra >= 10000000 && Ra < 1000000000000) {
            C = 0.125; N = 0.333;
          } else {
            return (<p className="error">Error: Please try again with different values.</p>)
          }
          Nu = C * Math.pow(Ra, N);
          break;
        case "sphere":
          Pr = fcp * fmu / fk;
          Ra = $g * fbeta * Math.pow(fd, 3) * Pr * (fts - ftinf) / Math.pow(fmu / frho, 2);
          Nu = 2 + (0.589 * Math.pow(Ra, 0.25)) / Math.pow(1 + Math.pow(0.469/Pr , 9/16), 4/9)
          break;
      }
      h = Nu * fk / fd;
      return (
        <Paper className="results">
          <p>Rayleigh Number: <span className="result">{Ra.toFixed(2)}</span></p>
          <p>Prandtl Number: <span className="result">{Pr.toFixed(2)}</span></p>
          <p>Nusselt Number: <span className="result">{Nu.toFixed(2)}</span></p>
          <p>Convection Coefficient: <span className="result">{h.toFixed(2)}</span> <span className="resultUnit">W/m<sup>2</sup>/K</span></p>
        </Paper>
      )
    }
  }

  renderExternalForcedResults() {
    let q = this.state.quantities;
    if (this.state.parameters.convection == "forced" && q.rho && q.k && q.cp && q.d && q.v && (q.mu || q.kv)) {
      let frho = parseFloat(q.rho);
      let fk = parseFloat(q.k);
      let fcp = parseFloat(q.cp);
      let fd = parseFloat(q.d);
      let fv = parseFloat(q.v);
      let Re; let Pr; let n; let C; let Nu; let h; let fmu; let fkv;
      if (q.mu) { // if geometry is cylinder
        fmu = parseFloat(q.mu);
        Re = frho * fv * fd / fmu;
        Pr = fcp * fmu / fk;
        if (Re >= 0.4 && Re < 4) {
          C = 0.989; n = 0.330;
        } else if (Re >= 4 && Re < 35) {
          C = 0.911; n = 0.385;
        } else if (Re >= 35 && Re < 4083) {
          C = 0.683; n = 0.466;
        } else if (Re >= 4083 && Re < 40045) {
          C = 0.193; n = 0.618;
        } else if (Re >= 40045 && Re < 400000) {
          C = 0.0266; n = 0.805;
        } else {
          return (<p className="error">Error: Please try again with different values.</p>)
        }
        Nu = C * Math.pow(Re, n) * Math.pow(Pr, 1/3);
      } else if (q.kv) { // if geometry is sphere
        fkv = parseFloat(q.kv);
        Re = fv * fd / fkv;
        Pr = fcp * frho / (fk * fkv);
        Nu = 2 + (0.4 * Math.pow(Re, 0.5) + 0.06 * Math.pow(Re, 2/3)) * Math.pow(Pr, 0.4);
      }
      h = Nu * fk / fd;
      return (
        <Paper className="results">
          <p>Reynolds Number: <span className="result">{Re.toFixed(2)}</span></p>
          <p>Prandtl Number: <span className="result">{Pr.toFixed(2)}</span></p>
          <p>Nusselt Number: <span className="result">{Nu.toFixed(2)}</span></p>
          <p>Convection Coefficient: <span className="result">{h.toFixed(2)}</span> <span className="resultUnit">W/m<sup>2</sup>/K</span></p>
        </Paper>
      )
    }
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
      } else if (Re <= 3000 && Re > 0) {
        return (<p className="error">Your Reynolds Number is {Re.toFixed(2)} &lt; 3000. Please select a uniform quantity below.</p>)
      } else {
        return (<p className="error">Error: Please try again with different values.</p>)
      }
      h = Nu * fk / fd;
      return (
        <Paper className="results">
          <p>Reynolds Number: <span className="result">{Re.toFixed(2)}</span></p>
          <p>Prandtl Number: <span className="result">{Pr.toFixed(2)}</span></p>
          <p>Friction Factor: <span className="result">{ff.toFixed(2)}</span></p>
          <p>Nusselt Number: <span className="result">{Nu.toFixed(2)}</span></p>
          <p>Convection Coefficient: <span className="result">{h.toFixed(2)}</span> <span className="resultUnit">W/m<sup>2</sup>/K</span></p>
        </Paper>
      )
    }
  }

  renderExternalForm() {
    return (
      <div className="calculator-flowForm">
        {this.renderExternalFreeResults()}
        {this.renderExternalForcedResults()}
        <SelectField fullWidth={true} value={this.state.parameters.convection} onChange={(e, i, v) => {this.updateParameters('convection', v)}} floatingLabelText="Convection Type">
          <MenuItem value="free" primaryText="Free"></MenuItem>
          <MenuItem value="forced" primaryText="Forced"></MenuItem>
        </SelectField><br />
        <SelectField fullWidth={true} value={this.state.parameters.geometry} onChange={(e, i, v) => {this.updateParameters('geometry', v)}} floatingLabelText="Geometry">
          <MenuItem value="cylinder" primaryText="Cylinder"></MenuItem>
          <MenuItem value="sphere" primaryText="Sphere"></MenuItem>
        </SelectField><br />
        {this.renderOrientation()}
        {this.renderUniform()}
        {this.renderFreeForm()}
        {this.renderForcedForm()}
        {this.renderClearCalculator()}
      </div>
    )
  }

  renderInternalForm() {
    return (
      <div className="calculator-flowForm">
        {this.renderInternalResults()}
        <TextField fullWidth={true} value={this.state.quantities.d} onChange={(e) => {this.checkQuantities('d', e.target.value)}} floatingLabelText="Cylinder Diameter" hintText="m" />
        <TextField fullWidth={true} value={this.state.quantities.rho} onChange={(e) => {this.checkQuantities('rho', e.target.value)}} floatingLabelText="Fluid Density" hintText="kg/m^3" />
        <TextField fullWidth={true} value={this.state.quantities.v} onChange={(e) => {this.checkQuantities('v', e.target.value)}} floatingLabelText="Fluid Velocity" hintText="m/s" />
        <TextField fullWidth={true} value={this.state.quantities.mu} onChange={(e) => {this.checkQuantities('mu', e.target.value)}} floatingLabelText="Fluid Dynamic Viscosity" hintText="kg/s/m" />
        <TextField fullWidth={true} value={this.state.quantities.cp} onChange={(e) => {this.checkQuantities('cp', e.target.value)}} floatingLabelText="Fluid Specific Heat Capacity" hintText="J/kg/K" />
        <TextField fullWidth={true} value={this.state.quantities.k} onChange={(e) => {this.checkQuantities('k', e.target.value)}} floatingLabelText="Fluid Thermal Conductivity" hintText="W/m/K" />
        {this.renderLaminarUniformField()}
        {this.renderClearCalculator()}
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