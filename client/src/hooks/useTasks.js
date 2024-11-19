import { useCallback, useEffect, useState } from "react";
import * as tasksApi from "../api/tasks";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await tasksApi.fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (taskData) => {
    try {
      await tasksApi.createTask(taskData);
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTaskStatus = async (taskId) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      await tasksApi.updateTask(taskId, { completed: !task.completed });
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const removeTask = async (taskId) => {
    try {
      await tasksApi.deleteTask(taskId);
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    toggleTaskStatus,
    removeTask,
  };
};
