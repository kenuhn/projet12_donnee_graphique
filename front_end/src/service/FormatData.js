export default class FormatData {
    constructor(dataActivity, dataAverageSessions, dataPerformance, dataUserInfos){
        this.dataActivity = dataActivity;
        this.dataAverageSessions = dataAverageSessions;
        this.dataPerformance = dataPerformance;
        this.dataUserInfos = dataUserInfos;
    }

    formatDataActivity(){
      
       return this.dataActivity.data.sessions.map((el) => {
        return { ...el, day: el.day.slice(-1) }

      });  
    }

    formatDataAverageSessions(){
       const groups = ["L", "M", "M ", "J", "V", "S", "D"];
       const formatData = this.dataAverageSessions.data.sessions.map((el, index) => {
        return {day: groups[index], sessionLength: el.sessionLength}
      })
        return formatData
    }

     formatDataPerformance(){
        const kind = this.dataPerformance.data.kind 
        return this.dataPerformance.data.data.map((el, index) => {
          return {
            ...el, kind: kind[index +1] }

        }).reverse()
    } 

    formatDataUserInfos(){
        const data =  this.dataUserInfos.data

        if ( data.score ) {
          const score = data.score * 100
            return score 
        } else {
          const todayScore = data.todayScore * 100
            return todayScore
        }


    }
}
