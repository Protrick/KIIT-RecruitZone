import { Filter, ChevronDown, ArrowUpDown, X } from "lucide-react";

const FilterBar = ({ filters, setFilters }) => {
  const activeCount = Object.values(filters).filter(v => v !== "").length;

  const clearFilters = () => {
    setFilters({
      type: "",
      location: "",
      category: "",
      mode: "",
      sort: ""
    });
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-3">

        {/* Filters badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white">
          <Filter size={16} className="text-gray-600" />
          <span className="font-medium text-gray-800">Filters</span>

          {activeCount > 0 && (
            <span className="ml-1 bg-green-700 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>

        {/* Type */}
        <div className="relative">
          <select
            className="filter-pill-modern"
            value={filters.type}
            onChange={(e) =>
              setFilters({ ...filters, type: e.target.value })
            }
          >
            <option value="">Type</option>
            <option value="Internship">Internship</option>
            <option value="Part Time">Part Time</option>
            <option value="Full Time">Full Time</option>
          </select>
          <ChevronDown size={16} className="filter-icon" />
        </div>

        {/* Location */}
        <div className="relative">
          <select
            className="filter-pill-modern"
            value={filters.location}
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
          >
            <option value="">Location</option>
            <option value="Remote">Remote</option>
            <option value="On-Campus">On-Campus</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          <ChevronDown size={16} className="filter-icon" />
        </div>

        {/* Category */}
        <div className="relative">
          <select
            className="filter-pill-modern"
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <option value="">Categories</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Software Development">Software Development</option>
            <option value="Web Development">Web Development</option>
            <option value="Data Analytics">Data Analytics</option>
            <option value="Marketing">Marketing</option>
          </select>
          <ChevronDown size={16} className="filter-icon" />
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            className="filter-pill-modern"
            value={filters.sort}
            onChange={(e) =>
              setFilters({ ...filters, sort: e.target.value })
            }
          >
            <option value="">Sort By</option>
            <option value="latest">Latest</option>
            <option value="stipend-high">Stipend: High → Low</option>
            <option value="stipend-low">Stipend: Low → High</option>
          </select>
          <ArrowUpDown size={16} className="filter-icon" />
        </div>

        {/* Clear Filters */}
        {activeCount > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-4 py-2 rounded-full border border-red-400 text-red-500 hover:bg-red-50 transition font-medium"
          >
            <X size={16} />
            Clear
          </button>
        )}

      </div>
    </div>
  );
};

export default FilterBar;
