import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./HouseListing.css";
import { exportName } from "../../components/SearchBar/SearchBar";

const baseUrl = import.meta.env.VITE_API_URL;
const endPoint = "apartment-list/";
const fullUrl = new URL(endPoint, baseUrl).toString();

const HouseListing = () => {
  const [houses, setHouses] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    budget: {
      startPrice: searchParams.get("start_price") || 0,
      endPrice: searchParams.get("end_price") || "",
    },
    location: searchParams.get("location") || "",
    apartmentType: searchParams.get("apartmentType") || "",
    name: searchParams.get("name") || "",
    isLeased: searchParams.get("is_leased") || "",
    dateFrom: searchParams.get("date_from") || "",
    dateTo: searchParams.get("date_to") || "",
    ordering: searchParams.get("ordering") || "",
  };

  useEffect(() => {
    const fetchHouses = async () => {
      let urlAndQuery =
        `${fullUrl}?location=${filters.location}&apartmentType=${filters.apartmentType}&ordering=${filters.ordering}` +
        `&name=${filters.name}&date_from=${filters.dateFrom}&date_to=${filters.dateTo}&is_leased=${filters.isLeased}&start_price=${filters.budget.startPrice}`;
      if (filters.budget.endPrice) {
        urlAndQuery += `&end_price=${filters.budget.endPrice}`;
      }
      const response = await fetch(urlAndQuery);
      const data = await response.json();
      setHouses(data.results);
    };

    fetchHouses();
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("budget.")) {
      const [_, key] = name.split(".");
      setSearchParams((prev) => {
        const updated = new URLSearchParams(prev);
        updated.set(key === "startPrice" ? "start_price" : "end_price", value);
        return updated;
      });
    } else {
      setSearchParams((prev) => {
        const updated = new URLSearchParams(prev);
        updated.set(name, value);
        return updated;
      });
    }
  };

  if (!houses) {
    return <div>There seems to be an issue fetching the data</div>;
  }

  return (
    <div className="house-listing">
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
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
          />
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
      <main className="house-results">
        {houses.map((house) => (
          <div key={house.id} className="house-item">
            <img src={`${house.image}`} alt="house-main-img" />
            <Link to={`/houses/${house.id}`} className="link-detail">
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
