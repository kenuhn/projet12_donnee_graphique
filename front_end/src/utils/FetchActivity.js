import React from 'react';
import { useEffect } from "react";
import { useState } from "react";

const FetchActivity = (userId) => {
    const id = userId;
    const [isLoading, setIsLoading] = useState(true);
    const [Activity, setData] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      async function getData() {
        try {
          const reponse = await fetch(`http://localhost:3000/user/${id}/activity/`);
          const data = await reponse.json();
         
          setIsLoading(false);
          setData(data);
        } catch (error) {
          setIsLoading(false);
          setError(error);
        }
      }
      getData();
    }, [id]);
  
    if (!isLoading) { 
      return Activity;
    }
    if (error) {
      console.log(error);
      return "error";
    }
};

export default FetchActivity;