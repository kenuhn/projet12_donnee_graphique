export default class callApi {

   /**
   * Gets the average session data for a user.
   * @async
   * @param {number} id - The user ID.
   * @param {boolean} isAvailable - Whether the data is available or not.
   * @returns {Promise<Object|string>} - The average session data or an error message.
   */

    async getAverageSessions (id, isAvailable) {
            try {
                if (isAvailable === true ) {
                    const response = await fetch(
                        `http://localhost:3000/user/${id}/average-sessions/`
                      );
                      const data = await response.json();
                      if (response.status === 404 ) {
                        return "error"
                    }
                      return data
                } else {
                    const data = {
                        "data": {
                          "userId": 12,
                          "sessions": [
                            {"day": 1, "sessionLength": 30},
                            {"day": 2, "sessionLength": 23},
                            {"day": 3, "sessionLength": 45},
                            {"day": 4, "sessionLength": 50},
                            {"day": 5, "sessionLength": 0},
                            {"day": 6, "sessionLength": 0},
                            {"day": 7, "sessionLength": 60}
                          ]
                        }
                      }
                      return data 
                }
            
            
            } catch (err) {
               console.log(err) 
              return "error"
            }
    }

  /**
   * Gets the performance data for a user.
   * @async
   * @param {number} id - The user ID.
   * @param {boolean} isAvailable - Whether the data is available or not.
   * @returns {Promise<Object|string>} - The performance data or an error message.
   */
    async getPerformance (id, isAvailable) {
        try {
            if (isAvailable === true ) {
                const response = await  fetch(`http://localhost:3000/user/${id}/performance/`)
                const data = await response.json()
                if (response.status === 404 ) {
                    return "error"
                }
                return data
            } else {
                const data = {
                    "data": {
                      "userId": 12,
                      "kind": {
                        "1": "cardio",
                        "2": "energy",
                        "3": "endurance",
                        "4": "strength",
                        "5": "speed",
                        "6": "intensity"
                      },
                      "data": [
                        {"value": 80, "kind": 1},
                        {"value": 120, "kind": 2},
                        {"value": 140, "kind": 3},
                        {"value": 50, "kind": 4},
                        {"value": 200, "kind": 5},
                        {"value": 90, "kind": 6}
                      ]
                    }
                  }
                return data                 
            }
           
        } catch(err) {
           console.log(err)
            return "error"
        } 
    }

  /**
   * Gets the activity data for a user.
   * @async
   * @param {number} id - The user ID.
   * @param {boolean} isAvailable - Whether the data is available or not.
   * @returns {Promise<Object|string>} - The activity data or an error message.
   */
    async getActivity (id, isAvailable) {
        try {
            if (isAvailable === true ) {
                const response = await fetch(`http://localhost:3000/user/${id}/activity/`);
                const data = await response.json();
                if (response.status === 404 ) {
                    return "error"
                }
                return data 
            } else {
                const data = {
                    "data": {
                      "userId": 12,
                      "sessions": [
                        {"day": "2020-07-01", "kilogram": 80, "calories": 240},
                        {"day": "2020-07-02", "kilogram": 80, "calories": 220},
                        {"day": "2020-07-03", "kilogram": 81, "calories": 280},
                        {"day": "2020-07-04", "kilogram": 81, "calories": 290},
                        {"day": "2020-07-05", "kilogram": 80, "calories": 160},
                        {"day": "2020-07-06", "kilogram": 78, "calories": 162},
                        {"day": "2020-07-07", "kilogram": 76, "calories": 390}
                      ]
                    }
                  }
  
                  return data 
            }
         
          } catch (error) {
            console.log(error) 
            return "error"
          }
    }
  /**
   * Gets the user information for a user.
   * @async
   * @param {number} id - The user ID.
   * @param {boolean} isAvailable - Whether the data is available or not.
   * @returns {Promise<Object|string>} - The user information or an error message.
   */
    async getUserInfos (id, isAvailable) {
        try {
            if (isAvailable === true ) {
                const response = await fetch(`http://localhost:3000/user/${id}/`);
                const data = await response.json();
                if (response.status === 404 ) {
                    return "error"
                }
                return data 
            } else {
               const data =  {
                    "data":
                    {"id":12,
                    "userInfos":{
                                "firstName":"Karl",
                                "lastName":"Dovineau",
                                "age":31
                            },
                            
                    "todayScore":0.12,
                
                    "keyData":{
                                "calorieCount":1930,
                                "proteinCount":155,"carbohydrateCount":290,
                                "lipidCount":50
                              }
                    }
                }
                return data 
            }
           
          } catch (error) {
             console.log(error) 
            return "error"
          }
    }

}