import { useState, useEffect } from "react";
import TaskService from "@/domain/services/TaskService";
import { Task } from "@/domain/entities/Task";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const tasks = await TaskService.getTasks({});
      setTasks(tasks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async (task: Task) => {
    try {
      const newTask = await TaskService.createTask(task);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateTask = async (task: Task) => {
    try {
      const updatedTask = await TaskService.updateTask(task);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await TaskService.deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
  };
};
