import React from "react";

const SocietyCard = ({ event, onMoreDetails }) => {
  return (
    <div className="group flex flex-col bg-white/95 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-[0_25px_60px_-15px_rgba(31,170,89,0.4)] transition-all duration-500 overflow-hidden border border-white/30">

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute top-4 right-4 bg-[#1FAA59]/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {event.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">

        {/* Society Logo + Name */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
            <img
              src={event.logo}
              alt={event.societyName}
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
            {event.societyName}
          </p>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-2">
          {event.title}
        </h3>

        <p className="text-gray-500 text-sm mb-5 line-clamp-2">
          {event.description}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-auto">
          <button
            onClick={() => onMoreDetails(event)}
            className="flex-1 border border-[#1FAA59] text-[#1FAA59] py-2 rounded-xl font-medium hover:bg-[#1FAA59] hover:text-white transition-all"
          >
            More Details
          </button>

          <button className="flex-1 bg-gradient-to-r from-[#1FAA59] to-[#178f4a] text-white py-2 rounded-xl font-medium shadow-lg shadow-[#1FAA59]/25 hover:opacity-90 transition-all">
            Register Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default SocietyCard;