// api.js

import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const getAllTasks = () => {
  return api.get("/tasks");
};

export const createTask = (newTask) => {
  return api.post("/tasks", newTask);
};

export const updateTask = (id, updatedTask) => {
  return api.put(`/tasks/${id}`, updatedTask);
};

export const deleteTask = (id) => {
  return api.delete(`/tasks/${id}`);
};

// export const deleteAllTasks = () => {
//   return api.delete("/tasks");
// };
