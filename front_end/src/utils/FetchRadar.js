import React from 'react'
import  { useEffect} from 'react'
import {useState} from 'react';

const FetchRadar = (userId) => {
    const id = userId
    console.log(id)
    const [performance, setData] = useState(null)
    const [Loading, setIsLoading] = useState(null)
    const [error, setError] = useState(null)


    useEffect(() => {
        async function fetchData ()  {
            try {
                const response = await  fetch(`http://localhost:3000/user/${id}/performance/`)
                const data = await response.json()
                /* setIsLoading(false) */
                setData(data)
            } catch(err) {
               /*   setIsLoading(true) */
                 setError(err)
            } 
        }
        fetchData()

    },[id])

    if (error) {
        console.log(error);
        return "error";
      }
      
      if (Loading) {
        console.log("loading")
        return "loading...";
      }
    
      if (performance !== null) {
        return performance;
      }
    
  
};

export default FetchRadar