import { TodosError } from "@/components/TodosError";
import { TodosLoading } from "@/components/TodosLoading";
import { EmptyTodos } from "@/components/EmptyTodos";
import { EmptySearchResults } from "@/components/EmptySearchResults";

function TodoList({
  styleContainer,
  error,
  loading,
  searchedTodos,
  searchValue,
  totalTodos,
  children,
}) {
  return (
    <ul className={styleContainer}>
      {error && <TodosError />}
      {loading && <TodosLoading />}
      {!loading && !totalTodos && <EmptyTodos />}
      {!!totalTodos && !searchedTodos.length && (
        <EmptySearchResults searchText={searchValue} />
      )}
      {!loading && !error && searchedTodos.map(children)}
    </ul>
  );
}

export { TodoList };
