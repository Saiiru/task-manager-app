import React from "react";

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  handleUpdateTask: (task: { id: string; isCompleted: boolean }) => void;
  handleDeleteTask: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  isCompleted,
  createdAt,
  updatedAt,
  handleUpdateTask,
  handleDeleteTask,
}) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md border-2 border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <h1 className="text-xl font-semibold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>
      <p className="text-sm text-gray-400">
        Criado em: {new Date(createdAt).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-400">
        Atualizado em: {new Date(updatedAt).toLocaleDateString()}
      </p>
      <div className="mt-4 flex items-center justify-between">
        {isCompleted ? (
          <button
            onClick={() => handleUpdateTask({ id, isCompleted: !isCompleted })}
            className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300"
          >
            Completed
          </button>
        ) : (
          <button
            onClick={() => handleUpdateTask({ id, isCompleted: !isCompleted })}
            className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
          >
            Incomplete
          </button>
        )}
        <button
          onClick={() => handleDeleteTask(id)}
          className="text-red-500 hover:text-red-700 transition-colors duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
