import React from "react";

const JobCard = ({ job, isBookmarked, onBookmark }) => {
  return (
    <div
      className="
        bg-white rounded-2xl p-6
        border border-gray-200
        shadow-md
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:scale-[1.02]
        hover:shadow-xl
        hover:border-[#006838]
        hover:bg-[#f9fffb]
        flex justify-between gap-6
      "
    >
      {/* ===== LEFT SECTION ===== */}
      <div className="flex-1">
        {/* Job Role */}
        <h3 className="text-xl font-semibold text-gray-900">
          {job.role}
        </h3>

        {/* Company Name */}
        <p className="text-sm text-gray-600 mt-1">
          {job.company}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-3">
          <span className="flex items-center gap-1">🧑‍💼 {job.experience}</span>
          <span className="flex items-center gap-1">⏰ {job.type}</span>
          <span className="flex items-center gap-1">📍 {job.location}</span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-3">
          {job.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 3 && (
            <span className="text-xs text-gray-500">
              +{job.skills.length - 3}
            </span>
          )}
        </div>

        {/* Footer Info */}
        <div className="flex items-center gap-4 mt-4 text-sm">
          <span className="text-blue-600">
            Posted {job.postedDate}
          </span>
          <span className="flex items-center gap-1 text-gray-500">
            ⏳ {job.daysLeft} days left
          </span>
        </div>
      </div>

      {/* ===== RIGHT SECTION ===== */}
      <div className="flex flex-col items-end justify-between">
        {/* Company Logo */}
        <div className="w-14 h-14 border rounded-xl flex items-center justify-center bg-white">
          <img
            src={job.logo}
            alt={job.company}
            className="w-10 h-10 object-contain"
          />
        </div>

        {/* Salary */}
        <div className="mt-4 bg-green-50 text-[#006838] px-4 py-1 rounded-full text-sm font-semibold border border-green-200">
          ₹ {job.ctc}
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-4 text-gray-500 text-xl">
          {/* Share */}
          <button className="hover:text-[#006838] transition">
            🔗
          </button>

          {/* Bookmark */}
          <button
            onClick={() => onBookmark(job.id)}
            className={`transition ${
              isBookmarked
                ? "text-[#006838]"
                : "hover:text-[#006838]"
            }`}
          >
            {isBookmarked ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
