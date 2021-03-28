import { useState } from "react";

export default function Sort(props) {
  const [sort, setSort] = useState({ by: "name", dir: "asc" });

  function handleOnChange(e) {
    let s = {
      by: e.target.value.split("-")[0],
      dir: e.target.value.split("-")[1],
    };

    setSort(s);
    props.handleOnSortChange(s);
  }

  return (
    <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
      <div className="dropdown sort">
        <span className="sort-label label label-success label-medium">
          <span>
            Sort by <i className="sort-type">{sort.by}</i>
          </span>
          <span>
            Sort from{" "}
            <i className="sort-type">
              {sort.dir === "asc" && sort.by === "name"
                ? "a -> z"
                : sort.dir === "desc" && sort.by === "name"
                ? "z -> a"
                : sort.dir === "asc" && sort.by === "level"
                ? "low to high"
                : "high to low"}
            </i>
          </span>
        </span>
        <select
          name="select"
          id="select"
          className="form-control select-sort"
          onChange={handleOnChange}
        >
          <option value="name-asc">Name ASC</option>
          <option value="name-desc">Name DESC</option>
          <option value="level-asc">Level ASC</option>
          <option value="level-desc">Level DESC</option>
        </select>
      </div>
    </div>
  );
}
