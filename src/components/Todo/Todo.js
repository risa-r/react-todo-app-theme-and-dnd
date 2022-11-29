import { useState, useRef, useEffect } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import usePrevious from "../UsePrevious";
import "./todo.scoped.css";

export default function Todo({
  id,
  name,
  completed,
  editTask,
  deleteTask,
  handleToggleCompleted
}) {
  const [taskName, setTaskName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const wasEditing = usePrevious(isEditing);
  const editButtonRef = useRef(null);
  const editInputRef = useRef(null);

  function handleChange(e) {
    setTaskName(e.target.value);
  }

  function handleCancel() {
    setIsEditing(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    editTask(id, taskName);
    setIsEditing(false);
  }

  const editTemplate = (
    <form onSubmit={handleSubmit}>
      <input
        className="todo-edit-input"
        type="text"
        value={taskName}
        onChange={handleChange}
        maxLength="75"
        ref={editInputRef}
      />
      <label>
        <span className="visually-hidden">edit the task name of '{name}'</span>
      </label>
      <button className="todo-btn" onClick={handleCancel}>
        Cancel
      </button>
      <button className="todo-btn" type="submit">
        Save
      </button>
    </form>
  );

  const viewTemplate = (
    <>
      <div className="gradient-checkbox">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => handleToggleCompleted(id)}
        />
      </div>
      <label className="todo-text">
        <span
          style={{
            textDecoration: completed ? "line-through" : "none",
            color: completed
              ? "var(--button-text-color)"
              : "var(--todo-text-color)"
          }}
        >
          {name}
        </span>
      </label>
      <button onClick={() => setIsEditing(true)} ref={editButtonRef}>
        <FiEdit2 className="edit-delete-btn" />
        <span className="visually-hidden">Edit task</span>
      </button>
      <button onClick={() => deleteTask(id)}>
        <RiDeleteBinLine className="edit-delete-btn" />
        <span className="visually-hidden">Delete task</span>
      </button>
    </>
  );

  useEffect(() => {
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus(); //This focus is not working
    }
    if (!wasEditing && isEditing) {
      editInputRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  return (
    <li className="todo-item" key={id} draggable="true">
      {isEditing ? editTemplate : viewTemplate}
    </li>
  );
}
