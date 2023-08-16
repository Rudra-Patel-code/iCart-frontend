import React, { useState } from "react";

const FilterModel = ({ clearAllFilters, applyFilter }) => {
  const [range, setRange] = useState([]);
  const filterSubmit = (e) => {
    e.preventDefault();
    applyFilter(range);
  };

  return (
    <div className=" rounded-md border-2 border-slate-500 shadow-xl bg-white  p-5 flex flex-col gap-8 overflow-auto min-w-[55vw] max-w-[98vw]">
      <div className="font-bold font-mono text-base">Choose Filters</div>
      <form onSubmit={filterSubmit} className="w-full">
        <div className="text-sm">
          <div className="flex gap-2">
            <input
              type="radio"
              name="price"
              id="1"
              onClick={(e) => setRange([0, 500])}
              className=" checked:bg-purple-800"
            />
            <label htmlFor="1">₹0 - 500</label>
          </div>
          <div className="flex gap-2 ">
            <input
              type="radio"
              name="price"
              id="2"
              onClick={(e) => setRange([501, 1000])}
            />
            <label htmlFor="2">₹501 - 1000</label>
          </div>
          <div className="flex gap-2 ">
            <input
              type="radio"
              name="price"
              id="3"
              onClick={(e) => setRange([1001, 5000])}
            />
            <label htmlFor="3">₹1001 - 5000</label>
          </div>
        </div>
        <button
          type="submit"
          className="text-sm p-1 px-2 rounded-md mt-4 bg bg-purple-600 text-white "
        >
          {" "}
          Apply Filters
        </button>
      </form>
      <button className="text-red-500" onClick={clearAllFilters}>
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterModel;
