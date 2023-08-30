'use client';
import { useEffect, useReducer } from 'react';

const useLocalStorage = (itemName, initialValue) => {
  // STATES
  const [state, dispatch] = useReducer(reducer, initialState({ initialValue }));
  const { sincronizedItem, loading, error, item } = state;

  //  ACTION CREATORS
  /* It takes an item parameter and dispatches an action with a success type and the item as the payload. */
  const onSuccess = (item) =>
    dispatch({ type: actionTypes.success, payload: item });
  /* When this function is called, it dispatches an action with an error payload using the dispatch function.
  The dispatched action has a type of actionTypes.error and the error object is passed as the payload. */
  const onError = (error) =>
    dispatch({ type: actionTypes.error, payload: error });
  const onSave = (item) => dispatch({ type: actionTypes.save, payload: item });
  const onSincronize = () => dispatch({ type: actionTypes.sincronize });

  // FUNCTION
  /* It retrieves an item from local storage based on the itemName provided, and if the item does not exist,
  it sets it to the initialValue provided.
  It then parses the item and calls the onSuccess function with the parsed item.
  If there is an error, it calls the onError function with the error object.
  The effect is triggered whenever the sincronizedItem dependency changes. */
  useEffect(() => {
    try {
      const localStorageItem = localStorage.getItem(itemName);
      let parsedItem;

      if (!localStorageItem) {
        localStorage.setItem(itemName, JSON.stringify(initialValue));
        parsedItem = initialValue;
      } else {
        parsedItem = JSON.parse(localStorageItem);
      }
      onSuccess(parsedItem);
    } catch (error) {
      onError(error);
    }
  }, [sincronizedItem]);

  // SAVE TODOS IN LOCALSTORAGE
  /* It tries to convert newItem into a string using JSON.stringify().
  Then, it saves the stringified item into the browser's localStorage using the setItem() method.
  After saving the item, it calls a function called onSave with the newItem as an argument.
  If an error occurs during this process, it calls a function called onError with the error as an argument. */
  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      onSave(newItem);
    } catch (error) {
      onError(error);
    }
  };

  // SINCRONIZE ALL TODOS
  /* Calls another function called onSincronize to sincronize all ToDos */
  const sincronizeItem = () => {
    onSincronize();
  };

  return { item, saveItem, loading, error, sincronizeItem };
};

// INITIAL STATE
/* This code defines an initial state object for a Redux store.
It has four properties: "sincronizedItem" set to true, "loading" set to true, "error" set to false,
and "item" set to the value of "initialValue" passed as an argument to the function. */
const initialState = ({ initialValue }) => ({
  sincronizedItem: true,
  loading: true,
  error: false,
  item: initialValue,
});

// ACTION TYPES
/* This code defines an object named actionTypes with four properties: success, error, save, and sincronize.
Each property is assigned a string value. */
const actionTypes = {
  success: 'SUCCESS',
  error: 'ERROR',
  save: 'SAVE',
  sincronize: 'SINCRONIZE',
};

// REDUCER OBJECT
/* It takes in a state and payload as parameters.
The reducer object has different keys representing different action types (success, error, save, sincronize).
Each action type has a corresponding value that updates the state based on the action type. */
const reducerObject = (state, payload) => ({
  [actionTypes.success]: {
    ...state,
    error: false,
    loading: false,
    sincronizedItem: true,
    item: payload,
  },
  [actionTypes.error]: { ...state, error: true },
  [actionTypes.save]: { ...state, item: payload },
  [actionTypes.sincronize]: {
    ...state,
    sincronizedItem: false,
    loading: true,
  },
});

// REDUCER
/* It takes in a state and an action as parameters and returns a new state based on the action type. */
const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state;
};

export { useLocalStorage };
