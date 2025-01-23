import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/presentation/components/ui/dialog';
import { Button } from '@/presentation/components/ui/button';
import { Input } from '@/presentation/components/ui/input';
import { useGlobalState } from '@/application/providers/GlobalProvider';

export function AddTaskDialog() {
  const { createTask } = useGlobalState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = () => {
    createTask({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Add Task</Button>
      </DialogTrigger>
      <DialogContent>
        <h2 className="text-xl font-bold mb-4">Add Task</h2>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4"
        />
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4"
        />
        <Button onClick={handleAddTask}>Add</Button>
      </DialogContent>
    </Dialog>
  );
}
