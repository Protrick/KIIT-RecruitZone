// JobPage.jsx
import React, { useState } from "react";
import "./job.css";

const companies = [
  {
    id: 1,
    name: "TCS",
    role: "Software Engineer",
    ctc: "7 LPA",
    eligibility: "CGPA ≥ 7.0",
    branches: "CSE, IT, ECE",
    date: "10 Feb 2026",
  },
  {
    id: 2,
    name: "Infosys",
    role: "System Engineer",
    ctc: "6.5 LPA",
    eligibility: "CGPA ≥ 6.5",
    branches: "CSE, IT, EEE",
    date: "18 Feb 2026",
  },
];

export default function JobPage() {
  const [saved, setSaved] = useState([]);

  const toggleSave = (id) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-green-50">
      
      {/* Page Title */}
      <section className="text-center py-10">
        <h2 className="text-3xl font-semibold text-green-700">
          Upcoming Placement Drives
        </h2>
        <p className="text-gray-600 mt-2">
          Explore companies, eligibility, and apply on time
        </p>
      </section>

      {/* Job Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 pb-16">
        {companies.map((c) => (
          <div key={c.id} className="job-card">
            <h3 className="company-name">{c.name}</h3>
            <p><strong>Role:</strong> {c.role}</p>
            <p><strong>CTC:</strong> {c.ctc}</p>
            <p><strong>Eligibility:</strong> {c.eligibility}</p>
            <p><strong>Branches:</strong> {c.branches}</p>
            <p className="text-sm text-gray-500">Drive Date: {c.date}</p>

            <div className="flex justify-between mt-4">
              <button className="apply-btn">View Details</button>
              <button
                className={`save-btn ${saved.includes(c.id) ? "saved" : ""}`}
                onClick={() => toggleSave(c.id)}
              >
                {saved.includes(c.id) ? "Saved" : "Bookmark"}
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

