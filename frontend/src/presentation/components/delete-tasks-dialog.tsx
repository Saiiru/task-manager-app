import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/presentation/components/ui/dialog';
import { Button } from '@/presentation/components/ui/button';
import { useGlobalState } from '@/application/providers/GlobalProvider';
import { Task } from '@/domain/entities/Task';

interface DeleteTaskDialogProps {
  task: Task;
}

export function DeleteTaskDialog({ task }: DeleteTaskDialogProps) {
  const { deleteTask } = useGlobalState();

  const handleDeleteTask = () => {
    deleteTask(task.id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h2 className="text-xl font-bold mb-4">Delete Task</h2>
        <p>Are you sure you want to delete this task?</p>
        <Button onClick={handleDeleteTask}>Delete</Button>
      </DialogContent>
    </Dialog>
  );
}
