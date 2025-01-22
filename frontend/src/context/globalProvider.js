"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "@/services/taskService"; // Importar as funções GraphQL
import themes from "@/context/themes";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext"; // Importar useAuth

const GlobalStateContext = createContext(undefined);

export const GlobalProvider = ({ children }) => {
  const { token } = useAuth(); // Usar useAuth para obter o token
  console.log("token", token);
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const theme = themes[selectedTheme];

  const openModal = (taskId) => {
    setCurrentTask(taskId);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setCurrentTask(null);
  };

  const collapseMenu = () => {
    setCollapsed(!collapsed);
  };

  const allTasks = async () => {
    setIsLoading(true);
    try {
      const tasks = await fetchTasks(searchTerm, page, limit);
      const sorted = tasks.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
      setTasks(sorted);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch tasks");
    }
  };

  const handleCreateTask = async (task) => {
    try {
      await createTask(task);
      toast.success("Task created");
      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleUpdateTask = async (task) => {
    try {
      await updateTask(task);
      toast.success("Task updated");
      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      toast.success("Task deleted");
      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const importantTasks = tasks.filter((task) => task.isImportant === true);
  const incompleteTasks = tasks.filter((task) => task.isCompleted === false);

  useEffect(() => {
    if (token) allTasks(); // Buscar tarefas apenas se o token estiver presente
  }, [token, searchTerm, page]);

  return (
    <GlobalStateContext.Provider
      value={{
        theme,
        tasks,
        deleteTask: handleDeleteTask,
        isLoading,
        completedTasks,
        importantTasks,
        incompleteTasks,
        updateTask: handleUpdateTask,
        createTask: handleCreateTask,
        modal,
        openModal,
        closeModal,
        allTasks,
        collapsed,
        collapseMenu,
        currentTask,
        token,
        searchTerm,
        setSearchTerm,
        page,
        setPage,
        limit,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalProvider");
  }
  return context;
};
