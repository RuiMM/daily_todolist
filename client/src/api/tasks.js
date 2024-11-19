import { API_BASE_URL } from "../config";

export const fetchTasks = async () => {
  const response = await fetch(`${API_BASE_URL}/api/tasks`);
  return response.json();
};

export const createTask = async (task) => {
  const response = await fetch(`${API_BASE_URL}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const updateTask = async (taskId, updates) => {
  const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return response.json();
};

export const deleteTask = async (taskId) => {
  await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
    method: "DELETE",
  });
};
