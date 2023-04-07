import React, { useEffect, useState } from "react";

const FetchAverageSessions = (userId) => {
  const id = userId;
  const [Load, setIsLoading] = useState(true);
  const [averageSession, setAverageSessions] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchSession() {
      try {
        const response = await fetch(
          `http://localhost:3000/user/${id}/average-sessions/`
        );
        const data = await response.json();

        setAverageSessions(data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(true);
        setError(err);
      }
    }
    fetchSession();
  }, [id]);

  if (Load === false) {
    return averageSession.data.sessions;
  } if(error) {
    console.log(error)
    return "error";
  }
};

export default FetchAverageSessions;
