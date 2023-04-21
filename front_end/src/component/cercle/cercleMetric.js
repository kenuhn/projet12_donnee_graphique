import React, { useEffect } from "react";
import { useRef } from "react";
import * as d3 from "d3";

/**
 * Composant React pour afficher un cercle de score.
 * @param {CercleMetricProps} props - Les propriétés du composant.
 * @returns {JSX.Element} - Le composant.
 */

const CercleMetric = (props) => {
  let amelioration;
  const score = props.dataUserInfos.score
  const todayScore = props.dataUserInfos.todayScore 
  if (score) {
    amelioration = score * 100;
  } else {
    amelioration = todayScore * 100;
  }

  const svgRef = useRef();
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 20, bottom: 0, left: 40 },
      width = 270 - margin.left - margin.right,
      height = 270 - margin.top - margin.bottom;

    var arc = d3
      .arc()
      .endAngle(0)
      .innerRadius(80)
      .outerRadius(90)
      .cornerRadius(20);
    var twoPi = 2 * Math.PI;
    var progress = 0;
    var allocated = 100 - amelioration;
    var total = 100;
    var formatPercent = d3.format(".0%");

    svg.attr("width", width).attr("height", height).append("g");

    var meter = svg.append("g").attr("class", "funds-allocated-meter");

    meter
      .append("path")
      .attr("class", "background")
      .attr("d", arc.startAngle(twoPi))
      .attr("transform", "translate(" + 135 + "," + 140 + ")")
      .attr("fill", "white");
      
    var foreground = meter
      .append("path")
      .attr("class", "foreground")
      .attr("transform", "translate(" + 135 + "," + 140 + ")")
      .attr("fill", "red");

    var percentComplete = meter
      .append("text")
      .attr("text-anchor", "middle")
      .attr("class", "percent-complete")
      .attr("dy", "0em")
      .attr("transform", "translate(" + 135 + "," + height / 2 + ")")
      .style("font-size", "20px");

     var titre = meter
      .append("text")
      .attr("text-anchor", "middle")
      .attr("class", "description")
      .attr("dy", "2.3em")
      .text("Score")
      .attr("transform", "translate(" + 50 + "," + 10 + ")")
      .style("font-size", "15px");

    /* description is seperated in two part 1: "de votre" 2: "objecif"*/
    var description = meter
      .append("text")
      .attr("text-anchor", "middle")
      .attr("fill", "gray")
      .attr("class", "description")
      .attr("dy", "2.3em")
      .text("de votre")
      .attr("transform", "translate(" + 135 + "," + 118 + ")")
      .style("font-size", "15px"); 

     var description = meter
      .append("text")
      .attr("text-anchor", "middle")
      .attr("fill", "gray")
      .attr("class", "description")
      .attr("dy", "2.3em")
      .text("objectif")
      .attr("transform", "translate(" + 135 + "," + 135+ ")")
      .style("font-size", "15px"); 

    var i = d3.interpolate(progress, allocated / total);

    d3.transition()
      .duration(1000)
      .tween("progress", function () {
        return function (t) {
          progress = i(t);
          foreground.attr("d", arc.endAngle(twoPi * progress));
          percentComplete.text(formatPercent(amelioration / 100));
        };
      });
  }, []);
  return (
    <svg
      ref={svgRef}
      style={{
        height: "270px",
        width: "270px",
        background: "#FBFBFB",
        borderRadius: 5,
      }}
    ></svg>
  );
};

export default CercleMetric;
