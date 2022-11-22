import { useState } from "react";

export default function Todo({
  id,
  name,
  completed,
  editTask,
  deleteTask,
  handleToggleCompleted,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(name);

  function handleChange(e) {
    setTaskName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    editTask(id, taskName);
    setTaskName("");
    setIsEditing(false);
  }

  const editTemplate = (
    <form onSubmit={handleSubmit}>
      <input
        className="todo-edit-input"
        type="text"
        value={taskName}
        onChange={handleChange}
      ></input>
      <label>
        <span className="visually-hidden">edit the task name of '{name}'</span>
      </label>
      <button className="todo-btn save" type="submit">
        Save
      </button>
    </form>
  );

  const viewTemplate = (
    <>
      <input
        className="todo-checkbox"
        type="checkbox"
        checked={completed}
        onChange={() => handleToggleCompleted(id)}
      />
      <label className="todo-text">{name}</label>
      <button className="todo-btn edit" onClick={() => setIsEditing(true)}>
        Edit<span className="visually-hidden"> task</span>
      </button>
      <button className="todo-btn delete" onClick={() => deleteTask(id)}>
        Delete<span className="visually-hidden"> task</span>
      </button>
    </>
  );

  return (
    <li className="todo-item" key={id}>
      {isEditing ? editTemplate : viewTemplate}
    </li>
  );
}
