import React, { createContext, useState, useContext, useEffect } from "react";
import { useTasks } from "@/hooks/useTasks";
import toast from "react-hot-toast";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { tasks, loading, refetchTasks, createTask, updateTask, deleteTask } =
    useTasks();
  const [modal, setModal] = useState(false);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const handleCreateTask = async (task) => {
    try {
      await createTask(task);
      toast.success("Task created successfully");
      refetchTasks();
      closeModal();
    } catch (error) {
      toast.error("Error creating task");
    }
  };

  const handleUpdateTask = async (task) => {
    try {
      await updateTask(task);
      toast.success("Task updated successfully");
      refetchTasks();
    } catch (error) {
      toast.error("Error updating task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      toast.success("Task deleted successfully");
      refetchTasks();
    } catch (error) {
      toast.error("Error deleting task");
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        modal,
        isLoading: loading,
        openModal,
        closeModal,
        handleCreateTask,
        handleUpdateTask,
        handleDeleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);

export default TaskProvider;
