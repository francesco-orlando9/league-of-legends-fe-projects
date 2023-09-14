import React, { useState, useRef } from "react";

import { FaSearch } from "react-icons/fa";

import classes from "./SearchBar.module.css";
import useOutsideClick from "../hooks/outsideClickHook";

const SearchBar = (props: any) => {
  const [searchText, setSearchText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<
    { imgUrl: string; name: string }[]
  >([]);

  const ref = useRef(null);
  useOutsideClick(ref, () => {
    setSuggestions([]);
  });

  // Sample data - replace with your own or fetch from API
  const championsNames: { imgUrl: string; name: string }[] =
    props.championsNames;

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    if (e.target.value.trim === "") {
      return;
    }
    setSearchText(value);
    if (value) {
      const filteredSuggestions = getFilteredChampions(value);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const getFilteredChampions = (value: string) => {
    return championsNames.filter((championInfo) =>
      championInfo.name.toLowerCase().startsWith(value.toLowerCase())
    );
  };

  const handleSuggestionClick = (suggestion: any) => {
    setSearchText(suggestion.name);
    setSuggestions([]);
    props.onSearchHandler(suggestion.name);
  };

  const handleEnterKey = (event: any) => {
    if (event.key === "Enter") {
      setSuggestions([]);

      props.onSearchHandler(searchText);
    }
  };

  return (
    <>
      <div className={classes["search-container"]} ref={ref}>
        <FaSearch className={classes["search-icon"]} />
        <input
          onFocus={() => console.warn(suggestions)}
          onClick={(e: any) =>
            setSuggestions(getFilteredChampions(e.target.value))
          }
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleInputChange}
          onKeyUp={handleEnterKey}
          className={`${classes["search-input"]} ${
            suggestions.length > 0 ? classes["suggestions-visible"] : ""
          }`}
        />
        <div
          className={classes.suggestions}
          style={{ display: suggestions.length > 0 ? "block" : "none" }}
        >
          {suggestions.length > 0 && (
            <ul className={classes.suggestionsList}>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={(e) => handleSuggestionClick(suggestion)}
                >
                  <div className={classes.suggestion}>
                    <img src={suggestion.imgUrl} alt="" /> {suggestion.name}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
