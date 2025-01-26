import React, { useState, useEffect, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import FilterContext from "../../contexts/FilterContext";
import "./HouseListing.css";
import axios from "axios";
import Filters from "../../components/Filters/Filters";

const baseUrl = import.meta.env.VITE_API_URL;
const endPoint = "apartment-list/";
const fullUrl = new URL(endPoint, baseUrl).toString();

const HouseListing = () => {
  const [houses, setHouses] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const { filters, setFilters } = useContext(FilterContext);

  
  useEffect(() => {
    const newFilters = {
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
      offset: searchParams.get("offset") || 0,
      limit: searchParams.get("limit") || "",
    };
    setFilters(newFilters);
  }, [searchParams, setFilters]);

  const query = new URLSearchParams({
    name: filters?.name || "",
    location: filters?.location || "",
    apartmentType: filters?.apartmentType || "",
    start_price: filters?.budget?.startPrice || 0,
    end_price: filters?.budget?.endPrice || "",
    is_leased: filters?.isLeased || "",
    date_from: filters?.dateFrom || "",
    date_to: filters?.dateTo || "",
    ordering: filters?.ordering || "",
    offset: filters?.offset || 0,
    limit: filters?.limit || "",
  }).toString();

  const get_data = async () => {
    try {
      const response = await axios.get(`${fullUrl}?${query}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      console.error(`${err}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await get_data();
      if (response) {
        setNextPage(response.next);
        setPreviousPage(response.previous);
        setHouses(response.results);
      }
    };
    fetchData();
  }, [query]);

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

  const handlePageChange = (page) => {
    const urlObj = new URL(page);
    const params = {
      limit: parseInt(urlObj.searchParams.get("limit"), 10),
      offset: parseInt(urlObj.searchParams.get("offset"), 10),
    };
    const updated = new URLSearchParams(searchParams);
    updated.set("offset", params.offset ?? 0);
    updated.set("limit", params.limit);
    setSearchParams(updated);
  };

  if (!houses) {
    return <div>There seems to be an issue fetching the data</div>;
  }

  return (
    <div className="house-listing">
      <Filters filters={filters} handleFilterChange={handleFilterChange} />
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
        <div className="pagination">
          <button
            onClick={() => handlePageChange(previousPage)}
            disabled={previousPage === null}
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(nextPage)}
            disabled={nextPage === null}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default HouseListing;
