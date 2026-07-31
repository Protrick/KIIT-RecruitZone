import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import KIITHeader from "../assets/kiit-header.png";
import api from "../api/axios";
import { getJobById } from "../api/jobsApi";
import { getInternshipById } from "../api/internshipsApi";

const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_RESUME_SIZE_MB = 5;

// Best-effort read of whatever AuthPage stored — handles both a raw user
// object and a full { success, token, data: {...} } API response shape.
const getStoredProfile = () => {
  try {
    const stored = JSON.parse(localStorage.getItem("user") || "{}");
    return stored?.data || stored || {};
  } catch {
    return {};
  }
};

const Apply = () => {
  const { driveType, driveId } = useParams(); // "Job" | "Internship", and the Mongo _id
  const profile = getStoredProfile();

  const [drive, setDrive] = useState(null);
  const [driveLoading, setDriveLoading] = useState(true);
  const [driveError, setDriveError] = useState(null);

  const [form, setForm] = useState({
    fullName: profile.name || "",
    rollNumber: "",
    email: profile.email || "",
    class10Marks: "",
    class12Marks: "",
    collegeName: "Kalinga Institute of Industrial Technology (KIIT)",
    passingBatch: "",
    coverNote: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Load the job/internship being applied to, just so the page can
  // confirm to the student what they're applying for.
  useEffect(() => {
    const fetchDrive = async () => {
      try {
        setDriveLoading(true);
        setDriveError(null);
        const data =
          driveType === "Internship"
            ? await getInternshipById(driveId)
            : await getJobById(driveId);
        setDrive(data);
      } catch (err) {
        console.error("Failed to fetch drive details:", err);
        setDriveError("Couldn't load this opportunity's details.");
      } finally {
        setDriveLoading(false);
      }
    };

    if (driveId && driveType) fetchDrive();
  }, [driveType, driveId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError("");
    setResumeFile(null);

    if (!file) return;

    if (!ALLOWED_RESUME_TYPES.includes(file.type)) {
      setFileError("Only PDF, DOC, or DOCX files are allowed.");
      return;
    }

    if (file.size > MAX_RESUME_SIZE_MB * 1024 * 1024) {
      setFileError(`File is too large. Max size is ${MAX_RESUME_SIZE_MB}MB.`);
      return;
    }

    setResumeFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!resumeFile) {
      setFileError("Resume is required.");
      return;
    }

    const marks10 = Number(form.class10Marks);
    const marks12 = Number(form.class12Marks);
    const batch = Number(form.passingBatch);

    if (
      !form.fullName.trim() ||
      !form.rollNumber.trim() ||
      !form.email.trim() ||
      !form.collegeName.trim() ||
      Number.isNaN(marks10) ||
      Number.isNaN(marks12) ||
      Number.isNaN(batch)
    ) {
      setSubmitError("Please fill in all required fields correctly.");
      return;
    }

    const payload = new FormData();
    payload.append("driveType", driveType);
    payload.append("drive", driveId);
    payload.append("fullName", form.fullName);
    payload.append("rollNumber", form.rollNumber);
    payload.append("email", form.email);
    payload.append("class10Marks", marks10);
    payload.append("class12Marks", marks12);
    payload.append("collegeName", form.collegeName);
    payload.append("passingBatch", batch);
    payload.append("coverNote", form.coverNote);
    payload.append("resume", resumeFile);

    try {
      setSubmitting(true);
      await api.post("/applications", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSubmitted(true);
    } catch (err) {
      const message = err.response?.data?.message;
      if (err.response?.status === 401) {
        setSubmitError("Your session has expired. Please log in again.");
      } else if (err.response?.status === 409) {
        setSubmitError("You've already applied to this opportunity.");
      } else {
        setSubmitError(message || "Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4fbf7]">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={KIITHeader}
            alt="KIIT - Kalinga Institute of Industrial Technology"
            className="h-12 object-contain"
          />
        </div>

        <div className="flex items-center gap-6">
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
        </div>
      </nav>

      {/* ===== FORM ===== */}
      <main className="flex-grow px-4 py-10">
        <div className="max-w-2xl mx-auto">
          {/* Drive summary strip */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-[#006838]">Application Form</h1>
            {driveLoading ? (
              <p className="text-gray-500 mt-2">Loading opportunity details...</p>
            ) : driveError ? (
              <p className="text-red-500 mt-2">{driveError}</p>
            ) : drive ? (
              <p className="text-gray-600 mt-2">
                Applying for <span className="font-semibold text-gray-800">{drive.role}</span> at{" "}
                <span className="font-semibold text-gray-800">{drive.company}</span>
              </p>
            ) : null}
          </div>

          {submitted ? (
            <div className="bg-white rounded-2xl border border-green-200 shadow-sm p-8 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[#1FAA59]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Application submitted</h2>
              <p className="text-gray-600 mb-6">
                Your application has been received. You can track its status from your dashboard.
              </p>
              <Link
                to="/dashboard"
                className="inline-block bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-xl font-medium transition"
              >
                Back to Dashboard
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 flex flex-col gap-5"
            >
              {/* ===== Personal Details ===== */}
              <div>
                <h2 className="text-sm font-semibold text-[#006838] uppercase tracking-wide mb-3">
                  Personal Details
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                      placeholder="As per college records"
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Roll Number</label>
                    <input
                      type="text"
                      name="rollNumber"
                      value={form.rollNumber}
                      onChange={handleChange}
                      required
                      placeholder="e.g. 21051234"
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>

                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@kiit.ac.in"
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>
                </div>
              </div>

              {/* ===== Academic Details (for eligibility verification) ===== */}
              <div>
                <h2 className="text-sm font-semibold text-[#006838] uppercase tracking-wide mb-3">
                  Academic Details (for eligibility verification)
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Class 10 Marks (%)</label>
                    <input
                      type="number"
                      name="class10Marks"
                      value={form.class10Marks}
                      onChange={handleChange}
                      required
                      min="0"
                      max="100"
                      step="0.01"
                      placeholder="e.g. 92.4"
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Class 12 Marks (%)</label>
                    <input
                      type="number"
                      name="class12Marks"
                      value={form.class12Marks}
                      onChange={handleChange}
                      required
                      min="0"
                      max="100"
                      step="0.01"
                      placeholder="e.g. 89.6"
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>

                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <label className="text-sm font-medium text-gray-700">College Name</label>
                    <input
                      type="text"
                      name="collegeName"
                      value={form.collegeName}
                      onChange={handleChange}
                      required
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Passing Batch (Year)</label>
                    <input
                      type="number"
                      name="passingBatch"
                      value={form.passingBatch}
                      onChange={handleChange}
                      required
                      min="2000"
                      max="2100"
                      placeholder="e.g. 2027"
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>
                </div>
              </div>

              {/* ===== Resume ===== */}
              <div>
                <h2 className="text-sm font-semibold text-[#006838] uppercase tracking-wide mb-3">
                  Resume
                </h2>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-100 file:text-green-700 file:font-medium hover:file:bg-green-200"
                />
                <p className="text-xs text-gray-500 mt-1">PDF, DOC, or DOCX. Max {MAX_RESUME_SIZE_MB}MB.</p>
                {fileError && <p className="text-sm text-red-500 mt-1">{fileError}</p>}
                {resumeFile && !fileError && (
                  <p className="text-sm text-green-700 mt-1">Selected: {resumeFile.name}</p>
                )}
              </div>

              {/* ===== Optional cover note ===== */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Cover Note <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  name="coverNote"
                  value={form.coverNote}
                  onChange={handleChange}
                  rows={3}
                  maxLength={1000}
                  placeholder="Anything you'd like the recruiter to know"
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
                />
              </div>

              {submitError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 w-full bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white py-2.5 rounded-xl font-medium transition"
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mx-2 mb-2 rounded-b-3xl bg-[#111827] text-white px-8 py-6">
        <div className="flex items-center gap-4 mb-5">
          <div className="h-1 w-12 bg-gradient-to-r from-[#1FAA59] to-[#006838] rounded-full" />
          <span className="text-[#1FAA59] font-semibold text-sm uppercase tracking-wider">KIIT RecruitZone</span>
          <div className="h-px flex-1 bg-gray-700/50" />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1FAA59]/20 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#1FAA59]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <span className="text-sm text-gray-400">© {new Date().getFullYear()} KIIT RecruitZone</span>
              <p className="text-xs text-gray-500">All rights reserved.</p>
            </div>
          </div>

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

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 hidden md:block">Training & Placement Cell</span>
            <div className="flex gap-2">
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-[#1FAA59] rounded-xl flex items-center justify-center transition-all duration-300 group">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-[#1FAA59] rounded-xl flex items-center justify-center transition-all duration-300 group">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-[#1FAA59] rounded-xl flex items-center justify-center transition-all duration-300 group">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Apply;