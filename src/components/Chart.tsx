/// <reference path="../interfaces.d.ts" />

import React from "react";

declare var d3: any;

class Chart extends React.Component <IAppState> {
  constructor(props:IAppState) {
    super(props);
    this.state = {
      checkedGrid : this.props.checkedGrid,
      checkedLabelAxis: this.props.checkedLabelAxis
    }
  }

  // // Первоначальная вырисовка графика
  // componentDidMount() {
  //   this.drawChart();
  // };

  componentDidUpdate() {
    if (this.props.reDraw) {
      this.drawChart();
    }  

    if (this.props.checkedGrid) {
      d3.selectAll(" .tick line").attr("display", "block");
    } else {
      d3.selectAll(" .tick line").attr("display", "none");
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
    const minY : number = Number(this.props.minY);
    const maxY : number = Number(this.props.maxY);
    const widthSVG : number = Number(this.props.width);
    const heightSVG : number = Number(this.props.height);
    let data: point[] = this.props.points;

    //************************************************************
    // Очистка SVG
    //************************************************************
    d3.selectAll("svg > *").remove();

    //************************************************************
    // Создание осей и отступов и подключение функции зуммирования
    //************************************************************
    let margin : {top: number; right: number; bottom: number; left: number} = 
                        {top: 20, right: 10, bottom: 30, left: 50}, 
    width : number = widthSVG- margin.left - margin.right,
    height : number = heightSVG - margin.top - margin.bottom; 

    var xScale = d3.scale.linear()
    .domain([0, amountPoint+1])
    .range([0, width]);

    var yScale = d3.scale.linear()
    .domain([minY, maxY])
    .range([height, 0]);

    var xAxis = d3.svg.axis()
    .scale(xScale)
    .tickSize(-height)
    .tickPadding(10)	
    .orient("bottom");	

    var yAxis = d3.svg.axis()
    .scale(yScale)
    .tickPadding(10)
    .tickSize(-width)
    .orient("left");
    // .style("display:none")

    var zoom = d3.behavior.zoom()
    .x(xScale)
    .y(yScale)
    .scaleExtent([1, 10])
    .on("zoom", zoomed);    

    //************************************************************
    // Создание SVG-объекта
    //************************************************************	
    var svg = d3.select("svg")
    .call(zoom)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

    svg.append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

    //************************************************************
    // Рисование line-объекта с данными на SVG
    //************************************************************
    var line = d3.svg.line()
    // .interpolate("linear")
    .x(function(d:point) {return xScale(d.x); }) // set the x values for the line generator
    .y(function(d:point) { return yScale(d.y); }) // set the y values for the line generator 

    svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("clip-path", "url(#clip)")
    .attr('stroke', 'steelblue')
    .attr("d", line);	

    //************************************************************
    // Рисование точек
    //************************************************************
    var points = svg.selectAll('.dots')
    .data([data])
    .enter()
    .append("g")
    .attr("class", "dots")
    .attr("clip-path", "url(#clip)");	

    points.selectAll('.dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('class','dot')
    .attr("r", 2.5)
    .attr('fill', "black")	
    .attr("transform", function(d:point) { 
      return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"; }
    );   

    //************************************************************
    // Функция зуммирования
    //************************************************************

    function zoomed() : void {
      svg.select(".x.axis").call(xAxis);
      svg.select(".y.axis").call(yAxis);   
      svg.selectAll('path.line').attr('d', line);  
     
      points.selectAll('circle').attr("transform", function(d:point) { 
        return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"; }
      );  

      // добавление и удаление сетки и меток
      if (d3.select("#grid").property("checked")) {
        d3.selectAll(" .tick line").attr("display", "block");
      } else {
        d3.selectAll(" .tick line").attr("display", "none");
      }
      if (d3.select("#tags").property("checked")) {
        d3.selectAll(".axis text").attr("display", "block");
      } else {
        d3.selectAll(".axis text").attr("display", "none");
      }
    }   
  }
}

export default Chart;