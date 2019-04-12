/// <reference path="../interfaces.d.ts" />

import React from "react";
import InputParamField from "./InputParamField"
import CheckboxField from "./CheckboxField"

class ParametrsForm extends React.Component<IParametrsFormProps, IParametrsFormState> {
  constructor(props:IParametrsFormProps) {
    super(props);    
    this.state = {
        amountPoint: this.props.amountPoint,
        minY: this.props.minY,
        maxY: this.props.maxY,
        checkedGrid: this.props.checkedGrid,
        checkedLabelAxis: this.props.checkedLabelAxis,
        width: this.props.width,
        height: this.props.height
    }
  }

  onAmountPointChange = (event: any) : void => {
    this.setState({
      amountPoint: event.target.value
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

  onWidthChange = (event: any) : void => {
    this.setState({
      width: event.target.value
    })
  }

  onHeightChange = (event: any) : void => {
    this.setState({
      height: event.target.value
    })
  }

  render() {
    return (
      <div id="controlPanel">
        <div className="area">
          <p>
            <InputParamField label="Количество точек: "
                              id="countPoints"
                              value={this.state.amountPoint}
                              onChange={this.onAmountPointChange} 
            />
          </p>
          <p>
            <InputParamField label="Диапазон значений по оси Y: от "
                            id="minY"
                            value={this.state.minY}
                            onChange={this.onMinYChange} />
            <InputParamField label=" до "
                            id="maxY"
                            value={this.state.maxY}
                            onChange={this.onMaxYChange} />
          </p>
          <p>
            <input type="button" value="Сгенерировать новые точки и перестроить график" onClick={() => { 
              this.props.generationPoints(this.state.amountPoint, 
                                    this.state.minY, 
                                    this.state.maxY)}} />
          </p>
        </div>
        <div className="area">
          <p>
            Размеры области отображения данных:
          </p>
          <p>
            <InputParamField label="Ширина"
                            id="width"
                            value={this.state.width}
                            onChange={this.onWidthChange} 
                            />
            <InputParamField label="Высота"
                            id="height"
                            value={this.state.height}
                            onChange={this.onHeightChange} 
                            />
          </p>
          <p>
            <input type="button" value="Изменить размер области отображения" onClick={() => { 
              this.props.changeSize(this.state.width,
                                    this.state.height,
                                    )}} />
          </p>
        </div> 
        <div className="area">
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
        </div> 
        <div className="area">
          <p>
            * Зуммирование графика доступно по колёсику или по двойному клику на точках
          </p>
        </div>
      </div>
    );
  };
};

export default ParametrsForm;