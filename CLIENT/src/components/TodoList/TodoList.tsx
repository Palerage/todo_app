import { useState } from "react";
import { useTodos } from "../../hooks/useTodos";
import { TodoItem } from "../TodoItem/TodoItem";
import styles from "./todolist.module.scss";

export const TodoList: React.FC = () => {
  const { todos } = useTodos();

  // State för att hålla reda på vilket alternativ som är valt för sortering
  const [sortBy, setSortBy] = useState<"createdAt" | "isCompleted">(
    "createdAt"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Funktion för att sortera todos
  const sortedTodos = [...todos].sort((a, b) => {
    if (sortBy === "createdAt") {
      // Sortera efter createdAt
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else if (sortBy === "isCompleted") {
      // Sortera efter isCompleted
      return sortOrder === "asc"
        ? Number(a.isCompleted) - Number(b.isCompleted)
        : Number(b.isCompleted) - Number(a.isCompleted);
    }
    return 0;
  });

  return (
    <div className={styles.container}>
      <div className={styles.topsection}>
        <h2>Inlägg</h2>
        <div className={styles.filter}>
          <label htmlFor="sortBy">Sortera:</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "createdAt" | "isCompleted")
            }
          >
            <option value="createdAt">Datum</option>
            <option value="isCompleted">Status</option>
          </select>

          <label htmlFor="sortOrder">Typ:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          >
            <option value="desc">Fallande</option>
            <option value="asc">Stigande</option>
          </select>
        </div>
      </div>

      <ul>
        {sortedTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};
