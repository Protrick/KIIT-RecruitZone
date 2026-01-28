import React from "react";
import { Link } from "react-router-dom";
import KIITHeader from "../assets/kiit-header.png";
import KIIT_BG from "../assets/kiit-university-banner.jpg"

const Dashboard = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
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

      {/* Main Content - Takes remaining height */}
      <main 
        className="flex-1 m-2 rounded-3xl bg-cover bg-center bg-no-repeat flex items-center justify-center" 
        style={{ backgroundImage: `url(${KIIT_BG})` }}
      >
        {/* Cards Container */}
        <div className="flex gap-40 flex-wrap justify-center px-4">
          
          {/* Internships Card */}
          <Link 
            to="/dashboard/internships"
            className="group bg-white/90 backdrop-blur-sm rounded-2xl p-8 w-72 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-white/20"
          >
            <div className="flex flex-col items-center text-center">
              {/* Internship Icon - Laptop with person */}
              <div className="w-24 h-24 bg-gradient-to-br from-[#1FAA59] to-[#178f4a] rounded-full flex items-center justify-center mb-5 group-hover:rotate-6 transition-transform duration-300">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-12 h-12 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 6v12a2 2 0 002 2h12a2 2 0 002-2V6M4 6l1-2h14l1 2M9 10h6M9 14h4" />
                  <circle cx="12" cy="4" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Internships</h3>
              <p className="text-gray-600 text-sm mb-4">Discover exciting internship opportunities from top companies</p>
              <div className="flex items-center gap-2 text-[#1FAA59] font-semibold group-hover:gap-3 transition-all">
                <span>Explore</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Jobs Card */}
          <Link 
            to="/dashboard/jobs"
            className="group bg-white/90 backdrop-blur-sm rounded-2xl p-8 w-72 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-white/20"
          >
            <div className="flex flex-col items-center text-center">
              {/* Jobs Icon - Briefcase */}
              <div className="w-24 h-24 bg-gradient-to-br from-[#006838] to-[#004d2a] rounded-full flex items-center justify-center mb-5 group-hover:rotate-6 transition-transform duration-300">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-12 h-12 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v4M2 12h20" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Jobs</h3>
              <p className="text-gray-600 text-sm mb-4">Find full-time job opportunities and kickstart your career</p>
              <div className="flex items-center gap-2 text-[#006838] font-semibold group-hover:gap-3 transition-all">
                <span>Explore</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </Link>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#006838] text-white px-6 py-1">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Left - Copyright */}
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-sm">
              © {new Date().getFullYear()} KIIT RecruitZone. All rights reserved.
            </span>
          </div>

          {/* Center - Quick Links */}
          <div className="flex items-center gap-6 text-sm">
            <a href="https://kiit.ac.in" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              KIIT Website
            </a>
            <a href="mailto:placement@kiit.ac.in" className="hover:text-gray-300 transition flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact
            </a>
          </div>

          {/* Right - Social/Info */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-300">Training & Placement Cell</span>
            <div className="flex gap-2">
              <a href="#" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
