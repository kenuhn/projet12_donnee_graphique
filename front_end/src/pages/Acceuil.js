import React from "react";
import FetchUserInfos from "../utils/FetchUserInfos";
import { useParams } from "react-router-dom";
import Bienvenue from "../component/Bienvenue/Bienvenue";
import Health from "../component/Health/Health";
import flamme from "../images/vignette/energy.svg";
import proteines from "../images/vignette/chicken.svg";
import glucides from "../images/vignette/apple.svg";
import cheeseburger from "../images/vignette/cheeseburger.svg";
import FetchActivity from "../utils/FetchActivity";
import GraphiqueActivite from "../component/activiteMoyenne/Activity";
import FetchAverageSessions from "../utils/FetchAverageSessions";
import SessionMoyenneGraphique from "../component/sessionMoyenne.js/sessionMoyenneGraphique";
import FetchRadar from "../utils/FetchRadar";
import PerformanceGraphique from "../component/performance/Performance";
import CercleGraphque from "../component/cercle/cercleMetric";
import NotFound from "./notFound";

// Home page call different fetch to give data in each components
  const Acceuil = () => {

    const { id } = useParams();
    const profile = FetchUserInfos(id);
    const Activity = FetchActivity(id);
    const AverageSessions = FetchAverageSessions(id);
    console.log(AverageSessions)
    const performance = FetchRadar(id);
    if (
      profile === "error" ||
      Activity === "error" ||
      AverageSessions === "error" ||
      performance === "error"
    ) {
     return <NotFound />
    } else {
      if (profile && Activity && AverageSessions && performance) {
        const dataProfile = profile.data;
        const dataActvity = Activity.data.sessions;
        const dataAverageSession = AverageSessions;
        const dataPerformance = performance.data;
      /*  console.log(dataPerformance) */
        return (
          <div className="acceuil">
            <Bienvenue
              key={"firstName"}
              firstName={dataProfile.userInfos.firstName}
            />
            <div className="infos">
              <Health
                color={"#FD51811A"}
                image={flamme}
                unite={"kcal"}
                composant={"calories"}
                infos={dataProfile.keyData.calorieCount}
              />
              <Health
                color={"#4AB8FF1A"}
                image={glucides}
                unite={"g"}
                composant={"proteines"}
                infos={dataProfile.keyData.proteinCount}
              />
              <Health
                color={"#F9CE23"}
                image={proteines}
                unite={"g"}
                composant={"glucides"}
                infos={dataProfile.keyData.carbohydrateCount}
              />
              <Health
                color={"#FD51811A"}
                image={cheeseburger}
                unite={"g"}
                composant={"lipides"}
                infos={dataProfile.keyData.lipidCount}
              />
            </div>

            <GraphiqueActivite Activity={dataActvity} />

            <div className="petitGraph">
              <SessionMoyenneGraphique test={dataAverageSession} />
              <PerformanceGraphique PerformanceData={dataPerformance} />
              <CercleGraphque id={profile}/>
            </div>
          </div>
        );
      }
    }
};

export default Acceuil;
