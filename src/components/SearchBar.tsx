import React, { useState } from "react";

import { FaSearch } from "react-icons/fa";

import classes from "./SearchBar.module.css";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <div className={classes["search-container"]}>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={handleSearchChange}
        className={classes["search-input"]}
      />
      <FaSearch className={classes["search-icon"]} />
    </div>
  );
};

export default SearchBar;
