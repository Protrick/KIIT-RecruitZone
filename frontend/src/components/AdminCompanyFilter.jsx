import { Filter, ChevronDown, ArrowUpDown, X } from "lucide-react";

const AdminCompanyFilter = ({ filters, setFilters }) => {
  const activeCount = Object.values(filters).filter((v) => v !== "").length;

  const clearFilters = () => {
    setFilters({
      status: "",
      branch: "",
      sort: "",
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

        {/* Status */}
        <div className="relative">
          <select
            className="filter-pill-modern"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">Status</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Closed">Closed</option>
          </select>
          <ChevronDown size={16} className="filter-icon" />
        </div>

        {/* Branch */}
        <div className="relative">
          <select
            className="filter-pill-modern"
            value={filters.branch}
            onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
          >
            <option value="">Branch</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option>
          </select>
          <ChevronDown size={16} className="filter-icon" />
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            className="filter-pill-modern"
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          >
            <option value="">Sort By</option>
            <option value="ctc-high">CTC: High → Low</option>
            <option value="ctc-low">CTC: Low → High</option>
            <option value="deadline">Deadline: Soonest</option>
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

export default AdminCompanyFilter;