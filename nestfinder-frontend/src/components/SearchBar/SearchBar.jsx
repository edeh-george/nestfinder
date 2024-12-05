import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";  
import "./SearchBar.css"
import { handleFilterChange } from "../../pages/HouseListing/HouseListing.jsx"

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // const handleInputChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };

  // const handleSearch = () => {
  //   if (onSearch) {
  //     onSearch(searchQuery);
  //   }
  // };

  return (
    <div className="search-house-name">
                <input
                    type="text"
                    placeholder="Search..."
                    value={filters.name}
                    onChange={(e) => filters.name=e.target.value}
                />
                <span onClick={handleFilterChange}><FaSearch/></span>
            </div>
  );
};

export default SearchBar;
