import React, { useRef, useEffect } from "react";

import * as d3 from "d3";

const SessionMoyenneGraphique = (props) => {
  const sessionMoyenne = props.test;
  const groups = ["L", "M", "M ", "J", "V", "S", "D"];
  const newSessionMoyenne = sessionMoyenne.map((el, index) => {
    return { ...el, day: groups[index] };
  });
  const session = sessionMoyenne.map((el) => el.sessionLength);
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const margin = { top: 20, bottom: 20, right: 0, left: 0 },
      width = 270 - margin.left - margin.right,
      height = 270 - margin.top - margin.bottom;

    /*    const bandWidth = width / 7; */
    const x = d3
      .scaleBand()
      .domain(groups)
      .range([0, width])
      .padding(0.5)
      .paddingOuter(0.5); ///* .padding(0, 2) */;

    //Affiche l'axe X sans la barre horizontal
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickPadding(10).tickSize(0))
      .attr("stroke", "white")
      .style("border", "solid black")
      .attr("font-size", "14px")
      .select("path")
      .remove();

    svg
      .append("text")
      .attr("x", 30)
      .attr("y", 40)
      .style("font-size", "16px")
      .text("Durée moyenne des");

    svg
      .append("text")
      .attr("x", 30)
      .attr("y", 55)
      .style("font-size", "16px")
      .text("sessions");

    //Modifie la couleur du texte
    svg.selectAll("text").attr("fill", "white").attr("opacity", "0.5");

    // Affiche l'axe X tourne vers la gauche les ticks pour ne pas les afficher dans le svg
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(session)])
      .range([200, 90]);

    svg
      .append("g")

      .attr("stroke", "gray")

      .call(d3.axisLeft(y).tickValues(session))
      .select(".domain")
      .remove();

    const curve = d3.curveCardinal.tension(0.1);

    // Ajout de la ligne de donnée
    svg
      .append("path")
      .datum(newSessionMoyenne)
      .attr("transform", "scale(1, 1)translate(0, 0)")

      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("opacity", "0.8")
      .attr("stroke-width", 3)
      .attr(
        "d",
        d3
          .line()
          .defined(function (d) {
            return d.sessionLength !== null;
          })
          .x(function (d) {
            return x(d.day);
          })
          .y(function (d) {
            return y(d.sessionLength);
          })
          .curve(curve)
      )
      .selectAll("d");

    //créer d'une ligne écouteuse d'évenements

    //Création de l'animation recatangle
    var rectangleAnime = svg
      .append("g")
      .attr("id", "rectangleAnime")
      .style("display", "none");
    rectangleAnime
      .append("rect")
      .attr("width", 270)
      .attr("height", 400)
      .style("fill", "#black")

      .style("opacity", "0.3")
      .style("stroke-width", "1");

    // Création d'un groupe qui contiendra tout le tooltip plus le cercle de suivi
    var tooltip = svg
      .append("g")
      .attr("id", "tooltip")
      .style("display", "none");

    // Le cercle extérieur bleu clair
    tooltip.append("circle").attr("fill", "#CCE5F6").attr("r", 5);

    // Le cercle intérieur bleu foncé

    // Le tooltip en lui-même avec sa pointe vers le bas
    // Il faut le dimensionner en fonction du contenu
    tooltip
      .append("rect")
      .attr("width", 40)
      .attr("height", 25)
      .style("fill", "#fafafa")
      .attr("transform", "translate(5, -50)");

    // Cet élément contiendra tout notre texte
    var text = tooltip
      .append("text")
      .style("font-size", "13px")
      .style("font-family", "Segoe UI")
      .style("color", "#333333")
      .style("fill", "#333333")
      .attr("transform", "translate(8, -60)");

    // Element pour la date avec positionnement spécifique
    text.append("tspan").attr("dx", "-5").attr("id", "tooltip-date");

    text
      .append("tspan")
      .attr("id", "tooltip-close")
      .style("font-size", "11px")
      .style("font-family", "roboto")
      .attr("fill", "black")
      .attr("dy", "27")
      .attr("dx", "-1");

    // Le texte pour la valeur de l'or à la date sélectionnée

    svg

      .append("rect")
      .attr("class", "ecoute-event")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "transparent")
      .on("mousemove", function (event) {
        const mouseX = d3.pointer(event)[0];
        const bisector = d3.bisector((d) => x(d)).left;
        const closestBandIndex = bisector(groups, mouseX);
        const closestBand = newSessionMoyenne[closestBandIndex];
        if (closestBand) {
          rectangleAnime.attr(
            "transform",
            "translate(" + x(closestBand.day) + ")"
          );
          rectangleAnime.style("display", "block");
          tooltip.attr(
            "transform",
            "translate(" +
              x(closestBand.day) +
              "," +
              y(closestBand.sessionLength) +
              ")"
          );
          tooltip.style("display", "block");
          d3.select("#tooltip-close").text(closestBand.sessionLength + "min");
        }
        /*  */
      })
      .on("mouseleave", (event) => {
        rectangleAnime.style("display", "none");
        tooltip.style("display", "none");
      });
  }, [sessionMoyenne, groups, newSessionMoyenne, session]);

  return (
  
      <svg
        style={{ height: "270px", width: "270px", background: "red",  borderRadius:5 }}
        ref={svgRef}
      ></svg>
   
  );
};

export default SessionMoyenneGraphique;
