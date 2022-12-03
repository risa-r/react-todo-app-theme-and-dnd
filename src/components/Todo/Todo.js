import { useState, useRef, useEffect } from "react";
import { MdDragHandle } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import usePrevious from "../UsePrevious";
import "./todo.scoped.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragOverlay } from "@dnd-kit/core";

export default function Todo({
  id,
  name,
  completed,
  editTask,
  deleteTask,
  handleToggleCompleted,
  activeId
}) {
  const [taskName, setTaskName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  const wasEditing = usePrevious(isEditing);
  const editButtonRef = useRef(null);
  const editInputRef = useRef(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

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
      <label className="todo-text" key={id}>
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
      <button className="drag-handle">
        <MdDragHandle style={style} {...attributes} {...listeners} />
      </button>
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
    <>
      <li className="todo-item" ref={setNodeRef}>
        {isEditing ? editTemplate : viewTemplate}
      </li>
    </>
  );
}
