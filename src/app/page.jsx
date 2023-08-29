"use client";
// Hooks
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTodos } from "@/hooks/useTodos";

// components
import { TodoSearch } from "@/components/TodoSearch";
import { TodoList } from "@/components/TodoList";
import { TodoItem } from "@/components/TodoItem";
import { ChangeAlert } from "@/components/ChangeAlert";

// Next-UI components
import { Button } from "@nextui-org/react";

export default function Home() {
  const router = useRouter();
  // STATES
  const { states, setStates } = useTodos();
  const {
    loading,
    error,
    totalTodos,
    completedTodos,
    searchValue,
    searchedTodos,
  } = states;
  const [active, setActive] = useState(false);

  // METHODS
  const { setSearchValue, completeTodo, deleteTodo, sincronizeTodos } =
    setStates;

  return (
    <section className="h-screen grid grid-cols-4 grid-rows-12">
      <div className="col-span-full row-start-2 row-end-3 flex flex-col items-center justify-start text-center">
        <h1 className="font-bold text-4xl">Tus notas</h1>
        <small className="mt-4">
          Haz completado {completedTodos} de {totalTodos} notas
        </small>
        <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      <ul className="col-span-full row-start-4 row-end-5 flex justify-center items-center">
        <li className="mx-1">
          <Button
            onClick={() => setActive(true)}
            color="primary"
            variant="light"
          >
            Activo
          </Button>
        </li>
        <li className="mx-1">
          <Button
            onClick={() => setActive(false)}
            color="primary"
            variant="light"
          >
            Completado
          </Button>
        </li>
      </ul>
      {active ? (
        <TodoList
          styleContainer="h-full w-full col-span-full row-start-5 row-end-12 flex flex-col items-center overflow-y-scroll"
          // Prop value
          error={error}
          loading={loading}
          searchedTodos={searchedTodos}
          searchValue={searchValue}
          totalTodos={totalTodos}
        >
          {(todo) => {
            if (todo.completed === false) {
              return (
                <TodoItem
                  key={todo.id}
                  text={todo.text}
                  completed={todo.completed}
                  onComplete={() => completeTodo(todo.id)}
                  onEdit={() => router.push(`/edit/${todo.id}`)}
                  onDelete={() => deleteTodo(todo.id)}
                />
              );
            }
          }}
        </TodoList>
      ) : (
        <TodoList
          styleContainer="h-full w-full col-span-full row-start-5 row-end-12 flex flex-col items-center overflow-y-scroll"
          // Prop value
          error={error}
          loading={loading}
          searchedTodos={searchedTodos}
          searchValue={searchValue}
          totalTodos={totalTodos}
        >
          {(todo) => {
            if (todo.completed === true) {
              return (
                <TodoItem
                  key={todo.id}
                  text={todo.text}
                  completed={todo.completed}
                  onComplete={() => completeTodo(todo.id)}
                  onEdit={() => router.push(`/edit/${todo.id}`)}
                  onDelete={() => deleteTodo(todo.id)}
                />
              );
            }
          }}
        </TodoList>
      )}

      <div className="col-span-full row-start-12 row-end-last flex items-center justify-center">
        <Button
          variant="solid"
          className={`  text-whiteColor  place-items-center justify-self-center bg-blueColor w-5/6`}
          onClick={() => router.push("/new")}
        >
          Agregar nueva nota
        </Button>
      </div>
      <ChangeAlert sincronize={sincronizeTodos} />
    </section>
  );
}
