import { useState } from "react";
import InternshipCard from "../components/InternshipCard";
import InternshipFilter from "../components/InternshipFilter";
import internshipsData from "../data/internships.json";
import { Link } from "react-router-dom";
import KIITHeader from "../assets/kiit-header.png";


const Internship = () => {
  const [activeTab, setActiveTab] = useState("recent");

  const [filters, setFilters] = useState({
    type: "",
    location: "",
    category: "",
    mode: "",
    sort: "",
  });

  // Get unique categories
  const categories = [
    ...new Set(internshipsData.map((i) => i.category)),
  ];

  // Filter logic
  const applyFilters = (data) => {
    let result = [...data];

    if (filters.type)
      result = result.filter((i) => i.type === filters.type);

    if (filters.location)
      result = result.filter((i) => i.location === filters.location);

    if (filters.category)
      result = result.filter((i) => i.category === filters.category);

    if (filters.mode)
      result = result.filter((i) => i.mode === filters.mode);

    // Sorting
    if (filters.sort === "stipend-high") {
      result.sort((a, b) => b.stipendAmount - a.stipendAmount);
    }
    if (filters.sort === "stipend-low") {
      result.sort((a, b) => a.stipendAmount - b.stipendAmount);
    }
    if (filters.sort === "latest") {
      result.sort(
        (a, b) => new Date(b.postedOn) - new Date(a.postedOn)
      );
    }

    return result;
  };

  const recentInternships = internshipsData.filter((i) => i.isRecent);

  const displayedData =
    activeTab === "recent"
      ? applyFilters(recentInternships)
      : applyFilters(internshipsData);

  return (
    <div className="min-h-screen flex flex-col bg-[#f4fbf7]">

      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between">
        <img src={KIITHeader} alt="KIIT" className="h-12" />
        <div className="flex gap-1">
          <Link to="/dashboard" className="bg-[#1FAA59] text-white px-5 py-2 rounded-l-full">Home</Link>
          <Link to="/dashboard/internships" className="bg-[#1FAA59] text-white px-5 py-2">Internships</Link>
          <Link to="/dashboard/jobs" className="bg-[#1FAA59] text-white px-5 py-2 rounded-r-full">Jobs</Link>
        </div>
      </nav>

      <main className="flex-grow px-4 py-10">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-3xl font-bold text-green-800 text-center mb-6">
            Internship Opportunities
          </h1>

          {/* ===== TABS ===== */}
<div className="flex justify-center mb-10">
  <div className="flex bg-white shadow-md rounded-full p-1 border border-green-200">

    <button
      onClick={() => setActiveTab("recent")}
      className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200
        ${
          activeTab === "recent"
            ? "bg-[#006838] text-white shadow"
            : "text-[#006838] hover:bg-green-100"
        }`}
    >
      Latest Internships
    </button>

    <button
      onClick={() => setActiveTab("all")}
      className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200
        ${
          activeTab === "all"
            ? "bg-[#006838] text-white shadow"
            : "text-[#006838] hover:bg-green-100"
        }`}
    >
      All Internships
    </button>

  </div>
</div>


          <InternshipFilter
              filters={filters}
              setFilters={setFilters}
/>


          {/* Cards */}
          {displayedData.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              No internships found for selected filters.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayedData.map((item) => (
                <InternshipCard key={item.id} internship={item} />
              ))}
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#006838] text-white px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between text-sm">
          <span>© {new Date().getFullYear()} KIIT RecruitZone</span>
          <span className="text-gray-300">Training & Placement Cell</span>
        </div>
      </footer>

    </div>
  );
};

export default Internship;
