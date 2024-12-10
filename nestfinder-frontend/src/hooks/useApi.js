import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;
const fullUrl = new URL('token/refresh/', baseUrl).toString();

const getAcessToken = async () => {
  try {
    const response = await axios.post(
      fullUrl,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data.access;
  } catch (error) {
      console.error("Failed to refresh access token:", error);
      throw error;
  }
};

const useApi = (url) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try{   
      const newAccessToken = await getAcessToken();
      const getResponse = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${newAccessToken}`,
        },
      });
      if (getResponse){
        setResponse(getResponse);
      }
      } catch (error) {
        console.error("Could not refresh access token:", error);
        setError("Could not refresh access token");
        // Optionally, handle logout or redirect to login here
      } finally {
          setLoading(false);
        }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { response, loading, error };
};

export default useApi;
