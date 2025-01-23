'use client';
import { createContext, useContext, useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TASKS_QUERY } from '@/infrastructure/graphql/queries/tasks';
import { Task } from '@/domain/entities/Task';

interface GlobalContextType {
  tasks: Task[];
  isLoading: boolean;
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
    onPageChange: (page: number) => void;
  };
  searchTasks: (name: string) => void;
}

export const GlobalContext = createContext<GlobalContextType>(
  {} as GlobalContextType,
);

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchName, setSearchName] = useState('');

  const { data, loading } = useQuery(GET_TASKS_QUERY);

  // Get all tasks
  const allTasks = data?.tasks || [];

  // Filter tasks based on search
  const filteredTasks = useMemo(() => {
    return allTasks.filter(
      (task: Task) =>
        task.title.toLowerCase().includes(searchName.toLowerCase()) ||
        task.description.toLowerCase().includes(searchName.toLowerCase()),
    );
  }, [allTasks, searchName]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredTasks.length / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  // Get current page tasks
  const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

  console.log('Total tasks:', allTasks.length);
  console.log('Filtered tasks:', filteredTasks.length);
  console.log('Current page tasks:', paginatedTasks.length);
  console.log('Current page:', page);
  console.log('Total pages:', totalPages);

  return (
    <GlobalContext.Provider
      value={{
        tasks: paginatedTasks,
        isLoading: loading,
        pagination: {
          currentPage: page,
          totalPages,
          limit,
          onPageChange: setPage,
        },
        searchTasks: (name: string) => {
          setSearchName(name);
          setPage(1); // Reset to first page when searching
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalState = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalProvider');
  }
  return context;
};
