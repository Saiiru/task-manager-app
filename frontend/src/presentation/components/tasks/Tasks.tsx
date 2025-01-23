'use client';
import { useGlobalState } from '@/context/globalProvider';
import React from 'react';
import { TaskItem } from './TaskItem';
import { Modal } from '@/presentation/components/ui/modal';
import { CreateContent } from './CreateContent';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/presentation/components/ui/button';

interface Props {
  title: string;
  tasks: any[];
}

export function Tasks({ title, tasks }: Props) {
  const { isLoading, openModal, modal } = useGlobalState();

  return (
    <div className="relative h-full w-full rounded-xl border border-gray-700 bg-gray-800 p-8">
      {modal && <Modal content={<CreateContent />} />}
      <h1 className="relative mb-8 text-2xl font-bold after:absolute after:-bottom-2 after:left-0 after:h-1 after:w-12 after:rounded-full after:bg-green-500">
        {title}
      </h1>

      <Button
        onClick={openModal}
        className="fixed right-20 top-20 aspect-square h-12 w-12 rounded-full bg-gray-800 p-0 shadow-lg hover:bg-gray-700"
      >
        <PlusIcon className="h-6 w-6" />
      </Button>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            isCompleted={task.isCompleted}
            id={task.id}
          />
        ))}
        <Button
          onClick={openModal}
          variant="outline"
          className="flex h-64 flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-600 hover:bg-gray-700"
        >
          <PlusIcon className="h-6 w-6" />
          Add New Task
        </Button>
      </div>
    </div>
  );
}
