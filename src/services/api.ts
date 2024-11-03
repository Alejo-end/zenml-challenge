import axios from "axios";

const api = axios.create({
  baseURL: "https://zenml-frontend-challenge-backend.fly.dev",
});

// Fetches the root endpoint
export const fetchRoot = async () => {
  const response = await api.get("/");
  return response.data;
};

// Fetches all stacks
export const fetchStacks = async () => {
  const response = await api.get("/stacks");
  return response.data;
};

// Fetches a stack by its ID
export const fetchStackById = async (stackId: string) => {
  const response = await api.get(`/stacks/${stackId}`);
  return response.data;
};

// Fetches all components
export const fetchComponents = async () => {
  const response = await api.get("/components");
  return response.data;
};

// Fetches a component by its ID
export const fetchComponentById = async (componentId: string) => {
  const response = await api.get(`/component/${componentId}`);
  return response.data;
};
