import React from "react";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev);
      updated.set("name", value);
      return updated;
    });
  };

  return (
    <div className="search-house-name">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchParams.get("name") || ""}
        onChange={handleSearchChange}
        name="name"
      />
    </div>
  );
};

export default SearchBar;
