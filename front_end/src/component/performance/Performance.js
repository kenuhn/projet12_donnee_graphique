import React, { useRef, useEffect } from "react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'


  const Performance = (props) => {
    const data =  props.PerformanceData
     const kind = data.kind 
    const newData = data.data.map((el, index) => {return {
      ...el, kind: kind[index +1] }}).reverse()
    
  /*   
    */
  
    /* const kind = props.Performance.data.kind */
    const width = 270;
    const height = 270;
    return (
        <ResponsiveContainer width={width} height={height} fill="#FF0101">
        <RadarChart  cx="50%" cy="50%" style={{backgroundColor: "#282A30", borderRadius:5}} outerRadius="70%"  data={newData}>
        <PolarGrid radialLines={false}  stroke="#FFFFFF" /> 
         <PolarAngleAxis dataKey="kind" tick={{ fill: '#fff', }} style={{transform: "translate(2px, -7px) scaleY(1.1)", fontSize: "11px"}}/>
        <PolarRadiusAxis tick={false} axisLine={false}   stroke="#FFFFFF"/> 
        <Radar dataKey="value" fill="#FF0101"  fillOpacity={0.6}  />
      </RadarChart>
      </ResponsiveContainer>
    
    
    );
  };
  

export default Performance;