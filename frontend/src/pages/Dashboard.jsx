import React from "react";
import { Link } from "react-router-dom";
import KIITHeader from "../assets/kiit-header.png";
import KIIT_BG from "../assets/KIIT-University-Bhubaneswar.jpg"

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
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

      {/* Hero Section */}
      <section 
        className="min-h-screen mx-2 mt-2 rounded-t-3xl bg-cover bg-center bg-no-repeat relative overflow-hidden" 
        style={{ backgroundImage: `url(${KIIT_BG})` }}
      >
        {/* Dark Overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a1f0d] rounded-t-3xl" />
        
        {/* Bottom Fade to blend with next section - extended height */}
        <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-[#0a1f0d] to-[#0a1f0d]/0" />
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#1FAA59]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#0a1f0d]/40 rounded-full blur-3xl" />
        
        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 py-8">
          
          {/* Welcome Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
              Welcome to <span className="text-[#1FAA59]">RecruitZone</span>
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto drop-shadow">
              Your gateway to exciting career opportunities. Explore internships and jobs from top recruiters.
            </p>
          </div>

          {/* Cards Container */}
          <div className="flex gap-8 md:gap-16 flex-wrap justify-center">
            
            {/* Internships Card */}
            <Link 
              to="/dashboard/internships"
              className="group relative bg-white/95 backdrop-blur-md rounded-3xl p-8 w-80 shadow-2xl hover:shadow-[0_25px_60px_-15px_rgba(31,170,89,0.4)] hover:scale-[1.02] hover:-translate-y-2 transition-all duration-500 cursor-pointer border border-white/30 overflow-hidden"
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1FAA59]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              
              {/* Badge */}
              <div className="absolute top-4 right-4 bg-[#1FAA59]/10 text-[#1FAA59] text-xs font-semibold px-3 py-1 rounded-full">
                50+ Active
              </div>
              
              <div className="relative flex flex-col items-center text-center">
                {/* Internship Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-[#1FAA59] to-[#178f4a] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-[#1FAA59]/30">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-10 h-10 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Internships</h3>
                <p className="text-gray-500 text-sm mb-5 leading-relaxed">Gain hands-on experience with top companies and kickstart your career journey</p>
                
                {/* Stats */}
                <div className="flex items-center gap-4 mb-5 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>25+ Companies</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Remote/Onsite</span>
                  </div>
                </div>
                
                {/* CTA Button */}
                <div className="w-full bg-gradient-to-r from-[#1FAA59] to-[#178f4a] text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 group-hover:gap-3 transition-all shadow-lg shadow-[#1FAA59]/25">
                  <span>Browse Internships</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Jobs Card */}
            <Link 
              to="/dashboard/jobs"
              className="group relative bg-white/95 backdrop-blur-md rounded-3xl p-8 w-80 shadow-2xl hover:shadow-[0_25px_60px_-15px_rgba(0,104,56,0.4)] hover:scale-[1.02] hover:-translate-y-2 transition-all duration-500 cursor-pointer border border-white/30 overflow-hidden"
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#006838]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              
              {/* Badge */}
              <div className="absolute top-4 right-4 bg-[#006838]/10 text-[#006838] text-xs font-semibold px-3 py-1 rounded-full">
                30+ Active
              </div>
              
              <div className="relative flex flex-col items-center text-center">
                {/* Jobs Icon - Briefcase */}
                <div className="w-20 h-20 bg-gradient-to-br from-[#006838] to-[#004d2a] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-[#006838]/30">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-10 h-10 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Jobs</h3>
                <p className="text-gray-500 text-sm mb-5 leading-relaxed">Find full-time positions and launch your professional career with leading employers</p>
                
                {/* Stats */}
                <div className="flex items-center gap-4 mb-5 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>40+ Companies</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Pan India</span>
                  </div>
                </div>
                
                {/* CTA Button */}
                <div className="w-full bg-gradient-to-r from-[#006838] to-[#004d2a] text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 group-hover:gap-3 transition-all shadow-lg shadow-[#006838]/25">
                  <span>Browse Jobs</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </Link>

          </div>
          
          {/* Bottom Stats Bar */}
          <div className="mt-10 flex items-center gap-8 md:gap-12 bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">500+</div>
              <div className="text-xs md:text-sm text-gray-300">Students Placed</div>
            </div>
            <div className="w-px h-10 bg-white/30" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">100+</div>
              <div className="text-xs md:text-sm text-gray-300">Partner Companies</div>
            </div>
            <div className="w-px h-10 bg-white/30" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#1FAA59]">₹12 LPA</div>
              <div className="text-xs md:text-sm text-gray-300">Avg. Package</div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Training & Placement Cell Section */}
      <section className="relative mx-2 bg-gradient-to-b from-[#0a1f0d] via-[#0d2912] to-[#111827] pt-10 pb-0 px-4 md:px-8 overflow-hidden"> 
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#1FAA59]/20 px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#1FAA59] rounded-full animate-pulse" />
                <span className="text-[#1FAA59] font-semibold text-sm tracking-wide uppercase">
                  Training & Placement Cell
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Empowering KIITians To Launch Their 
                <span className="text-[#1FAA59]"> Dream Careers</span>
              </h2>
              
              <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                At KIIT, placements are powered by industry-aligned training, soft skills development, 
                and consistent recruiter engagement. We prepare our students to excel in high-demand 
                sectors across the globe.
              </p>
              
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-1 bg-gradient-to-r from-[#1FAA59] to-transparent rounded-full" />
                The KIIT Advantage
              </h3>
              
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-[#1FAA59]/20 rounded-xl flex items-center justify-center group-hover:bg-[#1FAA59]/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#1FAA59]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-200">Partnering with leading global companies for career success</span>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-[#1FAA59]/20 rounded-xl flex items-center justify-center group-hover:bg-[#1FAA59]/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#1FAA59]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-200">Empowering your future with comprehensive career support</span>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-[#1FAA59]/20 rounded-xl flex items-center justify-center group-hover:bg-[#1FAA59]/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#1FAA59]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-200">Proven excellence in academics and professional outcomes</span>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-[#1FAA59]/20 rounded-xl flex items-center justify-center group-hover:bg-[#1FAA59]/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#1FAA59]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-200">Personalised guidance from experienced mentors</span>
                </li>
              </ul>
              
              <button className="group bg-gradient-to-r from-[#1FAA59] to-[#178f4a] hover:from-[#178f4a] hover:to-[#1FAA59] text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-500 hover:shadow-xl hover:shadow-[#1FAA59]/30 flex items-center gap-3">
                <span>Explore Placement Highlights</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
            
            {/* Right Content - Stats Grid */}
            <div className="grid grid-cols-2 gap-5">
              {/* Stat Card 1 - Highest Package */}
              <div className="group relative bg-gradient-to-br from-[#1FAA59] to-[#178f4a] rounded-3xl p-8 text-center text-white overflow-hidden hover:-translate-y-2 transition-all duration-500">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                <div className="relative">
                  <div className="text-5xl md:text-6xl font-bold mb-2">63</div>
                  <div className="text-2xl font-semibold mb-1">Lakhs</div>
                  <div className="text-white/70 text-sm font-medium uppercase tracking-wider">highest package</div>
                </div>
              </div>
              
              {/* Stat Card 2 - Annual Recruiters */}
              <div className="group relative bg-gradient-to-br from-[#EA580C] to-[#C2410C] rounded-3xl p-8 text-center text-white overflow-hidden hover:-translate-y-2 transition-all duration-500">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                <div className="relative">
                  <div className="text-5xl md:text-6xl font-bold mb-2">700+</div>
                  <div className="text-white/70 text-sm font-medium uppercase tracking-wider mt-4">annual recruiters</div>
                </div>
              </div>
              
              {/* Stat Card 3 - Job Offers */}
              <div className="group relative bg-gradient-to-br from-[#0284C7] to-[#0369A1] rounded-3xl p-8 text-center text-white overflow-hidden hover:-translate-y-2 transition-all duration-500">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                <div className="relative">
                  <div className="text-5xl md:text-6xl font-bold mb-2">5500+</div>
                  <div className="text-white/70 text-sm font-medium uppercase tracking-wider mt-4">job offers</div>
                </div>
              </div>
              
              {/* Stat Card 4 - Average CTC */}
              <div className="group relative bg-gradient-to-br from-[#84CC16] to-[#65A30D] rounded-3xl p-8 text-center text-white overflow-hidden hover:-translate-y-2 transition-all duration-500">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                <div className="relative">
                  <div className="text-5xl md:text-6xl font-bold mb-2">10</div>
                  <div className="text-2xl font-semibold mb-1">Lakhs</div>
                  <div className="text-white/70 text-sm font-medium uppercase tracking-wider">average ctc</div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        
        {/* Bottom padding space */}
        <div className="h-16" />
      </section>

      {/* Footer */}
      <footer className="mx-2 mb-2 rounded-b-3xl bg-[#111827] text-white px-8 py-6">
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

export default Dashboard;
