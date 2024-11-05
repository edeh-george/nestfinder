import { useState, useEffect } from "react";
import axios from "axios";

const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/refresh-token/",
      {},
      {
        withCredentials: true,
      }
    );
    return response.data.accessToken; // Return the new access token
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    throw error; // Propagate the error
  }
};

const useApi = (url) => {
  const [data, setData] = useState(null);
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
      setData(response.data);
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
          setData(retryResponse.data);
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

  return { data, loading, error };
};

export default useApi;
