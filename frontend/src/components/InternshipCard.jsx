import { Heart, MapPin, IndianRupee } from "lucide-react";
import { useEffect, useState } from "react";

const InternshipCard = ({ internship }) => {
  const [isSaved, setIsSaved] = useState(false);

  // Load saved state
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedInternships")) || [];
    setIsSaved(saved.includes(internship.id));
  }, [internship.id]);

  // Toggle bookmark
  const toggleBookmark = () => {
    const saved = JSON.parse(localStorage.getItem("savedInternships")) || [];

    let updated;
    if (saved.includes(internship.id)) {
      updated = saved.filter((id) => id !== internship.id);
    } else {
      updated = [...saved, internship.id];
    }

    localStorage.setItem("savedInternships", JSON.stringify(updated));
    setIsSaved(!isSaved);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-green-600 transition p-6 flex flex-col gap-4">

      {/* Top Section */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <img
            src={internship.logo}
            alt={internship.company}
            className="w-10 h-10 rounded-lg object-contain"
          />
          <div>
            <p className="text-sm text-gray-500">{internship.company}</p>
            <h2 className="text-lg font-semibold text-gray-900">
              {internship.role}
            </h2>
          </div>
        </div>

        <button
          onClick={toggleBookmark}
          className="transition"
        >
          <Heart
            size={20}
            className={
              isSaved
                ? "fill-green-600 text-green-600"
                : "text-gray-400 hover:text-green-600"
            }
          />
        </button>
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-3 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          <MapPin size={15} /> {internship.location}
        </span>
        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
          {internship.ctc}
        </span>
      </div>

      {/* Salary */}
      <div className="flex items-center gap-2 text-gray-800 font-medium">
        <IndianRupee size={18} />
        {internship.stipend} / month
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {internship.skills.slice(0, 3).map((skill, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
        {internship.skills.length > 3 && (
          <span className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full cursor-pointer">
            +{internship.skills.length - 3} more
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 line-clamp-2">
        {internship.description}
      </p>

      {/* Apply Button */}
      <button className="mt-3 w-full bg-green-700 hover:bg-green-800 text-white py-2.5 rounded-xl font-medium transition flex  items-center justify-center gap-2">
        Apply Now →
      </button>
    </div>
  );
};

export default InternshipCard;
