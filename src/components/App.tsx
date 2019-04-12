/// <reference path="../interfaces.d.ts" />

import React from "react";
import ParametrsForm from "./ParametrsForm"
import Chart from "./Chart"

declare var d3: any;

class App extends React.Component<any, IAppState> {
  constructor(props:any) {
    super(props);
    this.state = {
      amountPoint: 21,
      minY: 5,
      maxY: 75,
      checkedGrid: true,
      checkedLabelAxis: true,
      reDraw: false,
      points: [],
      width: 960,
      height: 500
      };
  };

  // Первоначальная вырисовка графика
  componentDidMount() {
    this.generationPoints(this.state.amountPoint, this.state.minY, this.state.maxY);
  };

  generationPoints = (amount:number, minY:number, maxY:number): void => {
    const min : number = Number(minY);
    const max : number = Number(maxY);

    let data : point[] = d3.range(amount).map(function(i:number) { return {"x": i+1, "y": (Math.random() * (max - min) + min)} })

    this.setState({
      points: data,
      amountPoint: amount,
      minY: min,
      maxY: max,
      reDraw: true
    })
  };

  changeSize = (width:number, height:number) : void => {
    this.setState({ 
      width: width,
      height: height,
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
      <ParametrsForm changeSize={this.changeSize} 
                    generationPoints={this.generationPoints}
                    updateGridAndLabel={this.updateGridAndLabel}
                    {... this.state}
      />
      <Chart {... this.state} />
    </div>
    );
  };
};

export default App;