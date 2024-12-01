import React, { useState, useEffect } from 'react';
import './HouseListing.css';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";  

const baseUrl = import.meta.env.VITE_API_URL;
const endPoint = 'apartment-list/';
const fullUrl = new URL(endPoint, baseUrl).toString();


const HouseListing = () => {
  const [houses, setHouses] = useState([]);
  const [filters, setFilters] = useState({
    budget: {startPrice: 0, endPrice: null},
    location: '',
    apartmentType: '',
    name: '', 
    isLeased: '',
    dateFrom: '',
    dateTo: '', 
    ordering: '',
  });

  useEffect(() => {
    const fetchHouses = async () => {
      let urlAndQuery = `${fullUrl}?location=${filters.location}&apartmentType=${filters.apartmentType}&ordering=${filters.ordering}`+
        `&name=${filters.name}&date_from=${filters.dateFrom}&date_to=${filters.dateTo}&is_leased=${filters.isLeased}&start_price=${filters.budget.startPrice}`;
      if (filters.budget.endPrice) {urlAndQuery += `&filters.budget.endPrice`};
      const response = await fetch(urlAndQuery);
      const data = await response.json();
      setHouses(data.results);
    };

    fetchHouses();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  if (!houses){
    return <div>There seems to be an issue fetching the data</div>
  }

  return (
    <div className="house-listing">
      <aside className="filters">
        <h3>Filters</h3>
        <div>
          <label>Budget:</label>
          <input type="number" name="budget" value={filters.budget.endPrice} onChange={handleFilterChange} />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" name="location" value={filters.location} onChange={handleFilterChange} />
        </div>
        <div>
          <label>Apartment Type:</label>
          <select name="apartmentType" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="one_room">One room</option>
            <option value="room_and_parlour">A Room with parlour</option>
            <option value="self_con">Self contain</option>
          </select>
        </div>
        <div>
          <label>Leased:</label>
          <select name="isLeased" onChange={handleFilterChange}>
            <option value="True">Yes</option>
            <option value="False">No</option>
          </select>
        </div>
        <div>
          <label>Ordering:</label>
          <input type="text" name="ordering" value={filters.ordering} onChange={handleFilterChange} />
        </div>
      </aside>
      <main className="house-results">
        <div className="search-house-name">
                <input
                    type="text"
                    placeholder="Search..."
                    value={filters.name}
                    onChange={(e) => filters.name=e.target.value}
                />
                <button onClick={handleFilterChange}><FaSearch/></button>
            </div>
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