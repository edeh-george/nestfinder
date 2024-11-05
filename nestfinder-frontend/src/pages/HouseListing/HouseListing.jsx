import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HouseListing/.css';
import useApi from '../../hooks/useApi';

const baseUrl = import.meta.env.VITE_API_URL;
const endPoint = 'api/v1/apartment';
const fullUrl = new URL(endPoint, baseUrl).toString();


function HouseListing() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await useApi(fullUrl);
        if (!response.ok) {
          throw new Error(response.data.json());
        }
        const data = await response.json();
        setHouses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="house-view-container">
      <h1>Available Houses</h1>
      <div className="houses">
        {houses.map((house) => (
          <Link to={`/house/${house.id}`} key={house.id} className="house-box">
            <h2>{house.name}</h2>
            <p>{house.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HouseListing;
