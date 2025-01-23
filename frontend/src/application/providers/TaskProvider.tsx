import { createContext, useContext, useState, useEffect } from 'react';
import { TaskUseCases } from '../use-cases/TaskUseCases';
import {
  TaskViewModel,
  mapToViewModel,
} from '@/presentation/view-models/TaskViewModel';

interface TaskContextType {
  tasks: TaskViewModel[];
  isLoading: boolean;
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
    onPageChange: (page: number) => void;
  };
  searchTasks: (query: string) => void;
}

export const TaskContext = createContext<TaskContextType>(
  {} as TaskContextType,
);

export function TaskProvider({
  children,
  taskUseCases,
}: {
  children: React.ReactNode;
  taskUseCases: TaskUseCases;
}) {
  const [tasks, setTasks] = useState<TaskViewModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    loadTasks();
  }, [page]);

  async function loadTasks() {
    try {
      setIsLoading(true);
      const tasks = await taskUseCases.getPaginatedTasks(page, limit);
      setTasks(tasks.map(mapToViewModel));
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(tasks.length / limit),
          limit,
          onPageChange: setPage,
        },
        searchTasks: async (query) => {
          setIsLoading(true);
          const tasks = await taskUseCases.searchTasks(query);
          setTasks(tasks.map(mapToViewModel));
          setIsLoading(false);
        },
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
