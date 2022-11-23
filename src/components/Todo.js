import { useState, useRef, useEffect } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { IconContext } from "react-icons";
import usePrevious from "./UsePrevious";

export default function Todo({
  id,
  name,
  completed,
  editTask,
  deleteTask,
  handleToggleCompleted,
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
      ></input>
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
          className="todo-checkbox"
          type="checkbox"
          checked={completed}
          onChange={() => handleToggleCompleted(id)}
        />
      </div>
      <label className="todo-text">{name}</label>
      <button
        className="todo-btn edit"
        onClick={() => setIsEditing(true)}
        ref={editButtonRef}
      >
        <FiEdit2 />
        <span className="visually-hidden">Edit task</span>
      </button>
      <button className="todo-btn delete" onClick={() => deleteTask(id)}>
        <RiDeleteBinLine />
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
    <IconContext.Provider value={{ color: "hsl(236, 9%, 61%)", size: "1rem" }}>
      <li className="todo-item" key={id}>
        {isEditing ? editTemplate : viewTemplate}
      </li>
    </IconContext.Provider>
  );
}
