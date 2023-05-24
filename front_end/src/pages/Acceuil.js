import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Bienvenue from "../component/Bienvenue/Bienvenue";
import Health from "../component/Health/Health";
import flamme from "../images/vignette/energy.svg";
import proteines from "../images/vignette/chicken.svg";
import glucides from "../images/vignette/apple.svg";
import cheeseburger from "../images/vignette/cheeseburger.svg";
import GraphiqueActivite from "../component/activiteMoyenne/Activity";
import SessionMoyenneGraphique from "../component/sessionMoyenne.js/sessionMoyenneGraphique";
import PerformanceGraphique from "../component/performance/Performance";
import CercleGraphque from "../component/cercle/cercleMetric";
import NotFound from "./notFound";
import fetchApi from "../service/FetchApi"
import FormatData from "../service/FormatData"

/**
 * Component for displaying user homepage with activity data and health information.
 * @component
 */

  const Acceuil =   () => {
    const {id} = useParams()
    const [dataActivity, setActivity] = useState(null)
    const [dataAverageSessions, setAverageSessions] = useState(null)
    const [dataPerformance, setPerformance] = useState(null)
    const [dataUserInfos, setUserInfos] = useState(null)
    const callData = new fetchApi()

    useEffect( () => {
        /**
         * Fetches data for user homepage from API when component mounts.
         * @async
         * @function
         */
     async  function receptionData () {
        const Activity = await callData.getActivity(id, true)
        const AverageSession =  await callData.getAverageSessions(id, true)
        const Performance = await callData.getPerformance(id, true)
        const userInfos = await callData.getUserInfos(id, true) 
        setActivity(Activity)
        setAverageSessions(AverageSession)
        setPerformance(Performance)
        setUserInfos(userInfos) 
      }

      receptionData()
     
    }, [])

 if (dataActivity === "error" || dataAverageSessions === "error" || dataPerformance === "error" || dataUserInfos === "error") {
  return <NotFound />
 } else  {
  if(dataActivity && dataAverageSessions && dataPerformance && dataUserInfos) {
   
     const formatData = new FormatData(dataActivity, dataAverageSessions, dataPerformance, dataUserInfos)
     const formatDataActivity = formatData.formatDataActivity()
     const formatDataAverageSessions = formatData.formatDataAverageSessions()
     const formatDataPerformance = formatData.formatDataPerformance()
     const formatDataUserInfos =  formatData.formatDataUserInfos()
    /*  console.log(formatDataActivity, formatDataAverageSessions, formatDataPerformance, formatDataUserInfos) */
  /**
   * Renders homepage with activity data and health information, or NotFound component if API data fetch fails.
   * @returns {JSX.Element} - The rendered component.
   */
    
    return (
      <div className="acceuil">
        <Bienvenue
          key={"firstName"}
          firstName={dataUserInfos.data.userInfos.firstName}
        />
        <div className="infos">
          <Health
            color={"#FD51811A"}
            image={flamme}
            unite={"kcal"}
            composant={"calories"}
            infos={dataUserInfos.data.keyData.calorieCount}
          />
          <Health
            color={"#4AB8FF1A"}
            image={glucides}
            unite={"g"}
            composant={"proteines"}
            infos={dataUserInfos.data.keyData.proteinCount}
          />
          <Health
            color={"#F9CE23"}
            image={proteines}
            unite={"g"}
            composant={"glucides"}
            infos={dataUserInfos.data.keyData.carbohydrateCount}
          />
          <Health
            color={"#FD51811A"}
            image={cheeseburger}
            unite={"g"}
            composant={"lipides"}
            infos={dataUserInfos.data.keyData.lipidCount}
          />
        </div>  
        <GraphiqueActivite Activity={formatDataActivity} />
        <div className="petitGraph">
        <SessionMoyenneGraphique test={formatDataAverageSessions} />
        <PerformanceGraphique PerformanceData={formatDataPerformance} />
         <CercleGraphque dataUserInfos={formatDataUserInfos}/> 
        </div>
        </div> )
  }
  
 }

};

export default Acceuil;

