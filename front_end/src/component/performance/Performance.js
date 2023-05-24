import React, { useRef, useEffect } from "react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

/**

    Composant React pour afficher un graphique RadarChart à partir des données de performance passées en props.
    @param {Object} props - Propriétés passées au composant.
    @param {Object} props.PerformanceData - Données de performance pour générer le graphique RadarChart.
    @param {Array} props.PerformanceData.data - Données de performance.
    @param {Array} props.PerformanceData.kind - Catégories de performance.
    @returns {JSX.Element} - Composant React pour afficher un graphique RadarChart à partir des données de performance passées en props.
*/

  const Performance = (props) => {
     const data =  props.PerformanceData
    
    const width = 270;
    const height = 270;
    return (
      <div style={{ width: `${width}px`, height: `${height}px` }}>
      <RadarChart width={width} height={height} cx="50%" cy="50%" style={{backgroundColor: "#282A30", borderRadius:5}} outerRadius="70%" data={data}>
        <PolarGrid radialLines={false} stroke="#FFFFFF" /> 
        <PolarAngleAxis dataKey="kind" tick={{ fill: '#fff', }} style={{transform: "translate(2px, -7px) scaleY(1.1)", fontSize: "11px"}}/>
        <PolarRadiusAxis tick={false} axisLine={false} stroke="#FFFFFF"/> 
        <Radar dataKey="value" fill="#FF0101" fillOpacity={0.6} />
      </RadarChart>
    </div>
    
    
    );
  };
  

export default Performance;