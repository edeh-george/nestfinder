import React, { useState, useEffect } from 'react';
import './HouseListing.css';

const HouseListing = () => {
  const [houses, setHouses] = useState([]);
  const [filters, setFilters] = useState({
    budget: { min: 0, max: 5000 },
    location: '',
    apartmentType: '',
  });

  useEffect(() => {
    const fetchHouses = async () => {
      // Fetch data from the API based on filters
      const response = await fetch(`YOUR_API_URL?location=${filters.location}&budget=${filters.budget.max}&apartmentType=${filters.apartmentType}`);
      const data = await response.json();
      setHouses(data);
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
        <h1>House Listings</h1>
        {houses.map(house => (
          <div key={house.id} className="house-item">
            <h2>{house.name}</h2>
            <p>{house.description}</p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default HouseListing;
