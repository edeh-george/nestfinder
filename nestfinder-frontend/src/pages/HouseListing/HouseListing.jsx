import React, { useState, useEffect } from 'react';
import './HouseListing.css';
import { Link } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_API_URL;
const endPoint = 'apartment-list/';
const fullUrl = new URL(endPoint, baseUrl).toString();


const HouseListing = () => {
  const [houses, setHouses] = useState([]);
  const [filters, setFilters] = useState({
    budget: { min: 0, max: 5000000 },
    location: '',
    apartmentType: '',
  });

  useEffect(() => {
    const fetchHouses = async () => {
      const response = await fetch(`${fullUrl}?location=${filters.location}&budget=${filters.budget.max}&apartmentType=${filters.apartmentType}`);
      const data = await response.json();
      setHouses(data.results);
    };

    fetchHouses();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="house-listing">
      <aside className="filters">
        <h3>Filters</h3>
        <div>
          <label>Budget:</label>
          <input type="number" name="budget" value={filters.budget.max} onChange={handleFilterChange} />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" name="location" value={filters.location} onChange={handleFilterChange} />
        </div>
        <div>
          <label>Apartment Type:</label>
          <select name="apartmentType" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="1-bedroom">1 Bedroom</option>
            <option value="2-bedroom">2 Bedroom</option>
          </select>
        </div>
      </aside>
      <main className="house-results">
        {houses.map(house => (
          <div key={house.id} className="house-item">
            <img src={`${house.image}`} alt="house-main-img" />
            <Link to={`/houses/${house.id}`} className='link-detail'>
              <h2>{house.name}</h2>
              <p>{house.description}</p>
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
};

export default HouseListing;
