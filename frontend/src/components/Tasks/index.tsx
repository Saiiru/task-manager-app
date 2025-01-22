"use client";
import React from "react";
import styled from "styled-components";
import { useGlobalState } from "@/context/globalProvider"; // Usando alias @/
import CreateContent from "@/components/Modals/CreateContent"; // Usando alias @/
import TaskItem from "@/components/TaskItem"; // Usando alias @/
import { add, plus } from "@/utils/Icons"; // Usando alias @/
import Modal from "@/components/Modals/Modal"; // Usando alias @/

function Tasks({ title, tasks }) {
  const { theme, isLoading, openModal, modal } = useGlobalState();

  return (
    <TaskStyled theme={theme}>
      {modal && <Modal content={<CreateContent />} />}
      <h1>{title}</h1>

      <button className="btn-rounded" onClick={() => openModal(null)}>
        {plus}
      </button>

      <div className="tasks grid">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            title={task.title}
            description={task.description}
            date={task.createdAt}
            isCompleted={task.isCompleted}
            id={task.id}
          />
        ))}
        <button className="create-task" onClick={() => openModal(null)}>
          {add}
          Add New Task
        </button>
      </div>
    </TaskStyled>
  );
}

const TaskStyled = styled.main`
  /* Estilos do TaskStyled */
`;

export default Tasks;
