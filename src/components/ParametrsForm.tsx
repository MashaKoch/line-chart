/// <reference path="../interfaces.d.ts" />

import React from "react";
import InputParamField from "./InputParamField"
import CheckboxField from "./CheckboxField"

class ParametrsForm extends React.Component<IParametrsFormProps, IParametrsFormState> {
  constructor(props:IParametrsFormProps) {
    super(props);    
    this.state = {
        amountPoint: this.props.amountPoint,
        minX: this.props.minX,
        maxX: this.props.maxX,
        minY: this.props.minY,
        maxY: this.props.maxY,
        checkedGrid: this.props.checkedGrid,
        checkedLabelAxis: this.props.checkedLabelAxis
    }
  }

  onAmountPointChange = (event: any) : void => {
    this.setState({
      amountPoint: event.target.value
    })
  };

  onMinXChange = (event: any) : void => {
    this.setState({
      minX: event.target.value
    })
  };

  onMaxXChange = (event: any) : void => {
    this.setState({
      maxX: event.target.value
    })
  };

  onMinYChange = (event: any) : void => {
    this.setState({
      minY: event.target.value
    })
  };

  onMaxYChange = (event: any) : void => {
    this.setState({
      maxY: event.target.value
    })
  };

   onGridChange = () : void => {
    this.props.updateGridAndLabel(!this.state.checkedGrid,this.state.checkedLabelAxis);
    this.setState({
      checkedGrid: !this.state.checkedGrid
    });
  }

  onLabelChange = () : void => {
    this.props.updateGridAndLabel(this.state.checkedGrid,!this.state.checkedLabelAxis);
    this.setState({
      checkedLabelAxis: !this.state.checkedLabelAxis
    });
  }

  render() {
    return (
      <div id="controlPanel">
        <p>
          <InputParamField label="Количество точек: "
                            id="countPoints"
                            value={this.state.amountPoint}
                            onChange={this.onAmountPointChange} 
          />
        </p>
        <p>
          <InputParamField label="Диапазон начений по оси X: от "
                          id="minX"
                          value={this.state.minX}
                          onChange={this.onMinXChange} />
          <InputParamField label=" до "
                          id="maxX"
                          value={this.state.maxX}
                          onChange={this.onMaxXChange} />
        </p>
        <p>
          <InputParamField label="Диапазон начений по оси Y: от "
                          id="minY"
                          value={this.state.minY}
                          onChange={this.onMinYChange} />
          <InputParamField label=" до "
                          id="maxY"
                          value={this.state.maxY}
                          onChange={this.onMaxYChange} />
        </p>
        <p>
          <CheckboxField label="Сетка" 
                          idCbx="grid" 
                          checked={this.state.checkedGrid} 
                          onChange={this.onGridChange} />
          <CheckboxField label="Метки" 
                          idCbx="tags" 
                          checked={this.state.checkedLabelAxis} 
                          onChange={this.onLabelChange} />
        </p>
        <p>
          <input type="button" value="Перестроить график" onClick={() => { 
            this.props.updateData(this.state.amountPoint, 
                                  this.state.minX, 
                                  this.state.maxX, 
                                  this.state.minY, 
                                  this.state.maxY, 
                                  this.state.checkedGrid,
                                  this.state.checkedLabelAxis)}} />
        </p>
      </div>
    );
  };
};

export default ParametrsForm;