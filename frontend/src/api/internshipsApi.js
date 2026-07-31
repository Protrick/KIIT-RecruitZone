import api from "./axios";

const normalizeInternship = (internship) => ({ ...internship, id: internship._id });

/**
 * Fetch all internships. Optional filters map directly to backend query params:
 * { status, branch, batchYear, category, mode, search, sort, page, limit }
 */
export const getAllInternships = async (filters = {}) => {
  const { data } = await api.get("/internships", { params: filters });
  return data.data.map(normalizeInternship);
};

export const getInternshipById = async (id) => {
  const { data } = await api.get(`/internships/${id}`);
  return normalizeInternship(data.data);
};