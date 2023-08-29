import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const useTodos = () => {
  // GET VALUES FROM useLocalStorage
  /* It is extracting specific properties from the object returned by the useLocalStorage function.
  It assigns the value of the item property to a variable named todos, the value of the saveItem property to a variable named saveTodos,
  the value of the sincronizeItem property to a variable named sincronizeTodos, and so on.
  The useLocalStorage function is likely used to retrieve and manage data from local storage in the browser. */
  const {
    item: todos,
    saveItem: saveTodos,
    sincronizeItem: sincronizeTodos,
    loading,
    error,
  } = useLocalStorage('TODOS_V1', []);

  // STATES
  const [searchValue, setSearchValue] = useState('');

  // FUNCTIONS
  /* It filters an array of todos and counts the number of completed todos. */
  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  /* It declares a constant variable named totalTodos and assigns it the value of the length property of the todos array.
  It represents the number of elements in the todos array. */
  const totalTodos = todos.length;

  // DATA FILTER
  /* This function filters an array of todos based on a searchValue.
  If the searchValue is empty, it returns all todos.
  Otherwise, it returns only the todos that include the searchValue in their text property. */
  let searchedTodos = [];
  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter((todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }

  // ADD TODO
  /* This function takes a text parameter.
  It generates a new id for the todo, creates a copy of the existing todos array,
  adds a new todo object with the given text, id, and completed: false to the copied array,
  and then saves the updated newTodos array. */
  const addTodo = (text) => {
    const id = newTodoId(todos);
    const newTodos = [...todos];
    newTodos.push({
      completed: false,
      text,
      id,
    });
    saveTodos(newTodos);
  };

  // GET TODO
  /* This function takes an id parameter.
  It finds the index of a todo item in an array called todos whose id matches the given id,
  and then returns that todo item. */
  const getTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    return todos[todoIndex];
  };

  // COMPLETE TODO
  /* This function takes an id parameter.
  It finds the index of a todo item in an array called todos whose id matches the given id,
  and then sets the completed property of that todo item to true. */
  const completeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  // EDIT TODO
  /* This function takes an id and newText parameter.
  It finds the index of a todo item in an array called todos whose id matches the given id,
  and then sets the text property of that todo item to the newText parameter. */
  const editTodo = (id, newText) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    const newTodos = [...todos];
    newTodos[todoIndex].text = newText;
    saveTodos(newTodos);
  };

  // DELETE TODO
  /* This function takes an id parameter.
  It finds the index of a todo item in an array called todos whose id matches the given id,
  and then removes that todo item from the array. */
  const deleteTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  /* This object called states with several properties.
  Each property represents a state or a function related to the current state of the application. */
  const states = {
    loading,
    error,
    totalTodos,
    completedTodos,
    searchValue,
    searchedTodos,
    getTodo,
  };

  /* This object called setStates is a function that takes a function as a parameter
  and calls it with the current state of the application. */
  const setStates = {
    setSearchValue,
    addTodo,
    completeTodo,
    editTodo,
    deleteTodo,
    sincronizeTodos,
  };

  return { states, setStates };
};

/* This function called newTodoId that takes in a todoList as a parameter.
It first checks if the todoList is empty.
If it is, the function returns 1.
Otherwise, it creates a new array called idList containing the id values of each todo item in the todoList.
It then finds the maximum value in the idList using Math.max(...).
Finally, it returns the maximum id value plus 1, which will be used as the ID for a new todo item. */
function newTodoId(todoList) {
  if (!todoList.length) {
    return 1;
  }
  const idList = todoList.map((todo) => todo.id);
  const idMax = Math.max(...idList);
  return idMax + 1;
}

export { useTodos };
