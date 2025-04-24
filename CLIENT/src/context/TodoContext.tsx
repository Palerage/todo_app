// src/context/TodoContext.tsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Todo } from "../types/Todo";

interface TodoContextType {
  todos: Todo[];
  fetchTodos: () => void;
  deleteTodo: (id: string) => void;
  toggleCompleted: (id: string, completed: boolean) => void;
  editTodo: (id: string, newContent: string) => void;
  createTodo: (content: string) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // API base URL
  const apiUrl = "http://localhost:5068/api/todo";

  // Fetch all todos from the server
  const fetchTodos = async () => {
    try {
      const { data } = await axios.get(apiUrl);
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Create a new todo
  const createTodo = async (content: string) => {
    try {
      const { data } = await axios.post(apiUrl, content, {
        headers: { "Content-Type": "application/json" },
      });
      setTodos((prevTodos) => [...prevTodos, data]);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  // Edit a todo's content
  const editTodo = async (id: string, newContent: string) => {
    try {
      await axios.patch(`${apiUrl}/${id}/content`, newContent, {
        headers: { "Content-Type": "application/json" },
      });
      fetchTodos(); // Reload todos after editing
    } catch (error) {
      console.error("Error updating todo content:", error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleCompleted = async (id: string, completed: boolean) => {
    try {
      // Skicka boolean direkt istället för objekt
      await axios.patch(
        `${apiUrl}/${id}/status`,
        !completed, // Toggla completion status
        { headers: { "Content-Type": "application/json" } }
      );
      fetchTodos(); // Reload todos after toggling status
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        fetchTodos,
        deleteTodo,
        toggleCompleted,
        editTodo,
        createTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
