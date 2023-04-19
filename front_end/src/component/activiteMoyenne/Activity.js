import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
const DureeMoyenne = (props) => {
  const activiteMoyenne = props.Activity;
  const groups = activiteMoyenne.map((d) => d.day.slice(-1));
  const subgroups = Object.keys(activiteMoyenne[0]).slice(1);
  const tabKilogram = activiteMoyenne.map((el) => el.kilogram);
  const tabCalories = activiteMoyenne.map((d) => d.calories);
  const svgRef = useRef();
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Definition of the dimensions of the graph
    const margin = { top: 20, right: 20, bottom: 0, left: 40 },
      width = 835 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;
    // Definition of the scale in X (days)
    const x = d3.scaleBand().domain(groups).range([0, width]).padding([0.5]);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
     
      .call(d3.axisBottom(x).tickPadding(10).tickSize(0))
      .select("path")
      .attr("stroke", "gray")
      
      .remove();
     

    const yScalePoids = d3
      .scaleLinear()
      .domain([d3.min(tabKilogram) - 1, d3.max(tabKilogram) + 2])
      .range([180, 20]);

    const yScaleCalories = d3
      .scaleLinear()
      .domain([0, d3.max(tabCalories)])
      .range([180, 20]);

    function trouvePlusPetitN(tab) {
      let nPlusPetit = tab[0];
      tab.forEach((el) => {
        if (el < nPlusPetit) {
          nPlusPetit = el;
        }
      });
      return nPlusPetit;
    }
    const tab = tabKilogram.filter((i) => i !== d3.min(tabKilogram));

    svg
      .append("g")
      .attr("class", "lignePointille")
      .attr("fill", "gray")
      .call(
        d3
          .axisRight(yScalePoids)
          .tickPadding(0)
          .tickValues([
            d3.min(tabKilogram) - 1,
            trouvePlusPetitN(tab),
            d3.max(tabKilogram) + 2,
          ])
          .tickSize(740)
      )
      .select(".domain")
      .remove();

   /* Dotted horizontal line */
    const lignePointille = svg.selectAll(".lignePointille line")
    
    lignePointille
      .style("stroke", "gray")
      .style("stroke-dasharray", "2.4")
      .attr("x1", 59)
      .attr("x2", 710)
    
      const thirdLine = svg.selectAll(".lignePointille line")
      .filter(function(d, i) {
        return i === 0; // index 2 for the third line (index starts at 0)
      });

      thirdLine
      .style("stroke", "gray")
      .style("stroke-dasharray", "0")
     
  
    const xSubgroup = d3
      .scaleBand()
      .domain(subgroups)
      .range([0, x.bandwidth()])
      .padding([0.5]);

    const color = d3
      .scaleOrdinal()
      .domain(subgroups)
      .range(["black", "red"]);


  
    // Creation of bars for each session
    svg
      .append("g")
      .selectAll("g")
      .data(activiteMoyenne)
      .join("g")
      .attr("class", "sousGroupe2")
      .attr("transform", (d) => `translate(${x(d.day.slice(-1))}, 10)`)

      .selectAll("rect")
      .data(function (d) {
        return subgroups.map(function (key) {
          return { key: key, value: d[key] };
        });
      })
      .join("rect")
    
      .attr("class", "barre2")
      .attr("x", (d) => xSubgroup(d.key))
      .attr("y", (d) => {
        if (d.key === "calories") {
          return yScaleCalories(d.value);
        } else {
          return yScalePoids(d.value);
        }
      })
      .attr("width", xSubgroup.bandwidth() -2)
      .attr("height", (d) => {
        if (d.key === "calories") {
          return 180 - yScaleCalories(d.value) -10;
        } else {
          return 180 - yScalePoids(d.value) -10 ;
        }
      })
      .attr("fill", (d) => color(d.key))
      //Barre arrondi
      svg
      .append("g")
      .selectAll("g")
      .data(activiteMoyenne)
      .join("g")
      .attr("class", "sousGroupe")
      .attr("transform", (d) => `translate(${x(d.day.slice(-1))}, 0)`)

      .selectAll("rect")
      .data(function (d) {
        return subgroups.map(function (key) {
          return { key: key, value: d[key] };
        });
      })
      .join("rect")
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("class", "barre")
      .attr("x", (d) => xSubgroup(d.key) )
      .attr("y", (d) => {
        if (d.key === "calories") {
          return yScaleCalories(d.value);
        } else {
          return yScalePoids(d.value);
        }
      })
      .attr("width", xSubgroup.bandwidth() -1.9)
      .attr("height", (d) => {
        if (d.key === "calories") {
          return 180 - yScaleCalories(d.value) ;
        } else {
          return 180 - yScalePoids(d.value)  ;
        }
      })
      .attr("fill", (d) => color(d.key))

    /* Management of the animation with the movement of the mouse */

    const sousgroupe = d3.selectAll(".sousGroupe");
    sousgroupe
      .append("rect")
      .attr("class", "backgroundHover")
      .attr("x", -15)
      .attr("y", 18)
      .attr("width", 80)
      .attr("height", 162)
      .attr("fill", "gray")
      .attr("opacity", "0")
      .on("mouseover", (event) => {
        d3.select(event.target)
          .transition()
          .attr("opacity", ".2")
          .duration("150");
        d3.selectAll(`.${event.target.nextSibling.classList.value}`)
          .transition()
          .attr("opacity", "1")
          .duration("150");
      })
      .on("mouseout", function (d) {
        d3.select(this).transition().attr("opacity", "0").duration("150");

        d3.selectAll(`.${d.target.nextSibling.classList.value}`)
          .transition()
          .attr("opacity", "0")
          .duration("150");
      });

        /* small notch for price definition */

    sousgroupe
      .append("rect")
      .attr("class", (d, i) => "sousGroupeInfos" + i)
      .attr("x", 50)
      .attr("y", 30)
      .attr("width", "60")
      .attr("height", "50")
      .attr("fill", "red")
      .attr("opacity", "0");

    sousgroupe
      .data(activiteMoyenne)
      .append("text")
      .attr("class", (d, i) => "sousGroupeInfos" + i)
      .text((d) => d.calories + "kcal")
      .attr("x", 80)
      .attr("y", 50)
      .attr("opacity", "0")
      .attr("width", "60")
      .attr("height", "70")
      .style("text-anchor", "middle")
      .style("font-size", "13px")
      .style("fill", "white");

    sousgroupe
      .data(activiteMoyenne)
      .append("text")
      .attr("class", (d, i) => "sousGroupeInfos" + i)
      .text((d) => d.kilogram + "kg")
      .attr("x", 80)
      .attr("y", 70)
      .attr("opacity", "0")
      .attr("width", "60")
      .attr("height", "70")
      .style("text-anchor", "middle")
      .style("font-size", "13px")
      .style("fill", "white");
  }, [activiteMoyenne, groups, subgroups]);

  return (
    <div
      className="barChart_contenant"
      style={{ width: "830px", height: `320px`, backgroundColor: "#FBFBFB " }}
    >
      <div className="header_barchart">
        <h3 className="titre_Barchart">Activité Moyenne</h3>

        <div className="legende">
          <div className="legende_contenant">
            <div className="legende_carreNoir"></div>
            Poids
          </div>

          <div className="legende_contenant">
            <div className="legende_carreRouge"></div> Calories brûlées
          </div>
        </div>
      </div>

      <svg
        style={{ width: "835px", height: `200px`, backgroundColor: "#FBFBFB " }}
        ref={svgRef}
      ></svg>
    </div>
  );
};

export default DureeMoyenne;
