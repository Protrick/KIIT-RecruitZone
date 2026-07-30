import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import api from "../api/axios";

const CompanyFormModal = ({ open, onClose, mode, company, onSuccess }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    logo: "",
    roles: "",
    ctc: "",
    minCGPA: "",
    allowedBranches: "",
    driveDate: "",
    deadline: "",
    status: "Upcoming",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && company) {
      setFormData({
        companyName: company.companyName || "",
        logo: company.logo || "",
        roles: company.roles?.join(", ") || "",
        ctc: company.ctc || "",
        minCGPA: company.eligibilityCriteria?.minCGPA || "",
        allowedBranches:
          company.eligibilityCriteria?.allowedBranches?.join(", ") || "",
        driveDate: company.driveDate ? company.driveDate.substring(0, 10) : "",
        deadline: company.deadline ? company.deadline.substring(0, 10) : "",
        status: company.status || "Upcoming",
      });
    } else {
      setFormData({
        companyName: "",
        logo: "",
        roles: "",
        ctc: "",
        minCGPA: "",
        allowedBranches: "",
        driveDate: "",
        deadline: "",
        status: "Upcoming",
      });
    }
  }, [company, mode]);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      companyName: formData.companyName,
      logo: formData.logo,
      roles: formData.roles.split(",").map((r) => r.trim()).filter(Boolean),
      ctc: Number(formData.ctc),
      eligibilityCriteria: {
        minCGPA: Number(formData.minCGPA),
        allowedBranches: formData.allowedBranches
          .split(",")
          .map((b) => b.trim())
          .filter(Boolean),
      },
      driveDate: formData.driveDate,
      deadline: formData.deadline,
      status: formData.status,
    };

    try {
      if (mode === "add") {
        await api.post("/companies", payload);
      } else {
        await api.put(`/companies/${company._id}`, payload);
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full mt-2 border border-gray-200 rounded-xl p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1FAA59]/40 focus:border-[#1FAA59] transition";
  const labelClass = "font-medium text-sm text-gray-700";

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl border border-gray-100">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-green-800">
              {mode === "add" ? "Add Company" : "Edit Company"}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Fill in the placement drive details below.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
          >
            <X className="text-gray-500" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">

          <div>
            <label className={labelClass}>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Logo URL</label>
            <input
              type="text"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Roles (comma separated)</label>
            <input
              type="text"
              name="roles"
              value={formData.roles}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>CTC (LPA)</label>
              <input
                type="number"
                name="ctc"
                value={formData.ctc}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Minimum CGPA</label>
              <input
                type="number"
                step="0.1"
                name="minCGPA"
                value={formData.minCGPA}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Allowed Branches (comma separated)</label>
            <input
              type="text"
              name="allowedBranches"
              value={formData.allowedBranches}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Drive Date</label>
              <input
                type="date"
                name="driveDate"
                value={formData.driveDate}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={inputClass}
            >
              <option>Upcoming</option>
              <option>Ongoing</option>
              <option>Closed</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-full bg-[#006838] hover:bg-[#00552e] text-white font-semibold shadow transition disabled:opacity-60"
            >
              {loading ? "Saving..." : mode === "add" ? "Add Company" : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CompanyFormModal;