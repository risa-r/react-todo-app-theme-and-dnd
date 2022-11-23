import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { IconContext } from "react-icons";

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
      <button className="todo-btn-save" type="submit">
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
        <FiEdit2 />
        <span className="visually-hidden">Edit task</span>
      </button>
      <button className="todo-btn delete" onClick={() => deleteTask(id)}>
        <RiDeleteBinLine />
        <span className="visually-hidden">Delete task</span>
      </button>
    </>
  );

  return (
    <IconContext.Provider value={{ color: "hsl(236, 9%, 61%)", size: "1rem" }}>
      <li className="todo-item" key={id}>
        {isEditing ? editTemplate : viewTemplate}
      </li>
    </IconContext.Provider>
  );
}
