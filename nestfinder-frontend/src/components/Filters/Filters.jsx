import React from "react";
import './Filters.css';

const Filters = ({ filters, handleFilterChange }) => {
    console.log(filters);
  return (
    <aside className="filters">
      <h3>Filters</h3>
      <div>
        <label>Budget:</label>
        <input
          type="number"
          name="budget.startPrice"
          placeholder="Start Price"
          value={filters.budget.startPrice}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="budget.endPrice"
          placeholder="End Price"
          value={filters.budget.endPrice}
          onChange={handleFilterChange}
        />
      </div>
      <div>
        <label>Location:</label>
        <select
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="Odim">Odim</option>
          <option value="Odenigwe">Odenigwe</option>
          <option value="behind flat">Behind Flat</option>
          <option value="green house">Green House</option>
          <option value="hilltop">Hilltop</option>
          <option value="staff quarters">Staff Quarters</option>
        </select>
      </div>
      <div>
        <label>Apartment Type:</label>
        <select
          name="apartmentType"
          value={filters.apartmentType}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="one_room">One room</option>
          <option value="room_and_parlour">A Room with parlour</option>
          <option value="self_con">Self contain</option>
        </select>
      </div>
      <div>
        <label>Leased:</label>
        <select
          name="is_leased"
          value={filters.isLeased}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="True">Yes</option>
          <option value="False">No</option>
        </select>
      </div>
      <div>
        <label>Ordering:</label>
        <input
          type="text"
          name="ordering"
          value={filters.ordering}
          onChange={handleFilterChange}
        />
      </div>
    </aside>
  );
};

export default Filters;
