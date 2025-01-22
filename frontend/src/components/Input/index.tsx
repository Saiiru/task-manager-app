"use client";
import React from "react";
import styled from "styled-components";

interface Props {
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

function Input({ type, id, value, onChange, placeholder, required }: Props) {
  return (
    <InputStyled
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  );
}

const InputStyled = styled.input`
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  width: 100%;
  background: transparent;
  color: #000;
  transition: all 0.3s ease-in-out;

  &:focus {
    outline: none;
    border-color: #000;
  }
`;

export default Input;
