import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // backend URL
});

// Fetch all tasks
export const getTasks = () => API.get("/tasks");

// Add a new task
export const addTask = (taskText) => API.post("/tasks", { text: taskText });

// Update a task
export const updateTask = (id, updates) => API.put(`/tasks/${id}`, updates);

// Delete a task
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
