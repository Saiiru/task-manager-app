// src/application/contexts/TaskContext.tsx
import { createContext, useContext, useState } from 'react';
import { Task, CreateTaskDTO, UpdateTaskDTO } from '@/domain/entities/Task';
import { ITaskRepository } from '@/application/ports/TaskRepository';

interface TaskContextData {
  tasks: Task[];
  createTask: (task: CreateTaskDTO) => Promise<void>;
  updateTask: (task: UpdateTaskDTO) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);

export function TaskProvider({
  children,
  repository,
}: {
  children: React.ReactNode;
  repository: ITaskRepository;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);

  async function createTask(task: CreateTaskDTO) {
    const newTask = await repository.createTask(task);
    setTasks((prev) => [...prev, newTask]);
  }

  async function updateTask(task: UpdateTaskDTO) {
    const updatedTask = await repository.updateTask(task);
    setTasks((prev) => prev.map((t) => (t.id === task.id ? updatedTask : t)));
  }

  async function deleteTask(id: string) {
    await repository.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTask = () => useContext(TaskContext);
