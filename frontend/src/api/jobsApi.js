import api from "./axios";

// MongoDB returns `_id`, but JobCard/Jobs.jsx use `.id` (for key + bookmarking).
// Normalizing here means zero changes needed in the components themselves.
const normalizeJob = (job) => ({ ...job, id: job._id });

/**
 * Fetch all jobs. Optional filters map directly to backend query params:
 * { status, branch, batchYear, search, sort, page, limit }
 */
export const getAllJobs = async (filters = {}) => {
  const { data } = await api.get("/jobs", { params: filters });
  return data.data.map(normalizeJob);
};

export const getJobById = async (id) => {
  const { data } = await api.get(`/jobs/${id}`);
  return normalizeJob(data.data);
};