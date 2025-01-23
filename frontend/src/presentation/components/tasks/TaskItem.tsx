'use client';
import { useGlobalState } from '@/context/globalProvider';
import { Edit2Icon, Trash2Icon } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/presentation/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  id: string;
}

export function TaskItem({ title, description, date, isCompleted, id }: Props) {
  const { deleteTask, updateTask } = useGlobalState();

  return (
    <div className="flex h-64 flex-col gap-2 rounded-xl bg-gray-800 p-4 shadow-lg">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-gray-400">{description}</p>
      <p className="mt-auto text-sm text-gray-400">
        {format(new Date(date), 'PPP')}
      </p>
      <div className="flex items-center gap-3">
        <Button
          onClick={() => updateTask({ id, isCompleted: !isCompleted })}
          className={cn(
            'rounded-full text-sm',
            isCompleted
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-red-600 hover:bg-red-700',
          )}
        >
          {isCompleted ? 'Completed' : 'Incomplete'}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto hover:bg-gray-700"
        >
          <Edit2Icon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-700"
          onClick={() => deleteTask(id)}
        >
          <Trash2Icon className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
}
