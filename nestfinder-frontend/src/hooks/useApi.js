import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;
const fullUrl = new URL('token/refresh', baseUrl).toString();

const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      fullUrl,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data.accessToken;
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

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setResponse(response);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();
          localStorage.setItem("accessToken", newAccessToken);
          const retryResponse = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          });
          setResponse(retryResponse);
        } catch (refreshError) {
          console.error("Could not refresh access token:", refreshError);
          setError("Could not refresh access token");
          // Optionally, handle logout or redirect to login here
        }
      } else {
        setError("Error fetching data");
      }
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
