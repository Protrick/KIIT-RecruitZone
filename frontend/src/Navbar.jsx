import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#1FAA59] text-white p-4 flex justify-between shadow-md">
      <div className="font-bold text-xl">KIIT RecruitZone</div>
      <div className="space-x-6 font-medium">
        <Link to="/" className="hover:text-gray-200 transition">Home</Link>
        <Link to="/companies" className="hover:text-gray-200 transition">Companies</Link>
        <Link to="/events" className="hover:text-gray-200 transition">Events</Link>
        <Link to="/admin" className="hover:text-gray-200 transition">Admin</Link>
        <Link to="/jobs" className="hover:text-gray-200 transition">Jobs</Link>
      </div>
    </nav>
  );
};

export default Navbar;
