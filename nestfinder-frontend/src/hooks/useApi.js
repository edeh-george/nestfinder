import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;
const endPoint = "token/refresh/";
const fullUrl = new URL(endPoint, baseUrl).toString();

const useApi = async () => {
    try {
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      // const response = await axios.post(fullUrl, 
      //   {},
      //   {
      //   withCredentials: true,
      // });
      return response.data.access;
    } catch (err) {
      console.error("An error occurred");
    }
  };


export default useApi;
