import React from "react";
import { Link } from "react-router-dom";
import KIITHeader from "../assets/kiit-header.png";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 md:py-7 py:3 flex items-center justify-between">
        {/* Left side - KIIT Header Image */}
        <div className="flex items-center">
          <img 
            src={KIITHeader} 
            alt="KIIT - Kalinga Institute of Industrial Technology" 
            className="h-15 object-contain"
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

      {/* Main Content - Blank White */}
      <main className="p-6">
        {/* Content will go here */}
      </main>
    </div>
  );
};

export default Dashboard;
