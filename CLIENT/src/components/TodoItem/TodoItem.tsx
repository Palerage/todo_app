import React, { useState } from "react";
import { Todo } from "../../types/Todo";
import { useTodos } from "../../hooks/useTodos";
import { formatDate } from "../../utils/DateUtils";
import styles from "./todoitem.module.scss";
import { FaEdit, FaTrashAlt, FaSave, FaUndo } from "react-icons/fa";

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { deleteTodo, toggleCompleted, editTodo } = useTodos();

  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(todo.content);

  const handleEditClick = () => {
    if (isEditing) {
      editTodo(todo.id, newContent);
    }
    setIsEditing(!isEditing);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewContent(e.target.value);
  };

  const handleCancelEdit = () => {
    setNewContent(todo.content);
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <section>
        {isEditing ? (
          <input
            type="text"
            value={newContent}
            onChange={handleContentChange}
            className={styles.input_field}
          />
        ) : (
          <span>{todo.content}</span>
        )}
        <input
          type="checkbox"
          title="Ändra status"
          checked={todo.isCompleted}
          onChange={() => toggleCompleted(todo.id, todo.isCompleted)}
          className={styles.checkbox}
        />
      </section>
      <div className={styles.edit}>
        <span>Skapad: {formatDate(todo.createdAt)}</span>
        <div className={styles.button_container}>
          <button
            onClick={handleEditClick}
            title={isEditing ? "Spara" : "Redigera"}
          >
            {isEditing ? (
              <FaSave className={styles.icon} />
            ) : (
              <FaEdit className={styles.icon} />
            )}
          </button>
          {isEditing ? (
            <button onClick={handleCancelEdit} title="Ångra">
              <FaUndo className={styles.icon} />
            </button>
          ) : (
            <button onClick={() => deleteTodo(todo.id)} title="Ta bort">
              <FaTrashAlt className={styles.icon} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
