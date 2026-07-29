import { MapPin, IndianRupee, GraduationCap, Calendar, Pencil, Trash2 } from "lucide-react";

const statusBadge = {
  Upcoming: "bg-amber-100 text-amber-700",
  Ongoing: "bg-green-100 text-green-700",
  Closed: "bg-red-100 text-red-700",
};

const AdminCompanyCard = ({ company, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-green-600 transition p-6 flex flex-col gap-4">

      {/* Top Section */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          {company.logo ? (
            <img
              src={company.logo}
              alt={company.companyName}
              className="w-10 h-10 rounded-lg object-contain"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-700 font-semibold">
              {company.companyName?.charAt(0)}
            </div>
          )}
          <div>
            <p className="text-sm text-gray-500">Placement Drive</p>
            <h2 className="text-lg font-semibold text-gray-900">
              {company.companyName}
            </h2>
          </div>
        </div>

        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            statusBadge[company.status] || "bg-gray-100 text-gray-600"
          }`}
        >
          {company.status}
        </span>
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-3 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          <GraduationCap size={15} /> Min CGPA {company.eligibilityCriteria?.minCGPA}
        </span>
        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
          {company.ctc} LPA
        </span>
      </div>

      {/* CTC line */}
      <div className="flex items-center gap-2 text-gray-800 font-medium">
        <IndianRupee size={18} />
        {company.ctc} LPA <span className="text-gray-500 font-normal">CTC</span>
      </div>

      {/* Roles */}
      <div className="flex flex-wrap gap-2">
        {company.roles?.slice(0, 3).map((role, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
          >
            {role}
          </span>
        ))}
        {company.roles?.length > 3 && (
          <span className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full cursor-pointer">
            +{company.roles.length - 3} more
          </span>
        )}
      </div>

      {/* Branches */}
      <p className="text-sm text-gray-600 line-clamp-2">
        Open to {company.eligibilityCriteria?.allowedBranches?.join(", ")}
      </p>

      {/* Dates */}
      <div className="flex flex-wrap gap-3 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Calendar size={13} /> Drive: {new Date(company.driveDate).toLocaleDateString()}
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={13} /> Deadline: {new Date(company.deadline).toLocaleDateString()}
        </span>
      </div>

      {/* Edit / Delete Buttons */}
      <div className="mt-3 flex gap-3">
        <button
          onClick={() => onEdit(company)}
          className="flex-1 bg-green-700 hover:bg-green-800 text-white py-2.5 rounded-xl font-medium transition flex items-center justify-center gap-2"
        >
          <Pencil size={16} />
          Edit
        </button>
        <button
          onClick={() => onDelete(company._id)}
          className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2.5 rounded-xl font-medium transition flex items-center justify-center gap-2"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminCompanyCard;