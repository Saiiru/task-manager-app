'use client';
import { useState } from 'react';
import { useGlobalState } from '@/application/providers/GlobalProvider';
import { Button } from '@/presentation/components/ui/button';
import { Input } from '@/presentation/components/ui/input';
import { Textarea } from '@/presentation/components/ui/textarea';
import { Switch } from '@/presentation/components/ui/switch';
import { DialogTitle } from '@/presentation/components/ui/dialog';

interface CreateContentProps {
  onSuccess?: () => void;
}

export function CreateContent({ onSuccess }: CreateContentProps) {
  const { createTask } = useGlobalState();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString(),
    isImportant: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTask(formData);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="space-y-4">
      <DialogTitle>Create New Task</DialogTitle>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="important"
            checked={formData.isImportant}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({ ...prev, isImportant: checked }))
            }
          />
          <label htmlFor="important" className="text-sm font-medium">
            Mark as important
          </label>
        </div>

        <Button type="submit" className="w-full">
          Create Task
        </Button>
      </form>
    </div>
  );
}
