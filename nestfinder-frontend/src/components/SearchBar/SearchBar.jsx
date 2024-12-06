import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";  
import "./SearchBar.css"


export let exportName = null;

const SearchBar = () => {
  const [searchName, setSearchName] = useState("");
  

  const handleSearch = (e) => {
    (e) => setSearchName(e.target.value);
  };

  useEffect(()=> {
    exportName = searchName;
  }, [searchName]);


  return (
    <div className="search-house-name">
      <input
        type="text"
        placeholder="Search..."
        value={searchName}
        onChange={handleSearch}
      />
      <span onClick={handleSearch}><FaSearch/></span>
    </div>
  );
};

export default SearchBar;