import React from "react";
import SearchIcon from "./icons/SearchIcon";

function SearchInput({ action, placeholder }) {
  return (
    <div className="position-relative w-100" >
      <input
        id="password"
        type={"text"}
        onChange={action}
        className="search-input"
        placeholder={placeholder}
      />
      <div className="position-absolute" style={{ top: "10px", left: "15px" }}>
        <SearchIcon />
      </div>
    </div>
  );
}

export default SearchInput;
