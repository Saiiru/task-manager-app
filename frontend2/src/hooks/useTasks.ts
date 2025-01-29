"use client";
import { useState, useEffect } from "react";
import { TaskModel } from "@/models/TaskModel";
import taskService from "@/domain/services/TaskService";
import { useApollo } from "@/infrastructure/graphql/apollo-client";

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageInfo, setPageInfo] = useState({
    hasNextPage: false,
    hasPreviousPage: false,
    totalCount: 0,
  });
  const apolloClient = useApollo(null);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const { tasks, pageInfo } = await taskService.getTasks({
        search,
        page,
        limit: 10,
      });
      setTasks(tasks);
      setPageInfo(pageInfo);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [apolloClient, search, page]);

  const addTask = async (task: TaskModel) => {
    try {
      const newTask = await taskService.createTask(task);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const editTask = async (taskId: string, updatedTask: Partial<TaskModel>) => {
    try {
      const updated = await taskService.updateTask(updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updated : task))
      );
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const removeTask = async (taskId: string) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    editTask,
    removeTask,
    search,
    setSearch,
    page,
    setPage,
    pageInfo,
  };
};
