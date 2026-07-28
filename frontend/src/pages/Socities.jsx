import React, { useState } from "react";
import SocietyCard from "../components/SocietyCard";
import KIITHeader from "../assets/kiit-header.png";
import { Link } from "react-router-dom";
import EventModal from "../components/EventModal";
import { useEffect } from "react";
import { getEvents } from "../api/societyApi";

const Societies = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  // ✅ Disable background scroll when modal open
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedEvent]);

  const filteredEvents = events
  .filter((event) =>
    event.societyName.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => {
    if (filter === "Latest") {
      return new Date(b.date) - new Date(a.date);
    }

    if (filter === "Popular") {
      return new Date(b.date) - new Date(a.date); 
      // temporary same as latest
    }

    return 0;
  });
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen">
        {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        {/* Left side - KIIT Header Image */}
        <div className="flex items-center">
          <img 
            src={KIITHeader} 
            alt="KIIT - Kalinga Institute of Industrial Technology" 
            className="h-12 object-contain"
          />
        </div>

        {/* Right side - Nav Links + Profile Avatar */}
        <div className="flex items-center gap-6">
          {/* Nav Links */}
          <div className="flex items-center gap-1">
            <Link 
              to="/dashboard" 
              className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-gray-700 hover:bg-[#1FAA59] hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#1FAA59]/25"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <Link 
              to="/dashboard/internships" 
              className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-gray-700 hover:bg-[#1FAA59] hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#1FAA59]/25"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Internships
            </Link>
            <Link 
              to="/dashboard/jobs" 
              className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-gray-700 hover:bg-[#1FAA59] hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#1FAA59]/25"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Jobs
            </Link>
            <Link 
              to="/dashboard/societies" 
              className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-gray-700 hover:bg-[#1FAA59] hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#1FAA59]/25"
            >
              <svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-4 h-4"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={2}
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M17 20h5v-1a4 4 0 00-5-3.87M9 20H4v-1a4 4 0 015-3.87m8-2.13a4 4 0 10-8 0m8 0a4 4 0 01-8 0m8 0v1m-8-1v1m-4-7a3 3 0 116 0 3 3 0 01-6 0zm10 0a3 3 0 116 0 3 3 0 01-6 0z"
  />
</svg>
              Society
            </Link>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-gray-200" />

          {/* Profile Avatar */}
          <button className="relative group flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-gray-100 transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1FAA59] to-[#006838] flex items-center justify-center text-white font-semibold text-lg shadow-md group-hover:shadow-lg transition-shadow">
              P
            </div>
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-sm font-medium text-gray-800">Pratik</span>
              <span className="text-xs text-gray-500">Student</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="  grow">
        {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-12 mt-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
          Discover Your Campus Life
        </h1>
        <p className="text-gray-600 mb-6">
          Join over 200 student-led societies and make your university years unforgettable.
        </p>

        {/* Search Bar */}
        <div className="bg-white rounded-full shadow-lg px-6 py-3 flex items-center border border-gray-200">
          <input
            type="text"
            placeholder="Search Society Name..."
            className="w-full outline-none text-gray-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
       {/* Filter Buttons */}
      <div className="flex justify-end gap-4 mb-8 max-w-6xl mx-auto">
        {["All", "Latest", "Popular"].map((btn) => (
          <button
            key={btn}
            onClick={() => setFilter(btn)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === btn
                ? "bg-[#1FAA59] text-white shadow-lg shadow-[#1FAA59]/30"
                : "bg-white text-gray-600 hover:bg-[#1FAA59]/10"
            }`}
          >
            {btn}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filteredEvents.slice(0, visibleCount).map((event, index) => (
          <SocietyCard
            key={event._id || index}
            event={event}
            onMoreDetails={setSelectedEvent}
          />
        ))}
      </div>

     <div className="flex justify-center mt-12">
  {visibleCount < filteredEvents.length && (
    <button
      onClick={() => setVisibleCount((prev) => prev + 6)}
      className="bg-[#111827] text-white px-8 py-3 rounded-full font-medium hover:bg-[#1FAA59] transition-all"
    >
      LOAD MORE EVENTS
    </button>
  )}
</div>
      {selectedEvent && (
  <EventModal
    event={selectedEvent}
    onClose={() => setSelectedEvent(null)}
  />
)}

      </main>

      
      {/* Footer */}
      <footer className="mx-2 mb-2 rounded-b-3xl bg-[#111827] text-white px-8 py-6 mt-8">
        {/* Top Border Accent */}
        <div className="flex items-center gap-4 mb-5">
          <div className="h-1 w-12 bg-gradient-to-r from-[#1FAA59] to-[#006838] rounded-full" />
          <span className="text-[#1FAA59] font-semibold text-sm uppercase tracking-wider">KIIT RecruitZone</span>
          <div className="h-px flex-1 bg-gray-700/50" />
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left - Copyright */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1FAA59]/20 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#1FAA59]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <span className="text-sm text-gray-400">
                © {new Date().getFullYear()} KIIT RecruitZone
              </span>
              <p className="text-xs text-gray-500">All rights reserved.</p>
            </div>
          </div>

          {/* Center - Quick Links */}
          <div className="flex items-center gap-6 text-sm">
            <a href="https://kiit.ac.in" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1FAA59] transition-colors flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              KIIT Website
            </a>
            <a href="mailto:placement@kiit.ac.in" className="text-gray-400 hover:text-[#1FAA59] transition-colors flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact
            </a>
            <a href="#" className="text-gray-400 hover:text-[#1FAA59] transition-colors flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Help
            </a>
          </div>

          {/* Right - Social/Info */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 hidden md:block">Training & Placement Cell</span>
            <div className="flex gap-2">
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-[#1FAA59] rounded-xl flex items-center justify-center transition-all duration-300 group">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-[#1FAA59] rounded-xl flex items-center justify-center transition-all duration-300 group">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-[#1FAA59] rounded-xl flex items-center justify-center transition-all duration-300 group">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Societies;