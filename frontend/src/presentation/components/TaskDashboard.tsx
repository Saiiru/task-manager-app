import React, { useState } from "react";
import TaskCard from "./TaskCard";

interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TaskDashboardProps {
  tasks: Task[];
  handleUpdateTask: (task: { id: string; isCompleted: boolean }) => void;
  handleDeleteTask: (id: string) => void;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  onPageChange: (direction: "next" | "prev") => void;
  onTasksPerPageChange: (tasksPerPage: number) => void;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const TaskDashboard: React.FC<TaskDashboardProps> = ({
  tasks,
  handleUpdateTask,
  handleDeleteTask,
  pageInfo,
  onPageChange,
  onTasksPerPageChange,
  setSearchTerm,
}) => {
  const [tasksPerPage, setTasksPerPageState] = useState(10);

  const handleTasksPerPageChange = (e) => {
    const value = Number(e.target.value);
    setTasksPerPageState(value);
    onTasksPerPageChange(value);
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search tasks by title"
          className="w-full p-2 mb-4 border rounded-lg bg-gray-800 text-white"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            isCompleted={task.isCompleted}
            createdAt={task.createdAt}
            updatedAt={task.updatedAt}
            handleUpdateTask={handleUpdateTask}
            handleDeleteTask={handleDeleteTask}
          />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => onPageChange("prev")}
          disabled={!pageInfo?.hasPreviousPage}
          className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange("next")}
          disabled={!pageInfo?.hasNextPage}
          className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <div className="flex justify-between mt-4">
        <label htmlFor="tasksPerPage" className="mr-2">
          Tasks per page:
        </label>
        <select
          id="tasksPerPage"
          value={tasksPerPage}
          onChange={handleTasksPerPageChange}
          className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

export default TaskDashboard;
