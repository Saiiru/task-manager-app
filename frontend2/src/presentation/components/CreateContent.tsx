import React, { useState } from "react";
import { useTaskContext } from "@/application/contexts/TaskContext";
import toast from "react-hot-toast";
import Button from "../Button/Button";

function CreateContent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const { closeModal, handleCreateTask } = useTaskContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = { title, description, date, completed };
    try {
      await handleCreateTask(task);
    } catch (err) {
      toast.error("Error creating task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h1 className="text-xl font-semibold">Create a Task</h1>
      <div className="space-y-2">
        <label htmlFor="title" className="block text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="description" className="block text-gray-700">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-lg"
          rows={4}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="date" className="block text-gray-700">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="completed" className="inline-flex items-center">
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={() => setCompleted(!completed)}
            className="mr-2"
          />
          Completed
        </label>
      </div>
      <Button
        type="submit"
        name="Create Task"
        className="w-full p-3 bg-blue-600 text-white rounded-lg"
      />
    </form>
  );
}

export default CreateContent;
