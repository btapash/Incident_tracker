import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api"
});

export const fetchIncidents = (params) =>
  API.get("/incidents", { params });

export const getIncident = (id) =>
  API.get(`/incidents/${id}`);

export const createIncident = (data) =>
  API.post("/incidents", data);

export const updateIncident = (id, data) =>
  API.patch(`/incidents/${id}`, data);
