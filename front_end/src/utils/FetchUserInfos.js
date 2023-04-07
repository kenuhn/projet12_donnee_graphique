import { useEffect } from "react";
import { useState } from "react";
const FetchUserInfos = (userId) => {
  const id = userId;
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const reponse = await fetch(`http://localhost:3000/user/${id}/`);
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
    console.log(profile)
    return profile;
  }
  if (error) {
    return "error";
  }
};
export default FetchUserInfos;
