import React, { useState } from "react";
import { useTodos } from "../../hooks/useTodos";
import styles from "./todoform.module.scss";
import { FaPlus } from "react-icons/fa";

export const TodoForm: React.FC = () => {
  const { createTodo } = useTodos();
  const [newTodo, setNewTodo] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() !== "") {
      createTodo(newTodo.trim());
      setNewTodo(""); // Clear the input field after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Skapa inlägg</h2>
      <div className={styles.post}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Lägg till en todo"
        />
        <button type="submit" aria-label="Lägg till" title="Lägg till">
          <FaPlus className={styles.icon} />
        </button>
      </div>
    </form>
  );
};
