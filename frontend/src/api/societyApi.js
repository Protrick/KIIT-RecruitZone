import axios from "./axios";

// 🏛 Get All Societies
export const getSocieties = async () => {
  const response = await axios.get("/societies");
  return response.data;
};

// 🎉 Get All Events
export const getEvents = async () => {
  const response = await axios.get("/events");
  return response.data;
};

// 🎯 Get Events By Society
export const getEventsBySociety = async (societyId) => {
  const response = await axios.get(`/events/society/${societyId}`);
  return response.data;
};

// 📝 Register For Event
export const registerForEvent = async (data) => {
  const response = await axios.post("/register", data);
  return response.data;
};