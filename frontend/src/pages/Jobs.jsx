import React, { useState } from "react";
import { Link } from "react-router-dom";
import KIITHeader from "../assets/kiit-header.png";
import jobs from "../data/jobs.json";
import JobCard from "../components/JobCard";
import FilterBar from "../components/FilterBar";

const Jobs = () => {
  const [tab, setTab] = useState("latest");

  const sortedJobs = [...jobs].sort(
    (a, b) => new Date(b.postedDate) - new Date(a.postedDate)
  );

  const latestJobs = sortedJobs.slice(0, 3);
  const displayJobs = tab === "latest" ? latestJobs : sortedJobs;

  const [filters, setFilters] = useState({
  type: "",
  location: "",
  category: "",
  sort: ""
});


  const [bookmarked, setBookmarked] = useState([]);

const toggleBookmark = (id) => {
  setBookmarked((prev) =>
    prev.includes(id)
      ? prev.filter((item) => item !== id)
      : [...prev, id]
  );
};

  return (
    <div className="min-h-screen flex flex-col bg-[#f4fbf7]">
      
      {/* ===== NAVBAR (same as dashboard) ===== */}
     <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
             {/* Left side - KIIT Header Image */}
             <div className="flex items-center">
               <img 
                 src={KIITHeader} 
                 alt="KIIT - Kalinga Institute of Industrial Technology" 
                 className="h-12 object-contain"
               />
             </div>
     
             {/* Right side - Nav Links */}
             <div className="flex items-center gap-1">
               <Link 
                 to="/dashboard" 
                 className="bg-[#1FAA59] text-white px-5 py-2 rounded-l-full font-medium hover:bg-[#178f4a] transition"
               >
                 Home
               </Link>
               <Link 
                 to="/dashboard/internships" 
                 className="bg-[#1FAA59] text-white px-5 py-2 font-medium hover:bg-[#178f4a] transition"
               >
                 Internships
               </Link>
               <Link 
                 to="/dashboard/jobs" 
                 className="bg-[#1FAA59] text-white px-5 py-2 rounded-r-full font-medium hover:bg-[#178f4a] transition"
               >
                 Jobs
               </Link>
             </div>
           </nav>

      {/* ===== PAGE HEADER ===== */}
      <section className="text-center py-10">
        <h1 className="text-3xl font-bold text-[#006838]">
          Job Opportunities
        </h1>
        <p className="text-gray-600 mt-2">
          Training & Placement Cell – KIIT University
        </p>
      </section>

      {/* ===== TABS ===== */}
<div className="flex justify-center mb-10">
  <div className="flex bg-white shadow-md rounded-full p-1 border border-green-200">
    
    <button
      onClick={() => setTab("latest")}
      className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200
        ${
          tab === "latest"
            ? "bg-[#006838] text-white shadow"
            : "text-[#006838] hover:bg-green-100"
        }`}
    >
      Latest Jobs
    </button>

    <button
      onClick={() => setTab("all")}
      className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200
        ${
          tab === "all"
            ? "bg-[#006838] text-white shadow"
            : "text-[#006838] hover:bg-green-100"
        }`}
    >
      All Jobs
    </button>

  </div>
</div>

 {/* Filters */}
  <div className="px-6 pt-6">
    <FilterBar filters={filters} setFilters={setFilters} />

  </div>


      {/* ===== JOB CARDS ===== */}
<div className="px-6 pb-14 space-y-6">
  {displayJobs.map((job) => (
    <JobCard
      key={job.id}
      job={job}
      isBookmarked={bookmarked.includes(job.id)}
      onBookmark={toggleBookmark}
    />
  ))}
</div>


      {/* ===== FOOTER (same as dashboard) ===== */}
      <footer className="bg-[#006838] text-white px-6 py-2 mt-auto">
        <div className="flex flex-col md:flex-row items-center justify-between text-sm gap-2">
          <span>
            © {new Date().getFullYear()} KIIT RecruitZone. All rights reserved.
          </span>
          <span className="text-gray-300">
            Training & Placement Cell
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Jobs;
