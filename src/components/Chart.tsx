/// <reference path="../interfaces.d.ts" />

import React from "react";

declare var d3: any;

class Chart extends React.Component <IAppState> {
  constructor(props:IAppState) {
    super(props);
  }

  // Первоначальная вырисовка графика
  componentDidMount() {
    this.drawChart();
  };

  // Перерисовка графика после обновления компонента по условию либо отображение меток и сетки
  componentDidUpdate() {
    if (this.props.reDraw) {
      this.drawChart();
    } 

    if (this.props.checkedGrid) {
      d3.selectAll(".grid .tick line").attr("display", "block");
    } else {
      d3.selectAll(".grid .tick line").attr("display", "none");
    }
    if (this.props.checkedLabelAxis) {
      d3.selectAll(".axis text").attr("display", "block");
    } else {
      d3.selectAll(".axis text").attr("display", "none");
    }
  };
  
  render() {
    return (
            <svg id="svg">
            </svg>
    );
  }


  drawChart = () => {   
    const amountPoint : number = Number(this.props.amountPoint);
    const minX : number = Number(this.props.minX);
    const maxX : number = Number(this.props.maxX);
    const minY : number = Number(this.props.minY);
    const maxY : number = Number(this.props.maxY);

    function getRandomArbitrary(min:number, max:number) : number {
      return (Math.random() * (max - min) + min);
    }

    let x: number[] = [];
    let y: number[] = []; 
    
    for(let i=0; i<amountPoint; i++) {
        x.push(getRandomArbitrary(minX,maxX));
        y.push(getRandomArbitrary(minY,maxY))
    }    

    x.sort(d3.ascending);
    
    let data : {x: number[], y: number[]}[] = [{x: x, y: y}];

    d3.selectAll("svg > *").remove();

    d3.select("svg")
        .datum(data)
        .call(d3_xy_chart());

    function d3_xy_chart() : any {
      let width : number = 960,  
          height : number = 500, 
          xlabel : string = "X Axis",
          ylabel : string = "Y Axis" ;
      
      function chart(selection:any) : void {
        selection.each(function(datasets: any) {
          let margin : {top: number; right: number; bottom: number; left: number} = 
                        {top: 20, right: 80, bottom: 30, left: 50}, 
              innerwidth: number = width - margin.left - margin.right,
              innerheight: number = height - margin.top - margin.bottom ;
          
          let x_scale: any = d3.scale.linear()
              .range([0, innerwidth])
              .domain([minX, maxX]);

          let y_scale: any = d3.scale.linear()
              .range([innerheight, 0])
              .domain([minY, maxY]);
                      
          let color_scale : string= "#1f77b4";

          let x_axis: any = d3.svg.axis()
              .scale(x_scale)
              .orient("bottom") ;

          let y_axis: any = d3.svg.axis()
              .scale(y_scale)
              .orient("left") ;

          let x_grid: any = d3.svg.axis()
              .scale(x_scale)
              .orient("bottom")
              .tickSize(-innerheight)
              .tickFormat("") ;

          let y_grid: any = d3.svg.axis()
              .scale(y_scale)
              .orient("left") 
              .tickSize(-innerwidth)
              .tickFormat("") ;

          let draw_line: any = d3.svg.line()
              .x(function(d: any): number { return x_scale(d[0]); })
              .y(function(d: any): number { return y_scale(d[1]); }) ;

          let svg: any = d3.select("svg")
              .attr("width", width)
              .attr("height", height)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          // Сетка и метки
          svg.append("g")
              .attr("class", "x grid")
              .attr("transform", "translate(0," + innerheight + ")")
              .call(x_grid) ;

          svg.append("g")
              .attr("class", "y grid")
              .call(y_grid) ;

          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + innerheight + ")") 
              .call(x_axis)
              .append("text")
              .attr("dy", "-.71em")
              .attr("x", innerwidth)
              .style("text-anchor", "end")
              .text(xlabel) ;
          
          svg.append("g")
              .attr("class", "y axis")
              .call(y_axis)
              .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", "0.71em")
              .style("text-anchor", "end")
              .text(ylabel) ;

          // Точки
          svg.append("g").selectAll(".dot")
              .data(d3.zip(data[0].x, data[0].y))
              .enter().append("circle")
              .attr("class", "dot")
              .attr("r", 3.5)
              .attr("cx", function(d: any):number { return x_scale(d[0]) })
              .attr("cy", function(d: any):number { return y_scale(d[1]) })                        

          // График
          let data_lines: any = svg.selectAll(".d3_xy_chart_line")
              .data(datasets.map(function(d: any) {    
                  return d3.zip(d.x, d.y);}))
              .enter().append("g")
              .attr("class", "d3_xy_chart_line") ;
          
          data_lines.append("path")
              .attr("class", "line")
              .attr("d", function(d: any) {
                  return draw_line(d); })
              .attr("stroke", color_scale) ;  
      }) ;
    }
    return chart;
    }         
  }
}

export default Chart;