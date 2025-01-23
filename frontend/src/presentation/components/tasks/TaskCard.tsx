'use client';
import { useGlobalState } from '@/application/providers/GlobalProvider';
import { Task } from '@/domain/entities/Task';
import { Button } from '@/presentation/components/ui/button';
import { EditIcon, Trash2Icon, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
}

export function TaskCard({ task, onEdit }: TaskCardProps) {
  const { deleteTask, updateTask } = useGlobalState();

  const handleUpdateStatus = () => {
    updateTask(task.id, {
      title: task.title,
      description: task.description,
      date: task.date.toString(),
      isCompleted: !task.isCompleted,
      isImportant: task.isImportant,
    });
  };

  return (
    <div className="relative flex h-[200px] flex-col rounded-xl border border-gray-800 bg-gray-900 p-5 shadow-lg">
      <div className="mb-3">
        <h3 className="text-lg font-bold text-white">{task.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-gray-400">
          {task.description}
        </p>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <CalendarIcon className="h-3 w-3" />
          <span>{format(new Date(task.date), 'MMM dd, yyyy')}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button
          onClick={handleUpdateStatus}
          className={`h-7 rounded-full px-3 text-xs font-medium ${
            task.isCompleted
              ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
              : 'bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30'
          }`}
        >
          {task.isCompleted ? 'Completed' : 'In Progress'}
        </Button>

        <div className="flex gap-1">
          <Button
            variant="ghost"
            onClick={onEdit}
            className="h-7 w-7 rounded-full p-0 text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            <EditIcon className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => deleteTask(task.id)}
            className="h-7 w-7 rounded-full p-0 text-gray-400 hover:bg-red-500/10 hover:text-red-500"
          >
            <Trash2Icon className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {task.isImportant && (
        <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500 ring-4 ring-red-500/20" />
      )}
    </div>
  );
}
