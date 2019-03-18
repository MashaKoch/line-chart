/// <reference path="../interfaces.d.ts" />

import React from "react";
import ParametrsForm from "./ParametrsForm"
import Chart from "./Chart"

class App extends React.Component<any, IAppState> {
  constructor(props:any) {
    super(props);
        this.state = {
          amountPoint: 20,
          minX: 0,
          maxX: 50,
          minY: 0,
          maxY: 50,
          checkedGrid: true,
          checkedLabelAxis: true,
          reDraw: false
          };
  }

  updateData = (amount:number, valMinX:number, valMaxX:number, valMinY:number, valMaxY:number, chkGrid:boolean, chkLabel:boolean) : void => {
    this.setState({ 
      amountPoint: amount,
      minX: valMinX,
      maxX: valMaxX,
      minY: valMinY,
      maxY: valMaxY,
      reDraw: true
    })
 };

  updateGridAndLabel = (chkGrid:boolean, chkLabel:boolean) : void => {
    this.setState({ 
      checkedGrid: chkGrid,
      checkedLabelAxis: chkLabel,
      reDraw: false
    })
  };

  render() {
    return (
    <div>
      <h1>Визуализация линейной диаграммы на рандомно сгенерированных данных</h1>
      <ParametrsForm updateData={this.updateData} 
                    updateGridAndLabel={this.updateGridAndLabel}
                    {... this.state}
      />
      <Chart {... this.state} />
    </div>
    );
  };
};

export default App;