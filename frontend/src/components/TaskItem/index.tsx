"use client";
import React from "react";
import styled from "styled-components";
import { useGlobalState } from "@/context/globalProvider"; // Usando alias @/
import { edit, trash } from "@/utils/Icons"; // Usando alias @/

function TaskItem({ title, description, date, isCompleted, id }) {
  const { theme, deleteTask, updateTask, openModal } = useGlobalState();

  return (
    <TaskItemStyled theme={theme}>
      <h1>{title}</h1>
      <p>{description}</p>
      <p className="date">{new Date(date).toLocaleDateString()}</p>
      {isCompleted ? (
        <button
          className="completed"
          onClick={() => {
            const task = {
              id,
              isCompleted: !isCompleted,
            };
            updateTask(task);
          }}
        >
          Completed
        </button>
      ) : (
        <button
          className="incomplete"
          onClick={() => {
            const task = {
              id,
              isCompleted: !isCompleted,
            };
            updateTask(task);
          }}
        >
          Incomplete
        </button>
      )}
      <button className="edit" onClick={() => openModal(id)}>
        {edit}
      </button>
      <button
        className="delete"
        onClick={() => {
          deleteTask(id);
        }}
      >
        {trash}
      </button>
    </TaskItemStyled>
  );
}

const TaskItemStyled = styled.div`
  /* Estilos do TaskItem */
`;

export default TaskItem;
