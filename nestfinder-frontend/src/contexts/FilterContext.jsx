import { useState, createContext } from "react";

 const FilterContext = createContext();

export default FilterContext;

export const FilterProvider = ({ children }) =>{
    const defaultFilters = {
        budget: {
            startPrice: 0,
            endPrice: "",
        },
        location: "",
        apartmentType: "",
        name: "",
        isLeased: "",
        dateFrom: "",
        dateTo: "",
        ordering: "",
        offset: 0,
        limit: "",
    };

    const [filters, setFilters] = useState(defaultFilters);

    return (
        <FilterContext.Provider value={{ filters, setFilters }}>
          {children}
        </FilterContext.Provider>
      );
};