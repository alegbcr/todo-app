"use client";
import { TodoForm } from "@/components/TodoForm";
import { useTodos } from "@/hooks/useTodos";

export default function New() {
  const { setStates } = useTodos();
  const { addTodo } = setStates;
  return (
    <TodoForm
      title="Crear nueva nota"
      submitText="Crear"
      submitEvent={(text) => addTodo(text)}
    />
  );
}
