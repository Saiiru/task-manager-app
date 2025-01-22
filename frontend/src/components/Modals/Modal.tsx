"use client";
import { useGlobalState } from "@/context/globalProvider";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface Props {
  content: React.ReactNode;
}

function Modal({ content }: Props) {
  const { closeModal, createTask, updateTask, currentTask, tasks } =
    useGlobalState();
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    isImportant: false,
    date: "",
  });

  useEffect(() => {
    if (currentTask) {
      const task = tasks.find((task) => task.id === currentTask);
      if (task) {
        setTaskData(task);
      }
    }
  }, [currentTask, tasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentTask) {
      updateTask({ ...taskData, id: currentTask });
    } else {
      createTask(taskData);
    }
    closeModal();
  };

  const handleComplete = () => {
    updateTask({ ...taskData, isCompleted: true, id: currentTask });
    closeModal();
  };

  const { theme } = useGlobalState();
  return (
    <ModalStyled theme={theme}>
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <input
            type="date"
            name="date"
            value={taskData.date}
            onChange={handleChange}
            required
          />
          <label>
            <input
              type="checkbox"
              name="isImportant"
              checked={taskData.isImportant}
              onChange={(e) =>
                setTaskData((prevData) => ({
                  ...prevData,
                  isImportant: e.target.checked,
                }))
              }
            />
            Important
          </label>
          <button type="submit">Save</button>
          {currentTask && (
            <button type="button" onClick={handleComplete}>
              Complete Task
            </button>
          )}
        </form>
      </div>
    </ModalStyled>
  );
}

const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.45);
    filter: blur(4px);
  }

  .modal-content {
    margin: 0 1rem;

    padding: 2rem;
    position: relative;
    max-width: 630px;
    width: 100%;
    z-index: 100;

    border-radius: 1rem;
    background-color: ${(props) => props.theme.colorBg2};
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
    border-radius: ${(props) => props.theme.borderRadiusMd2};

    @media screen and (max-width: 450px) {
      font-size: 90%;
    }
  }
`;

export default Modal;
