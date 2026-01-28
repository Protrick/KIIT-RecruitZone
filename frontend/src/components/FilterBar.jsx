import React, { useState } from "react";

const FilterBar = ({ filters, setFilters }) => {
  const [open, setOpen] = useState(null);

  const toggle = (name) => {
    setOpen(open === name ? null : name);
  };

  const updateFilter = (name, value) => {
    setFilters({ ...filters, [name]: value });
    setOpen(null);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mb-8">
      {/* Filters Button */}
      <button className="flex items-center gap-3 px-5 py-2 border rounded-full bg-white shadow-sm hover:border-[#006838] transition">
        <span className="text-lg">⚲</span>
        <span className="font-medium">Filters</span>
        <span className="bg-blue-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
          {Object.values(filters).filter(Boolean).length}
        </span>
      </button>

      {/* TYPE */}
      <Dropdown
        label="Type"
        isOpen={open === "type"}
        onClick={() => toggle("type")}
        options={["Full Time", "Internship", "Hybrid", "Remote"]}
        onSelect={(v) => updateFilter("type", v)}
      />

      {/* LOCATION */}
      <Dropdown
        label="Location"
        isOpen={open === "location"}
        onClick={() => toggle("location")}
        options={["Bangalore", "Hyderabad", "Pune", "Chennai"]}
        onSelect={(v) => updateFilter("location", v)}
      />

      {/* CATEGORY */}
      <Dropdown
        label="Category"
        isOpen={open === "category"}
        onClick={() => toggle("category")}
        options={["IT", "Core", "Analytics", "Marketing"]}
        onSelect={(v) => updateFilter("category", v)}
      />

      {/* SORT */}
      <Dropdown
        label="Sort By"
        isOpen={open === "sort"}
        onClick={() => toggle("sort")}
        options={["Latest", "CTC High → Low", "CTC Low → High"]}
        onSelect={(v) => updateFilter("sort", v)}
        isSort
      />
    </div>
  );
};

const Dropdown = ({ label, isOpen, onClick, options, onSelect, isSort }) => {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className="
          flex items-center gap-3
          px-5 py-2
          border rounded-full
          bg-white shadow-sm
          text-sm font-medium
          hover:border-[#006838]
          hover:text-[#006838]
          transition
        "
      >
        <span>{label}</span>
        <span className="text-xl">{isSort ? "⇅" : "▾"}</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 bg-white border rounded-xl shadow-lg overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => onSelect(opt)}
              className="
                w-full text-left px-4 py-2 text-sm
                hover:bg-green-50 hover:text-[#006838]
                transition
              "
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
