import { useState } from "react";

export default function Search(props) {
  const [inputSearch, setInputSearch] = useState("");

  function handleInputSearchChange(e) {
    setInputSearch(e.target.value);
  }

  function handleSearch() {
    if (inputSearch) {
      props.handleSearch(inputSearch);
    }
  }

  function handleOnKeyPress(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  function handleClear() {
    props.handleSearch("");
    setInputSearch("");
  }

  return (
    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search for..."
          value={inputSearch}
          onChange={handleInputSearchChange}
          onKeyPress={handleOnKeyPress}
        />
        <span className="input-group-btn">
          <button className="btn btn-info" type="button" onClick={handleSearch}>
            Search
          </button>
          <button
            className="btn btn-warning"
            type="button"
            onClick={handleClear}
          >
            Clear
          </button>
        </span>
      </div>
    </div>
  );
}
