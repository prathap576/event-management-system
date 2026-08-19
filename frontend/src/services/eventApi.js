import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// GET all events
export const getAllEvents = async () => {
  const response = await api.get("/events");
  return response.data;
};

// GET event by ID
export const getEventById = async (id) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};

// CREATE event
export const createEvent = async (eventData) => {
  const response = await api.post("/events", eventData);
  return response.data;
};

// UPDATE event
export const updateEvent = async (id, eventData) => {
  const response = await api.put(`/events/${id}`, eventData);
  return response.data;
};

// DELETE event
export const deleteEvent = async (id) => {
  const response = await api.delete(`/events/${id}`);
  return response.data;
};

export default api;