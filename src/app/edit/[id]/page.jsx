"use client";
import { useParams } from "next/navigation";
// Components
import { TodoForm } from "@/components/TodoForm";
import { useTodos } from "@/hooks/useTodos";
import { useState, useEffect } from "react";

export default function EditPage() {
  const params = useParams();
  const id = parseInt(params.id);
  const { states, setStates } = useTodos();
  const { getTodo } = states;
  const { editTodo } = setStates;

  let todoText;
  let todo = getTodo(id);
  if (!todo) {
    return <p>Cargando</p>;
  } else {
    todoText = todo.text;
  }
  return (
    <TodoForm
      title=""
      label="Edita tu nota"
      submitText="Actualizar"
      defaultValueText={todoText}
      submitEvent={(newText) => editTodo(id, newText)}
    />
  );
}
